<template>
<v-footer
  :color="color.bg"
  padless
>
  <v-row
    justify="center"
    no-gutters
  >
    <template v-for="menu in menus">
    <v-btn
      :color="color.menu"
      class="my-4"
      :to="`/${menu.id}`"
      nuxt
      text
      rounded
    >
      {{ menu.title }}
    </v-btn>
    </template>
    
    <template v-if="copyright">
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col
      cols="12"
      class="text-center caption"
      :style="`background-color:${color.copyrightBg};color:${color.copyright};`"
    >
      {{ copyright }}
    </v-col>
    </template>
  </v-row>
</v-footer>
</template>

<script>
export default {
  props: ['menus', 'footer'],
  data () {
    return {
      copyright: null,
      color: {
        bg: '#fff',
        menu: '#333',
        copyright: '#333',
        copyrightBg: 'transparent',
      }
    }
  },
  mounted () {
    this.copyright = this.$config.FOOTER_COPYRIGHT
    this.color = {
      bg: this.$config.COLOR_FOOTER_BG,
      menu: this.$config.COLOR_FOOTER_MENU,
      copyright: this.$config.COLOR_FOOTER_COPYRIGHT,
      copyrightBg: this.$config.COLOR_FOOTER_COPYRIGHT_BG
    }
  },
  methods: {
    check (x, y) {
      if (x) {
        return x
      }
      else {
        return y
      }
    }
  }
}
</script>