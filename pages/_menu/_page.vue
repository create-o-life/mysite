<template>
<v-main :style="style">
  <Section :section="section" :menu="menu" />
</v-main>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    const menus = await app.$axios.$get('/menu')
    const section = await app.$axios.$get(`/test/${route.params.page}`)
    const menu = menus.contents.find(x => x.id === route.params.menu)
    return { menus, section, menu }
  },
  mounted () {
    this.setMenus()
  },
  computed: {
    style () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return `margin-top:64px;`
      }
      else {
        return `margin-top:56px;`
      }
    }
  },
  methods: {
    setMenus () {
      this.$nuxt.$emit('setMenus', {menus: this.menus})
    }
  },
  head () {
    return {
      title: this.section.title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.section.title },
      ]
    }
  }
}
</script>
