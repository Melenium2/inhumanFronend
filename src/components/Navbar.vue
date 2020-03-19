<template>
  <div class="ei-navbar ei-navbar-fixed">
    <div class="container">
      <div class="ei-navbar-wrap">
        <i class="trigger" @click="$emit('trigger')">
          <awesome-icon icon="bars" size="lg"></awesome-icon>
        </i>
        <h1>Some-content</h1>
        <ei-notification></ei-notification>
      </div>
    </div>
  </div>
</template>

<script>
import EiNotification from './Ei-notification'

export default {
  components: {
    EiNotification
  },
  data: () => ({
    isTriggered: false
  }),
}
</script>

<style lang="scss">
@import "@/assets/scss/components/navbar.scss";
</style>