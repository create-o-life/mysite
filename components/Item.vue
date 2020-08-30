<template>
    <v-col
      :cols="cols.xs"
      :sm="cols.sm"
      :md="cols.md"
      class="align-self-stretch"
    >
      <template v-if="item.card">
      <v-card
        height="100%"
        elevation="1"
        tile
      >
        <template v-if="item.content">
        <Content :item="item" :class="$style.item" />
        </template>
      </v-card>
      </template>
      <template v-else>
        <template v-if="item.content">
        <Content :item="item" />
        </template>
      </template>
    </v-col>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    cols () {
      if (this.item.type[0] === '2列'){
        return {xs: 12, sm: 6, md: 6}
      }
      else if (this.item.type[0] === '3列'){
        return {xs: 12, sm: 6, md: 4}
      }
      else if (this.item.type[0] === '自動'){
        return {xs: 'auto', sm: 'auto', md: 'auto'}
      }
      else {
        return {xs: 12, sm: 12, md: 12}
      }
    }
  }
}
</script>

<style module>
.item {
    padding: 16px;
}
</style>