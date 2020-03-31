<template>
  <div class="ei-copy-field" @click="copy">
    <input class="field" type="text" disabled :value="text" :class="{ 'protector': isProtectionActive }">
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
    },
    protected: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isActive: false,
    isProtectionActive: false,
  }),
  computed: {
    protector() {
      if (this.isProtectionActive) return {
        'filter': 'blur(3px)'
      }

      return {}
    }
  },
  methods: {
    copy() {
      this.isActive = true
      setTimeout(() => {
        this.isActive = false
      }, 1500)
    }
  },
  mounted() {
    this.isProtectionActive = this.protected
  }
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-copyfield.scss';
</style>