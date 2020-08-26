<template>
<v-carousel-item
  :src="bgImg"
></v-carousel-item>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    color () {
      if (this.item.bgColor) {
        return { bg: this.item.bgColor}
      }
      else {
        return { bg: 'transparent'}
      }
    },
    bgImg () {
      var color = this.color.bg
      if (color.includes('#')) {
        color = color.slice(1)
      }
      else if (color.includes('rgba')) {
        color = color.slice(5)
        color = color.slice(0, -1)
        const rgba = color.split(',')
        const a = Math.round(rgba[3] * 255)
        color = this.change(a) + this.change(rgba[0]) + this.change(rgba[1]) + this.change(rgba[2])
      }
      else if (color.includes('gba')) {
        color = color.slice(4)
        color = color.slice(0, -1)
        const rgba = color.split(',')
        color = this.change(rgba[0]) + this.change(rgba[1]) + this.change(rgba[2])
      }
      return this.item.bgImg.url + `?auto=compress&fit=clip&w=600&blend-mode=normal&blend-color=${color}` 
    }
  },
  methods: {
    change (z) {
      if (z < 16) {
        return 0 + z.toString(16)
      }
      else {
        return z.toString(16)
      }
    }
  }
}
</script>
