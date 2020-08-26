<template>
<v-app>
  <Header :menus="headerMenus" :scroll="scroll" />
  <nuxt v-scroll="onScroll" />
  <Footer :menus="footerMenus" />
</v-app>
</template>

<script>
export default {
  data () {
    return {
      menus: null,
      layout: null,
      scroll: false
    }
  },
  created () {
    this.$nuxt.$on('setMenus', data =>{
      this.menus = data.menus
    })
  },
  computed: {
    headerMenus () {
      if (this.menus) {
        return this.menus.contents.filter(x => x.display.includes('ヘッダーナビ'))
      }
    },
    footerMenus () {
      if (this.menus) {
        return this.menus.contents.filter(x => x.display.includes('フッターナビ'))
      }
    }
  },
  methods: {
    onScroll (e) {
      var top = window.pageYOffset ||e.target.scrollTop || 0
      if(top >= window.innerHeight) {
          this.scroll = true
      }
      else {
          this.scroll = false
      }
    }
  }
}
</script>
