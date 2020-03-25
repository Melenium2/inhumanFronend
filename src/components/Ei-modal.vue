<template>
  <div class="ei-modal" :class="{'ei-modal-visible': visible}">
    <div v-if="$slots.header" class="ei-modal-header">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.body" class="ei-modal-body">
      <slot name="body"></slot>
    </div>
    <div v-if="$slots.footer" class="ei-modal-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(newProp) {
      this.$store.commit('SET_GLOBAL_OVERLAY_STATUS', newProp)
    }
  },
  mounted() {
    if (this.visible) this.$store.commit('SET_GLOBAL_OVERLAY_STATUS', true)
  },
  beforeDestroy() {
    this.$store.commit('SET_GLOBAL_OVERLAY_STATUS', false)
  }
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-modal.scss';
</style>