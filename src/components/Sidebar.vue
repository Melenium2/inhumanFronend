<template>
  <div class="ei-sidebar ei-sidebar-fixed ei-sidebar-full" :class="{'ei-sidebar-mobile-active': triggered}">
    <div class="ei-sidebar-header">
      <div class="wrapper">
        <img class="ei-sidebar-header-logo" :src="require('@/assets/images/Aiura_Logo.png')">
        <i @click="$emit('trigger')">
          <awesome-icon icon="caret-left" size="2x"></awesome-icon>
        </i>
      </div>
    </div>
    <div class="ei-sidebar-user">
      <h5 class="ei-menu-text">Your balance</h5>
      <div class="ei-sidebar-user-content">
        <div class="balance">
          <h1>20313 p.</h1>
          <ei-button type="icon" icon="chart-line" size="st"></ei-button>
        </div>
        <div class="plan">
          <span>Plan "Production plus"</span>
          <ei-button type="icon" icon="external-link-alt" size="st"></ei-button>
        </div>
        <div class="plan">
          <span>Last activity</span>
          <span>3 days ago</span>
        </div>
        <div class="links">
          <div class="buy-more">
            <ei-button type="with-icon" icon="plus" size="st" flat>Buy more</ei-button>
          </div>
          <div class="profile">
            <ei-button type="with-icon" icon="user" size="st" standart>Profile</ei-button>
          </div>
        </div>
      </div>
    </div>
    <div class="ei-sidebar-content">
      <h5 class="ei-menu-text">Menu</h5>
      <ul class="menu">
        <li v-for="(item, id) in menu" :key="id" class="menu-item">
            <a href="" :class="{ 'item-active': item.active }">
              <span class="icon"><awesome-icon :icon="item.icon"></awesome-icon></span>
              <span>{{ item.name }}</span>
            </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    triggered: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    menu: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'chart-pie',
        active: true
      },
      {
        name: 'Api usage',
        path: '/usage',
        icon: 'network-wired',
        active: false
      },
      {
        name: 'Documentation',
        path: '/docs',
        icon: 'coins',
        active: false
      },
      {
        name: 'Support',
        path: '/support',
        icon: 'paper-plane',
        active: false
      }
    ]
  })
}
</script>

<style lang="scss">
@import "@/assets/scss/components/sidebar.scss";
</style>