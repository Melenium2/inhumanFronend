<template>
  <div class="ei-dropdown">
    <div ref="trigger" class="ei-dropdown-trigger" @click="trigger"><slot name="trigger" /></div>
    <div ref="dropdown" class="ei-dropdown-body" :class="{'ei-dropdown-active': triggered}" :style="styles">
      <div v-if="$slots.header" class="ei-dropdown-body-header"><slot name="header" /></div>
      <div v-if="$slots.content" class="ei-dropdown-body-content"><slot name="content" /></div>
      <div v-if="$slots.footer" class="ei-dropdown-body-footer"><slot name="footer" /></div>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    triggered: false,
    styles: 0
  }),
  methods: {
    trigger() {
      this.triggered = !this.triggered
    },
    calculateStyles() {
      let client = this.$refs.dropdown.getClientRects()[0]
      let windowWidth = window.innerWidth
      let styles = {
        transform: {
          x: '0',
          y: '0'
        }
      }

      if (client.right > windowWidth) {
        styles.transform.x = `${(client.right - windowWidth + 15) * -1}px`
      } else {
        styles.transform.x = '-50%',
        styles['left'] = '50%'
      }

      if (client.top < 0) {
        let trigger = this.$refs.trigger.getClientRects()[0]
        let bottomEdge = trigger.height + trigger.top
        styles.transform.y = `${bottomEdge}px`
      }

      return Object.assign(styles, {transform: `translate(${styles.transform.x}, ${styles.transform.y})`})
    }
  },
  mounted() {
    this.styles = this.calculateStyles()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/ei-dropdown.scss';
</style>