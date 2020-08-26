<template>
<v-btn
  @click="btnAction(item.btnLink)"
  :color="color.btn"
  style="border-width:1.5px"
  min-width="150"
  outlined
  rounded
  large
>
  {{ item.btnLabel }}
</v-btn>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      color: {
        btn: '#333'
      }
    }
  },
  mounted () {
      this.color = {
        btn: this.$config.COLOR_BTN  
      }
  },
  methods: {
    btnAction (link) {
      if(link.includes('http')) {
        return window.open(link, '_blank')
      }
      else {
        return this.$router.push(link)
      }
    }
  }
}
</script>