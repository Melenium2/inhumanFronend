<template>
	<div class="ei-select" ref="select" @keydown="selectEvent, movingEvent" :style="{ 'width': width }" v-click-outside="expand">
		<div v-if="!filter" 
			class="ei-select-header-button" 
			@click="expand" 
			:class="{ 'ei-select-header-active': isExpand , 'ei-select-header-error': isError}">
			<span class="placeholder">{{ selectedItem.text == null ? placeholder : selectedItem.text }}</span>
			<awesome-icon icon="angle-down" class="ei-select-dropdown-arrow arrow" :class="{ 'arrow-rotate': isExpand }"></awesome-icon>
		</div>
		<div v-else class="" @click="expand">
			<input 
				class="ei-select-header-input" 
				:placeholder="checkbox ? `Selected: ${pushedItems.length} items` : placeholder" 
				v-model="search" 
				ref="header-input"
				:class="{ 'ei-select-header-active': isExpand, 'ei-select-header-error': isError }" >
			<awesome-icon icon="angle-down" class="ei-select-dropdown-arrow arrow" :class="{ 'arrow-rotate': isExpand }"></awesome-icon>
		</div>
		<div class="ei-select-content scroll" ref="content">
			<div v-if="!checkbox">
				<div  	v-for="(item, index) in filtredItemsList"
						:key="index"
						class="ei-select-content-item"
						@click="setItem(item)"
						:class="{ 'focused': item.text == selectedItem.text, 'selected-by-keys': index + 1 == currentItem && filter}"
						:inner-html.prop="item.text | textHighlight(search)"
						>
				</div>
			</div>
			<div v-else>
				<ei-checkbox
					v-for="(item, index) in filtredItemsList"
					:key="index"
					:checked="item.checked"
					class="ei-select-content-item"
					@click="setItem(item)"
					:class="{ 'focused': false, 'selected-by-keys': index + 1 == currentItem && filter}">
						<span :inner-html.prop="item.text | textHighlight(search)"></span>
				</ei-checkbox>
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import EiCheckbox from './Ei-checkbox'

export default {
	directives: {
		ClickOutside
	},
	components: {
		EiCheckbox
	},
	props: {
		width: {
			type: String,
			default: '100%'
		},
		placeholder: String,
		items: {
			type: Array,
			default: () => []
		},
		selectItem: {
			type: Object,
			default: () => {}
		},
		filter: {
			type: Boolean,
			default: false
		},
		checkbox: {
			type: Boolean,
			default: false
		},
		direction: {
			type: String,
			default: 'bottom'
		},
		dropdownSize: {
			type: String,
			default: '15rem'
		},
		required: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			menuItems: this.items,
			isExpand: false,
			selectedItem: {},
			search: '',
			currentItem: 1,
			itemHeight: 0,
			pushedItems: [],
			isError: false
		};
	},
	methods: {
		expand(event) {
			let contentPanel = this.$refs["content"];
			if (contentPanel.style.maxHeight) {
				if (this.isExpand) {
					if (this.filter && this.$el.contains(event.target)) this.$refs['header-input'].focus()
					else {
						contentPanel.style.maxHeight = null;
						this.isExpand = false;
						if (this.required && !Object.keys(this.selectedItem).length > 0) this.isError = true
						if (this.selectedItem.text != null && this.filter) this.search = this.selectedItem.text
						if (this.filter) this.$refs['header-input'].blur()
						if (this.checkbox)
							setTimeout(() => {
								this.search = ''
							}, 250)
					}
				}
			} else {
				if (this.$el.contains(event.target)){
					if (this.required && this.isError) this.isError = false
					contentPanel.style.maxHeight = this.dropdownSize;
					if(this.filter) this.$refs['header-input'].focus()
					this.isExpand = true;
				}
			}
		},
		setItem(item) {
			if (this.checkbox) { 
				if(this.pushedItems.some(el => el === item.text)) { 
					this.pushedItems.splice(this.pushedItems.findIndex(el => el === item.text), 1)
				}
				else this.pushedItems.push(item.text) 

				let index = this.menuItems.findIndex(el => el.text == item.text)
				this.menuItems[index].checked = !this.menuItems[index].checked
				this.$emit('selected', this.pushedItems) 
			} else {
				this.selectedItem = item
				if (this.isExpand) this.expand()
				if (this.filter) this.search = item.text
			}
			this.$emit('change', item)
			this.$emit('select', item)
		},
		movingEvent(event) {
			if (this.isExpand && this.filtredItemsList.length > 0) {
				this.selectEvent(event)
				let items = Array.from(this.$el.getElementsByClassName('rc-select-item'))
				let index = items.indexOf(this.$el.getElementsByClassName('selected-by-keys')[0])
				if (event.keyCode == 40  && this.currentItem < this.filtredItemsList.length) {
					this.currentItem += 1
					items[index + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
					event.preventDefault()
				} else if (event.keyCode == 38 && this.currentItem <= this.filtredItemsList.length) {
					this.currentItem -= 1
					if (this.currentItem == 0) {
						this.currentItem = this.filtredItemsList.length
						items[items.length - 1].scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' })
					} else 
						items[index - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })

						event.preventDefault()
				} else if (event.keyCode == 40 || event.keyCode == 38 && this.currentItem >= this.filtredItemsList.length) {
					this.currentItem = 1
					items[0].scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'start' })
					event.preventDefault()
				}
			}
		},
		selectEvent(event) {
			if (event.key == "Enter") {
				// let newItem = this.filtredItemsList.find((item, index) => this.currentItem == index + 1)
				if (this.checkbox) this.$el.getElementsByClassName('rc-select-item')[this.currentItem - 1].click()
			}
		}
	},
	computed: {
		filtredItemsList() {
			if (this.filter) {
				// let list = this.menuItems.filter(item => item.text.toLowerCase().includes(this.search.toLowerCase()))
				// this.filtredListLenght = list.length;
				return this.menuItems.filter(item => item.text.toLowerCase().includes(this.search.toLowerCase()))
			}
			return this.menuItems
		}
	},
	created() {
		document.addEventListener('keydown', this.movingEvent)
		this.$nextTick(() => {
			let content = this.$refs['content']
			if (this.direction == 'top') {
				content.style.bottom = `${this.$refs['select'].clientHeight}px`
			}
		})
		this.menuItems = this.menuItems.map(el => {
			return {
				text: el.text,
				value: el.value,
				checked: false
			}
		})
	},
	mounted() {
		if(this.selectItem != null) {
			this.setItem(this.selectItem)
		}
	},
	filters: {
		textHighlight(text, query) {
			let check = new RegExp(query, 'ig')
			return text
				.toString()
				.replace(check, (matchedTxt) => `<span class="text-highlight" style="color: #76cd6f;">${matchedTxt}</span>`)
		}
	},
	destroyed() {
		document.removeEventListener('keydown', this.movingEvent)
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/ei-select';
</style>


