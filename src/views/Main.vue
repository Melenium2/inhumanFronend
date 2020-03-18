<template>
  <div class="main">
    <Sidebar :triggered="isTriggered" @trigger="trigger" />
    <div class="main-overlay" :class="{'main-overlay-active': isTriggered}"></div>
    <div class="main-wrap">
      <Navbar @trigger="trigger" />
      <div class="main-container">
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default {
  components: {
    Sidebar,
    Navbar
  },
  data: () => ({
    isTriggered: false
  }),
  methods: {
    trigger() {
      this.isTriggered = !this.isTriggered
    }
  }
}
</script>

<style lang="scss">
</style>