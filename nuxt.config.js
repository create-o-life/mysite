import colors from 'vuetify/es5/util/colors'
const {
  API_KEY,
  SERVICE_ID,
  GTM_ID,
  LOGO_IMG_URL,
  HEADER_TITLE,
  FOOTER_COPYRIGHT,
  COLOR_HEADER_BG,
  COLOR_HEADER_TITLE,
  COLOR_HEADER_MENU,
  COLOR_FOOTER_BG,
  COLOR_FOOTER_MENU,
  COLOR_FOOTER_COPYRIGHT,
  COLOR_FOOTER_COPYRIGHT_BG
} = process.env

export default {
  publicRuntimeConfig: {
    LOGO_IMG_URL,
    HEADER_TITLE,
    FOOTER_COPYRIGHT,
    COLOR_HEADER_BG,
    COLOR_HEADER_TITLE,
    COLOR_HEADER_MENU,
    COLOR_FOOTER_BG,
    COLOR_FOOTER_MENU,
    COLOR_FOOTER_COPYRIGHT,
    COLOR_FOOTER_COPYRIGHT_BG
  },
  privateRuntimeConfig: {
    API_KEY,
    SERVICE_ID
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
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  }

}
