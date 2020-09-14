<template>
<v-main :style="style">
    <template v-if="menu && sections">
      <List :menu="menu" :sections="sections.contents" />
    </template>
</v-main>
</template>

<script>

export default {
  async asyncData ({ app, $config, route }) {
    const menus = await app.$axios.$get(`https://${$config.SERVICE_ID}.microcms.io/api/v1/menu`, {
      headers: { 'X-API-KEY': $config.API_KEY }
    })
    return { menus }
  },
  async created() {
    const query = this.$route.query
    if (query.id === undefined || query.draftKey === undefined) {
      return
    }
    const menu = await this.$axios.$get(`https://${this.$config.DRAFT_SERVICE_ID}.microcms.io/api/v1/menu/${query.id}?draftKey=${query.draftKey}`, {
      headers: { 'X-API-KEY': this.$config.DRAFT_API_KEY }
    })
    const sections = await this.$axios.$get(`https://${this.$config.DRAFT_SERVICE_ID}.microcms.io/api/v1/test?filters=menu[equals]${query.id}`, {
      headers: { 'X-API-KEY': this.$config.DRAFT_API_KEY }
    })
    this.menu = menu;
    this.sections = sections
  },
  data () {
    return {
      menu: null,
      sections: null
    }
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
  }
}
</script>