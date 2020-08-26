<template>
<v-main>
  <template v-for="sections in homeContents">
  <List :menu="sections.menu" :sections="sections.contents" />
  </template>
</v-main>
</template>

<script>

export default {
  async asyncData ({ app, $config }) {
    const menus = await app.$axios.$get('/menu')
    const sections = await app.$axios.$get('/test')
    const homeMenus = menus.contents.filter(x => x.display.includes('ホームコンテンツ'))
    const homeContents = homeMenus.map(x => {
      return {
        menu: x,
        contents: sections.contents.filter(y => {
          if (y.menu) {
            return y.menu.id === x.id
          }
        })
      }
    })
    return { menus, homeContents }
  },
  mounted () {
    this.setMenus()
  },
  methods: {
    setMenus () {
      this.$nuxt.$emit('setMenus', {menus: this.menus})
    }
  },
  head () {
    return {
      title: process.env.topTitle,
      titleTemplate: (process.env.topTemplate != '')? process.env.topTemplate : `${process.env.siteName} - %s`
    }
  }
}
</script>
