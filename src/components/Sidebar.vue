<template>
	<div class="ei-sidebar ei-sidebar-fixed ei-sidebar-full" :class="{'ei-sidebar-mobile-active': triggered}">
		<div class="ei-sidebar-header">
			<div class="wrapper">
				<img class="ei-sidebar-header-logo" :src="require('@/assets/images/Aiura_Logo.png')" />
				<i class="trigger" @click="$emit('trigger')">
					<awesome-icon icon="caret-left" size="2x"></awesome-icon>
				</i>
			</div>
		</div>
      <simplebar class="ei-sidebar-body">
        <div class="ei-sidebar-body-wrapper">
          <div class="ei-sidebar-user">
            <h5 class="ei-menu-text">Available balance</h5>
            <div class="ei-sidebar-user-content">
              <div class="balance">
                <h1>20313 p.</h1>
                <ei-button type="icon" icon="history" size="st"></ei-button>
              </div>
              <div class="plan">
                <span>Plan:</span>
                <span class="plan-name">"Some super"</span>
              </div>
              <div class="plan">
                <span>Untill:</span>
                <span class="plan-name">03/20/14</span>
              </div>
              <div class="links">
                <div class="buy-more">
                  <ei-button type="with-icon" icon="plus" size="st" flat>Add points</ei-button>
                </div>
                <div class="profile">
                  <ei-button type="with-icon" icon="angle-double-up" size="st" standart>Upgrade</ei-button>
                </div>
              </div>
            </div>
          </div>
          <h5 class="ei-menu-text">Menu</h5>
          <div class="ei-sidebar-content">
            <ul class="menu">
              <li v-for="(item, id) in menu" :key="id" class="menu-item">
                <router-link :to="item.path" :class="{ 'item-active': item.active }">
                  <span class="icon">
                    <awesome-icon :icon="item.icon"></awesome-icon>
                  </span>
                  <span>{{ item.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </simplebar>
	</div>
</template>

<script>
import simplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'

export default {
  components: {
    simplebar
  },
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
  }),
  watch: {
      '$route'() {
          this.setActiveButton()
      }
  },
  methods: {
    setActiveButton() {
      this.menu = this.menu.map(el => {
          if (this.$route.path.includes(el.path)) el.active = true
          else el.active = false
          return el
      })
    }
  },
  mounted() {
    this.setActiveButton()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/sidebar.scss';
</style>