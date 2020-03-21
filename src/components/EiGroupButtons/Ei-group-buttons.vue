<template>
	<div class="ei-group-buttons">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Number
		}
	},
	data: () => ({
		children: null,
		activeChildren: null
	}),
	watch: {
		activeChildren(newVal) {
			this.activeChildren = newVal
			this.deactivateChildrens()
			this.$emit(
				'input',
				this.children.findIndex(el => el.isActive == true)
			)
		}
	},
	methods: {
		deactivateChildrens() {
			this.children.forEach(element => {
				element.isActive = element._uid == this.activeChildren ? true : false
			})
		},
		activeByDefault() {
			this.children[this.value].isActive = true
		}
	},
	mounted() {
		this.activeByDefault()
	},
	created() {
		this.children = this.$children
	}
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-group-buttons.scss';
</style>