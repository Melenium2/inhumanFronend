<template>
  <div class="ei-form">
    <div v-if="$slots.header" class="ei-form-header"><slot name="header"></slot></div>
    <div v-if="$slots.body" class="ei-form-body"><slot name="body"></slot></div>
    <div v-if="$slots.footer" class="ei-form-footer"><slot name="footer"></slot></div>
  </div>
</template>

<script>

export default {

}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-form.scss';
</style>