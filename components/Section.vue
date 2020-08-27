<template>
<div
  :style="(bgImg)? `background:url('${bgImg}');background-repeat: no-repeat;background-size:cover;background-position:center;height:${height};` : `background-color: ${color.bg};height:${height}`"
>
  <template v-if="bread && $route.params.page">
  <Bread :menu="menu" :section="section" />
  </template>
  
  <v-container
    class="pb-4 pb-sm-6 d-flex align-center"
    style="height:100%"
  >
    <v-row justify="center" align="center">
      <template v-if="sectionType == null || sectionType === 'アイキャッチ'">
      <template v-for="item in section.item">
      <Item :item="item" />
      </template>
      </template>
      <template v-else-if="sectionType === '画像スライド'">
      <Slide :section="section" />
      </template>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  props: ['section', 'menu'],
  computed: {
    color () {
      if (this.section.bgColor) {
        return { bg: this.section.bgColor}
      }
      else {
        return { bg: 'transparent'}
      }
    },
    bgImg () {
      if (this.section.bgImg) {
        const val = {
            xs: 600,
            sm: 960,
            md: 1264,
            lg: 1264,
            xl: 1264
        }
        const size = this.bp(val)
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
        return this.section.bgImg.url + `?auto=compress&fit=clip&w=${size}&blend-mode=normal&blend-color=${color}` 
      }
    },
    height () {
      if (this.section.type[0] === 'アイキャッチ') {
        if (this.$route.path === '/') {
          return '100vh'
        }
        else if (this.$vuetify.breakpoint.mdAndUp) {
          return 'calc(100vh - 64px)'
        }
        else {
          return 'calc(100vh - 56px)'
        }
      }
    },
    sectionType () {
      if (this.section.type) {
        return this.section.type[0]
      }
    },
    bread () {
      if (this.menu) {
        return this.menu.bread
      }
    }
  },
  methods: {
    bp (x) {
      if (this.$vuetify.xs) {
        return x.xs
      }
      else if (this.$vuetify.sm) {
        return x.sm
      }
      else if (this.$vuetify.md) {
        return x.md
      }
      else if (this.$vuetify.lg) {
        return x.lg
      }
      else if (this.$vuetify.xl) {
        return x.xl
      }
    },
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