<template>
<div
  :class="$style[imgSize]"
  :style="(bgImg)? `background:url('${bgImg}');background-repeat: no-repeat;background-size:cover;background-position:center;height:100%;` : `background-color: ${color.bg};height:100%;`"
>
  <div v-html="item.content"></div>
  <template v-if="item.btnLabel && item.btnLink">
  <div class="d-flex justify-center">
    <Btn :item="item" />
  </div>
  </template>
</div>
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
      if (this.item.bgImg) {
        const val = {
          two: {
            xs: 574,
            sm: 454,
            md: 426,
            lg: 568,
            xl: 868
          },
          three: {
            xs: 574,
            sm: 454,
            md: 276,
            lg: 371,
            xl: 571
          },
          other: {
            xs: 574,
            sm: 934,
            md: 876,
            lg: 1161,
            xl: 1761
          }
        }
        const size = this.size(val)
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
        return this.item.bgImg.url + `?auto=compress&fit=clip&w=${size}&blend-mode=normal&blend-color=${color}` 
      }
    },
    imgSize () {
        const val = {
          two: {
            xs: 'col6xs',
            sm: 'col6sm',
            md: 'col6md',
            lg: 'col6lg',
            xl: 'col6xl'
          },
          three: {
            xs: 'col4xs',
            sm: 'col4sm',
            md: 'col4md',
            lg: 'col4lg',
            xl: 'col4xl'
          },
          other: {
            xs: 'col12xs',
            sm: 'col12sm',
            md: 'col12md',
            lg: 'col12lg',
            xl: 'col12xl'
          }
        }
        const size = this.size(val)
      return size
    }
  },
  methods: {
    bp (x) {
      if (this.$vuetify.breakpoint.xs) {
        return x.xs
      }
      else if (this.$vuetify.breakpoint.sm) {
        return x.sm
      }
      else if (this.$vuetify.breakpoint.md) {
        return x.md
      }
      else if (this.$vuetify.breakpoint.lg) {
        return x.lg
      }
      else if (this.$vuetify.breakpoint.xl) {
        return x.xl
      }
    },
    size (y) {
      if (this.item.type != null) {
        if (this.item.type[0] === '2列'){
          return this.bp(y.two)
        }
        else if (this.item.type[0] === '3列'){
          return this.bp(y.three)
        }
        else {
          return this.bp(y.other)
        }
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

<style module>
.col12xs img {
    max-width: 264px;
}
.col12sm img {
    max-width: 544px;
}
.col12md img {
    max-width: 844px;
}
.col12lg img {
    max-width: 1129px;
}
.col12xl img {
    max-width: 1729px;
}
.col6xs img {
    max-width: 264px;
}
.col6sm img {
    max-width: 244px;
}
.col6md img {
    max-width: 394px;
}
.col6lg img {
    max-width: 536px;
}
.col6xl img {
    max-width: 836px;
}
.col4xs img {
    max-width: 264px;
}
.col4sm img {
    max-width: 244px;
}
.col4md img {
    max-width: 244px;
}
.col4lg img {
    max-width: 339px;
}
.col4xl img {
    max-width: 539px;
}
</style>
