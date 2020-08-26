<template>
<v-col cols="auto">
  <v-carousel
    height="auto"
    cycle
    show-arrows-on-hover
  >
    <template v-for="item in section.item">
    <template v-if="item.bgImg">
    <SlideItem :item="item" />
    </template>
    </template>
  </v-carousel>
</v-col>
</template>

<script>
export default {
  props: ['section']
}
</script>
