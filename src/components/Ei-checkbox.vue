<template>
    <label class="ei-checkbox">
        <slot></slot>
        <input type="checkbox" :checked="checked" @change="check()" @click="$emit('click')">
        <span class="ei-checkbox-checkmark" />
    </label>
</template>

<script>
export default {
    props: {
        labelFontSize: {
            type: String,
            default: '16px'
        },
        checked: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isChecked: this.checked
        }
    },
    methods: {
        check() {
            this.isChecked = !this.isChecked
            this.$emit('change', this.isChecked)
        }
    }
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-checkbox';
</style>
