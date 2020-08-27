<template>
<v-list-item
  :to="`/${menu.id}/${section.id}`"
  nuxt
  :three-line="overview"
>
  <v-list-item-content>
    <v-list-item-subtitle
      v-if="date"
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
    v-if="category"
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
    overview () {
      if (this.menu.list.display.includes('概要')) {
        return true
      }
    },
    category () {
      if (this.menu.list.display.includes('カテゴリ')) {
        return true
      }
    }
  }
}
</script>
