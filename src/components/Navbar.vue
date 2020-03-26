<template>
  <div class="ei-navbar ei-navbar-fixed">
    <div class="container">
      <div class="ei-navbar-wrap">
        <i class="trigger" @click="$emit('trigger')">
          <awesome-icon icon="bars" size="lg"></awesome-icon>
        </i>
        <div class="ei-navbar-wrap-end">
          <ei-button :style="{'margin-right': '0.5rem', padding: '5px 10px'}" @click="$store.commit('SET_THEME', 'dark-theme')" flat>To dark theme</ei-button>
          <ei-notification></ei-notification>
          <ei-dropdown class="user-menu">
            <div slot="trigger" class="user-menu-trigger">
              <img :src="require('@/assets/images/user-avatar.png')" class="avatar">
              <div class="menu">
                <span class="username">Nikola Tesla</span>
                <span class="menu-helper">Menu <awesome-icon icon="angle-down"></awesome-icon> </span>
              </div>
            </div>
            <div slot="header" class="user-menu-header user-menu-trigger">
              <img :src="require('@/assets/images/user-avatar.png')" class="avatar">
              <div class="menu always-visible">
                <span class="username">Nikola Tesla</span>
                <span class="menu-helper">nikolatestla@gmail.com</span>
              </div>
            </div>
            <div slot="content" class="user-menu-content">
              <ei-button class="item" type="with-icon" icon="user">View profile</ei-button>
              <ei-button class="item" type="with-icon" icon="cogs">Account settings</ei-button>
              <ei-button class="item" type="with-icon" icon="signature">User activity</ei-button>
            </div>
            <div slot="footer" class="user-menu-content">
              <ei-button class="item" type="with-icon" icon="sign-out-alt">Sign out</ei-button>
            </div>
          </ei-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EiNotification from './Ei-notification'
import EiDropdown from './Ei-dropdown'

export default {
  components: {
    EiNotification,
    EiDropdown
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/components/navbar.scss";
</style>