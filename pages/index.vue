<template>
<v-main>
  テスト
  {{ res }}
</v-main>
</template>

<script>
export default {
  async asyncData ({ app }) {
    const res = await app.$axios.$get(`https://${process.env.SERVICE_ID}.microcms.io/api/v1/layout/layout`, {
        headers: { 'X-API-KEY': process.env.API_KEY }
    })
    return { res }
  }
}
</script>
