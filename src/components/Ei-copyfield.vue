<template>
  <div class="ei-copy-field" @click="copy">
    <input class="field" type="text" disabled :value="text">
    <div class="message-box" :class="{'message-box-active': isActive}">
      <span>Copied!</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    text: {
      type: String, 
      default: ''
    }
  },
  data: () => ({
    isActive: false
  }),
  methods: {
    copy() {
      this.isActive = true
      setTimeout(() => {
        this.isActive = false
      }, 1500)
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-copyfield.scss';
</style>