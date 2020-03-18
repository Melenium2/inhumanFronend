<template>
  <div class="ei-button" :class="[`ei-button-${type}`, `ei-button-${buttonType}`]">
    <span :class="[`ei-button-icon-size-${size}`]" v-if="type == 'icon' || type == 'with-icon'">
      <awesome-icon :icon="icon"></awesome-icon>
    </span>
    <span class="ei-button-content"><slot></slot></span>
  </div>
</template>

<script>

export default {
  name: 'ei-button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String, 
      default: ''
    },
    size: {
      type: String,
      defalt: 'st'
    },
    flat: {
      type: Boolean,
      default: false
    },
    standart: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonType() {
      if (this.flat) return 'flat'
      if (this.standart) return 'standart'
      else return 'default'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/ei-button.scss';
</style>