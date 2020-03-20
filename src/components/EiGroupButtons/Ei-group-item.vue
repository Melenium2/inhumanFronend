<template>
	<div class="ei-group-item" @click="select" :class="{ 'ei-group-item-active': isActive }">
		<span>
			<slot />
		</span>
	</div>
</template>

<script>
export default {
	data: () => ({
		isActive: false
	}),
	methods: {
		select() {
			this.isActive = true
			this.$parent.activeChildren = this._uid
		}
	}
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-group-buttons.scss';
</style>