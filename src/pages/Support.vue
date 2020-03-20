<template>
  <div class="support">
    <div class="support-header">
      <span class="main-container-subtitle">User support</span>
      <h2 class="main-container-title">Support</h2>
      <span class="main-container-page-description">You can ask your questions here</span>
    </div>
    <div class="support-body">
      <ei-group-buttons v-model="activeItem">
        <ei-group-item>Opened</ei-group-item>
        <ei-group-item>Completed</ei-group-item>
      </ei-group-buttons>
    </div>
  </div>
</template>

<script>
import EiGroupItem from '../components/EiGroupButtons/Ei-group-item'
import EiGroupButtons from '../components/EiGroupButtons/Ei-group-buttons.vue'


export default {
  components: {
    EiGroupButtons,
    EiGroupItem
  },
  data: () => ({
    activeItem: 0
  })
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/support.scss';
</style>