<template>
	<div class="ei-group-buttons" @click="isActive = false">
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
		activeChildren: null,
		isActive: false
	}),
	watch: {
		value(val) {
			if (val == -1) this.activeChildren = false
		},
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
			if (this.value != -1) this.children[this.value].isActive = true
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