import colors from 'vuetify/es5/util/colors'
const axios = require("axios")
const {
  API_KEY,
  DRAFT_API_KEY,
  SERVICE_ID,
  DRAFT_SERVICE_ID,
  GTM_ID,
  SITE_TITLE,
  SITE_URL, 
  SITE_DESC,
  TOP_TITLE,
  TOP_TEMPLATE,
  LOGO_IMG_URL,
  HEADER_TITLE,
  FOOTER_COPYRIGHT,
  COLOR_HEADER_BG,
  COLOR_HEADER_TITLE,
  COLOR_HEADER_MENU,
  COLOR_FOOTER_BG, 
  COLOR_FOOTER_MENU,
  COLOR_FOOTER_COPYRIGHT,
  COLOR_FOOTER_COPYRIGHT_BG,
  COLOR_LIST_BG,
  COLOR_LIST_TITLE,
  COLOR_LIST_DATE,
  COLOR_LIST_OVERVIEW,
  COLOR_LIST_CHIP,
  COLOR_BTN,
  COLOR_BREAD
} = process.env

export default {
  privateRuntimeConfig: {
    API_KEY,
    SERVICE_ID
  },
  publicRuntimeConfig: {
    gtm: {
      id: GTM_ID
    },
    DRAFT_API_KEY,
    DRAFT_SERVICE_ID,
    SITE_TITLE,
    TOP_TITLE,
    TOP_TEMPLATE,
    LOGO_IMG_URL,
    HEADER_TITLE,
    FOOTER_COPYRIGHT,
    COLOR_HEADER_BG,
    COLOR_HEADER_TITLE,
    COLOR_HEADER_MENU,
    COLOR_FOOTER_BG, 
    COLOR_FOOTER_MENU,
    COLOR_FOOTER_COPYRIGHT,
    COLOR_FOOTER_COPYRIGHT_BG,
    COLOR_LIST_BG,
    COLOR_LIST_TITLE,
    COLOR_LIST_DATE,
    COLOR_LIST_OVERVIEW,
    COLOR_LIST_CHIP,
    COLOR_BTN,
    COLOR_BREAD
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja'
    },
    titleTemplate: `%s - ${SITE_TITLE}`,
    meta: [
      // 設定関連
      { charset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: SITE_DESC },
      
      // ogp関連
      { hid: 'og:site_name', property: 'og:site_name', content: SITE_TITLE },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: SITE_URL },
      { hid: 'og:title', property: 'og:title', content: SITE_TITLE },
      { hid: 'og:description', property: 'og:description', content: SITE_DESC },
      { hid: 'og:image', property: 'og:image', content: `${SITE_URL}ogp/home.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
      
      // pwa iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      
      // apple touch icon
      { rel: 'apple-touch-icon', type: 'image/png', href: '/icon.png' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~~/font/dist/css/materialdesignicons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@/plugins/axios' },
    '~plugins/day.js',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/gtm'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `https://${SERVICE_ID}.microcms.io/api/v1`
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  gtm: {
    id: GTM_ID,
    pageTracking: true,
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: SITE_URL,
    gzip: true
  },
  generate: {
    crawler: false,
    subFolders: false,
    routes: async function () {
      const menus = await axios.get(`https://${SERVICE_ID}.microcms.io/api/v1/menu`, {
        headers: { 'X-API-KEY': API_KEY }
      })
      const sections = await axios.get(`https://${SERVICE_ID}.microcms.io/api/v1/test?limit=100`, {
        headers: { 'X-API-KEY': API_KEY }
      })
      var routes = [
        '/',
        'draft/menu',
        'draft/page'
      ]
      var pages = null
      menus.data.contents.forEach(x => {
        pages = sections.data.contents.filter(y => {
          if (y.menu) {
            return y.menu.id === x.id
          }
        })
        pages = pages.map(z => {
          return `/${x.id}/${z.id}`
        })
        routes = [
          ...routes,
          `/${x.id}`,
          ...pages
        ]
      })
      return routes
    }
  }
}
