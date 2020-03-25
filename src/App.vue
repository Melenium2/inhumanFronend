<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val)
    }
  },
  methods: {
    toggleClassInBody(theme) {
      if (theme.toLowerCase() == 'dark-theme')
        if (!document.body.classList.contains('dark-theme')) document.body.classList.add('dark-theme')
      else if (theme.toLowerCase() == 'default')
        if (document.body.classList.contains('dark-theme')) document.body.classList.remove('dark-theme')
    }
  }
}
</script>

<style lang="scss">

</style>