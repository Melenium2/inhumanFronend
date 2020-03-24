<template>
  <div 
      class="ei-button" 
      :class="[`ei-button-${type}`, `ei-button-${buttonType}`, {'ei-button-disabled': disabled, 'disable-hover': confirmOverlay}]"
      @click="clickEvent"
    >
    <span :class="[`ei-button-icon-size-${size}`]" v-if="type == 'icon' || type == 'with-icon'">
      <awesome-icon :icon="icon"></awesome-icon>
    </span>
    <span class="ei-button-content"><slot></slot></span>
    <div v-if="confirmOverlay" class="confirm-overlay">
      <span class="icon"><awesome-icon icon="question-circle"></awesome-icon></span>
      <span>Confirm</span>
    </div>
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
    },
    'with-confirm': {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    confirmOverlay: false
  }),
  methods: {
    clickEvent() {
      if (this.$props.withConfirm && !this.confirmOverlay) this.confirmOverlay = !this.confirmOverlay
      else {
        this.confirmOverlay = false
        this.$emit('click')
      }
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