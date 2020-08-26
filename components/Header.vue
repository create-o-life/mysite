<template>
<v-app-bar
  :color="(!scroll && $route.path=='/')? 'transparent' : color.bg"
  :flat="!scroll && $route.path=='/'"
  fixed
  :elevation="(!scroll && $route.path=='/')? undefined : 1"
>
  <v-toolbar-items>
    <v-btn
      class="px-0"
      aria-label="to-top"
      @click="$router.push('/')"
      nuxt
      text
    >
      <v-img
        v-if="logo"
        :src="logo"
        alt=""
      ></v-img>
    
      <v-toolbar-title
        v-if="title"
        :style="`color: ${color.title};`"
      >
        {{ title }}
      </v-toolbar-title>
    </v-btn>
  </v-toolbar-items>
  
  <v-spacer></v-spacer>
  
  <template v-if="$vuetify.breakpoint.smAndUp">
  <v-toolbar-items>
    <template v-for="menu in menus">
    <v-btn
      color="transparent"
      :style="`color: ${color.menu};`"
      :small="$vuetify.breakpoint.sm"
      :to="`/${menu.id}`"
      nuxt
      depressed
    >
      {{ menu.title }}
    </v-btn>
    </template>
  </v-toolbar-items>
  </template>
  
  <template v-else-if="$vuetify.breakpoint.xs">
    <v-menu
      right
      nudge-right
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          aria-label="menu"
          icon
        >
          <v-icon large>
            mdi-menu
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <template v-for="menu in menus">
        <v-list-item
          :to="`/${menu.id}`"
          nuxt
        >
          <v-list-item-title>
            {{ menu.title }}
          </v-list-item-title>
        </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </template>
</v-app-bar>
</template>

<script>

export default {
  props: ['menus', 'header', 'scroll'],
  data () {
    return {
      logo: null,
      title: null,
      color: {
        bg: '#fff',
        title: '#333',
        menu: '#333'
      }
    }
  },
  mounted () {
    this.logo = this.$config.LOGO_IMG_URL
    this.title = this.$config.HEADER_TITLE
    this.color = {
      bg: this.$config.COLOR_HEADER_BG,
      title: this.$config.COLOR_HEADER_TITLE,
      menu: this.$config.COLOR_HEADER_MENU
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