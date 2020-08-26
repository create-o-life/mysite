<template>
<v-breadcrumbs
  :items="items"
  class="py-2"
  divider=">"
>
  <template v-slot:item="props">
  <v-breadcrumbs-item>
    <v-btn
      :disabled="props.item.disabled"
      :to="props.item.to"
      :small="!$vuetify.breakpoint.xs"
      :x-small="$vuetify.breakpoint.xs"
      :color="color.bread"
      class="px-1"
      :text="(props.item.icon)? false : true"
      :rounded="(props.item.icon)? false : true"
      :icon="(props.item.icon)? true : false"
      exact
      nuxt
    >
      <v-icon v-if="props.item.icon">
        {{ props.item.icon }}
      </v-icon>
      <span v-if="props.item.text">
        {{ props.item.text }}    
      </span>
    </v-btn>
  </v-breadcrumbs-item>
  </template>
</v-breadcrumbs>
</template>

<script>
export default {
  props: ['menu', 'section'],
  data () {
    return {
      color: {
        bread: '#333'
      }
    }
  },
  mounted () {
      this.color = {
        bread: this.$config.COLOR_BREAD
      }
  },
  computed: {
    items () {
      var items = [
      {
        icon: 'mdi-home',
        disabled: false,
        to: '/'
      },
      {
        text: this.menu.title,
        disabled: true,
        to: `/${this.menu.id}`
      }
      ]
      
      if (this.$route.params.page) {
        items[1].disabled = false
        items = [
          ...items,
          {
            text: this.section.title,
            disabled: true,
            to: `/${this.menu.id}/${this.section.id}`
          }
        ]
      }
      
      return items
    }
  }
}
</script>