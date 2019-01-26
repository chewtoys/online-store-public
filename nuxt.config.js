export default {
  /*
   ** Headers of the page
   */
  head: {
    title: 'online-store',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js + Vuetify.js project',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },
  modules: ['@nuxtjs/axios'],
  plugins: ['~/plugins/vuetify.js', '~/plugins/axios.js'],
  axios: {
    // proxyHeaders: false
  },
  css: ['~/assets/style/app.styl'],
  /*
   ** Customize the progress bar color
   */
  loading: false,
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
