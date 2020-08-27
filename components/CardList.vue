<template>
<v-card
  height="100%"
  :color="color.bg"
  :to="`/${menu.id}/${section.id}`"
  elevation="1"
  tile
  nuxt
>
  <v-img :src="(thumbnail)? thumbnail : undefined" class="align-end"></v-img>
  <v-card-title
    :style="`color: ${color.title};`"
    class="font-weight-bold"
  >
    {{ section.title }}
  </v-card-title>
  
  <v-card-subtitle
    v-if="date"
    :style="`color: ${color.date};`"
  >
    {{ (section.date) ? $dayjs(section.date).format('YYYY年M月D日(ddd)') : $dayjs(section.updatedAt).format('YYYY年M月D日(ddd)') }}
  </v-card-subtitle>
  
  <v-divider
    v-if="divider"
  ></v-divider>
  
  <v-card-text
    v-if="overview"
    :style="`color: ${color.overview};`"
  >
    {{ section.overview }}
  </v-card-text>
  
  <v-card-actions
    v-if="category"
  >
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
</template>

<script>
export default {
  props: ['section', 'menu'],
  data () {
    return {
      color: {
        title: '#333',
        date: '#333',
        overview: '#333',
        chip: '#333'
      }
    }
  },
  mounted () {
    this.color = {
      title: this.$config.COLOR_LIST_TITLE,
      date: this.$config.COLOR_LIST_DATE,
      overview: this.$config.COLOR_LIST_OVERVIEW,
      chip: this.$config.COLOR_LIST_CHIP
    }
  },
  computed: {
    date () {
      if (this.menu.list.display.includes('日付')) {
        return true
      }
    },
    divider () {
      if (this.menu.list.display.includes('区切り線(カードのみ)')) {
        return true
      }
    },
    overview () {
      if (this.menu.list.display.includes('概要')) {
        return true
      }
    },
    category () {
      if (this.menu.list.display.includes('カテゴリ')) {
        return true
      }
    },
    thumbnail () {
      if (this.menu.list.display.includes('サムネイル(カードのみ)')) {
        if (this.section.thumbnail) {
          const val = {
            xs: 574,
            sm: 454,
            md: 276,
            lg: 371,
            xl: 571
          }
          const size = this.bp(val)
          var color = this.tnColor
          if (this.section.tnColor) {
            var color = this.section.tnColor
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
          }
          return this.section.thumbnail.url + `?auto=compress&fit=clip&w=${size}&blend-mode=normal&blend-color=${color}` 
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
