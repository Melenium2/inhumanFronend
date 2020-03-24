<template>
	<div class="main">
		<Sidebar :triggered="isTriggered" @trigger="trigger" />
		<div class="main-overlay" :class="{'main-overlay-active': overlayActive}"></div>
		<div class="main-wrap">
			<Navbar @trigger="trigger" />
			<div class="main-container">
				<transition name="zoom-fade" mode="out-in">
					<router-view></router-view>
				</transition>
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
	computed: {
		overlayActive() {
			return this.$store.getters['GET_GLOBAL_OVERLAY_STATUS']
		}
	},
	data: () => ({
		isTriggered: false
	}),
	methods: {
		trigger() {
			this.isTriggered = !this.isTriggered
			this.$store.commit('SET_GLOBAL_OVERLAY_STATUS', this.isTriggered)
		}
	}
}
</script>

<style lang="scss">
.zoom-fade-enter-active,
.zoom-fade-leave-active {
	transition: transform 0.35s, opacity 0.28s ease-in-out;
}
.zoom-fade-enter {
	transform: scale(0.97);
	opacity: 0;
}

.zoom-fade-leave-to {
	transform: scale(1.03);
	opacity: 0;
}
:focus {
	outline: none !important;
}
</style>