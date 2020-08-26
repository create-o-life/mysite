export default function ({ $axios, $config }) {
  $axios.onRequest(config => {
    config.headers.common['X-API-KEY'] = $config.API_KEY
  })
}