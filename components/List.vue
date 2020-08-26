<template>
<div
  :style="`background:url('${bgImg}');background-repeat: no-repeat;background-size:cover;background-position:center;`"
>
  <template v-if="menu.bread && $route.params.menu">
  <Bread :menu="menu" />
  </template>
  
  <template v-if="menu.content">
  <v-container
      class="pt-4 pt-sm-6"
  >
    <v-row no-gutters>
      <v-col>
        <Content :item="menu" />
      </v-col>
    </v-row>
  </v-container>
  </template>
  <template v-if="listType == null">
    <template v-for="section in sections">
    <Section :section="section" />
    </template>
  </template>
  <template v-else-if="listType === 'ライン'">
    <v-container
      class="pb-4 pb-sm-6"
    >
      <v-list
        :color="color.bg"
        class="py-0"
      >
        <template v-for="section in sections">
        <v-divider></v-divider>
        <v-list-item
          :to="`/${menu.id}/${section.id}`"
          nuxt
          :three-line="overview"
        >
          <v-list-item-content>
            <v-list-item-subtitle
              :style="`color: ${color.date};`"
            >
              {{ (section.date) ? $dayjs(section.date).format('YYYY年M月D日(ddd)') : $dayjs(section.updatedAt).format('YYYY年M月D日(ddd)') }}
            </v-list-item-subtitle>
            
            <v-list-item-title
              :style="`color: ${color.title};`"
              class="font-weight-bold"
            >
              {{ section.title }}
            </v-list-item-title>
            
            <v-list-item-subtitle
              v-if="overview"
              :style="`color: ${color.overview};`"
            >
              {{ section.overview }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action
            class="align-self-center"
          >
            <v-chip
              v-if="section.category[0] != null"
              :small="$vuetify.breakpoint.sm"
              :x-small="$vuetify.breakpoint.xs"
              :color="color.chip"
              outlined
            >
              {{ section.category[0] }}
            </v-chip>
          </v-list-item-action>
        </v-list-item>
        </template>
        <v-divider></v-divider>
      </v-list>
    </v-container>
  </template>
  <template v-else-if="listType === 'カード'">
    <v-container
      class="pb-4 pb-sm-6"
    >
      <v-row>
        <template v-for="section in sections">
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="align-self-stretch"
        >
          <v-card
            height="100%"
            :color="color.bg"
            :to="`/${menu.id}/${section.id}`"
            elevation="1"
            tile
            nuxt
          >
            <v-card-title
              :style="`color: ${color.title};`"
              class="font-weight-bold"
            >
              {{ section.title }}
            </v-card-title>
            
            <v-card-subtitle
              :style="`color: ${color.date};`"
            >
              {{ (section.date) ? $dayjs(section.date).format('YYYY年M月D日(ddd)') : $dayjs(section.updatedAt).format('YYYY年M月D日(ddd)') }}
            </v-card-subtitle>
            
            <template v-if="overview">
            <v-divider></v-divider>
            
            <v-card-text
              :style="`color: ${color.overview};`"
            >
              {{ section.overview }}
            </v-card-text>
            </template>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-chip
                v-if="section.category[0] != null"
                :small="$vuetify.breakpoint.sm"
                :x-small="$vuetify.breakpoint.xs"
                :color="color.chip"
                outlined
              >
                {{ section.category[0] }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
        </template>
      </v-row>
    </v-container>
  </template>
</div>
</template>

<script>
export default {
  props: ['sections', 'menu'],
  data () {
    return {
      color: {
        bg: '#fff',
        title: '#333',
        date: '#333',
        overview: '#333',
        chip: '#333'
      }
    }
  },
  mounted () {
    this.color = {
      bg: this.$config.COLOR_LIST_BG,
      title: this.$config.COLOR_LIST_TITLE,
      date: this.$config.COLOR_LIST_DATE,
      overview: this.$config.COLOR_LIST_OVERVIEW,
      chip: this.$config.COLOR_LIST_CHIP
    }
  },
  computed: {
    listType () {
      if (this.menu.list != null) {
        if (this.menu.list.type) {
          return this.menu.list.type[0]
        }
      }
    },
    overview () {
      if (this.menu.list != null) {
        if (this.menu.list.display.includes('概要')) {
          return true
        }
      }
    },
    bgImg () {
      if (this.menu.list != null) {
        if (this.menu.list.bgImg) {
          const val = {
              xs: 600,
              sm: 960,
              md: 1264,
              lg: 1264,
              xl: 1264
          }
          const size = this.bp(val)
          var color = this.color.bg
          if (color.includes('#')) {
            color = color.slice(1)
          }
          else if (color.includes('rgba')) {
            color = color.slice(5)
            color = color.slice(0, -1)
            const rgba = color.split(',')
            const a = Math.round(rgba[3] * 255)
            color = this.change(a) + this.change(rgba[0]) + this.change(rgba[1]) + this.change(rgba[2])
          }
          else if (color.includes('gba')) {
            color = color.slice(4)
            color = color.slice(0, -1)
            const rgba = color.split(',')
            color = this.change(rgba[0]) + this.change(rgba[1]) + this.change(rgba[2])
          }
          return this.menu.list.bgImg.url + `?auto=compress&fit=clip&w=${size}&blend-mode=normal&blend-color=${color}` 
        }
      }
    }
  },
  methods: {
    bp (x) {
      if (this.$vuetify.xs) {
        return x.xs
      }
      else if (this.$vuetify.sm) {
        return x.sm
      }
      else if (this.$vuetify.md) {
        return x.md
      }
      else if (this.$vuetify.lg) {
        return x.lg
      }
      else if (this.$vuetify.xl) {
        return x.xl
      }
    },
    change (z) {
      if (z < 16) {
        return 0 + z.toString(16)
      }
      else {
        return z.toString(16)
      }
    }
  }
}
</script>
