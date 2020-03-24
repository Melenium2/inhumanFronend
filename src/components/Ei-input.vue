<template>
	<div class="ei-input">
		<input
			class="ei-input-field"
			ref="input"
			v-model="bundle"
			@input="inputEvent"
			:placeholder="placeholder"
			@keypress="validateEvent"
			@blur="blurEvent"
			:class="{ 'ei-input-field-error': isError }"
		/>
	</div>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		required: {
			type: Boolean,
			default: false
		},
		onlyNumber: {
			type: Boolean,
			default: false
		},
		minValue: {
			type: Number
		}
	},
	data() {
		return {
			bundle: '',
			isError: false
		}
	},
	methods: {
		inputEvent() {
			this.isError = false
			this.$emit('input', this.bundle)
		},
		validateEvent(e) {
			if (this.minValue != undefined) {
				const keyCode = e.which ? e.which : e.keyCode
				if (keyCode != 46 && keyCode > 31 && (keyCode < 48 || keyCode > 57)) e.preventDefault()
			}
		},
		blurEvent() {
			if (this.required && this.bundle == '') this.isError = true
			if (this.minValue != undefined && this.bundle < this.minValue) this.bundle = this.minValue
		}
	},
	mounted() {
		if (this.minValue != undefined) {
			this.bundle = this.minValue
			this.inputEvent()
		}
	}
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-input.scss';
</style>