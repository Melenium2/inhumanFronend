<template>
	<div class="ei-table-filter">
		<div ref="templates" class="templates">
			<div class="templates-header">
				<h3>Filters</h3>
			</div>
			<div class="filter">
				<div class="filter-static">
					<span class="label">View last</span>
					<ei-group-buttons v-model="activeItem">
						<ei-group-item>7 days</ei-group-item>
						<ei-group-item>30 days</ei-group-item>
					</ei-group-buttons>
				</div>
                <span class="label">or</span>
				<div class="filter-custom">
					<span class="label">
						<awesome-icon class="label-icon" icon="calendar-alt"></awesome-icon>
					</span>
					<ei-date-picker
						:is-dark="$store.getters['GET_THEME'] == 'dark-theme'"
						mode="range"
						class="date-picker"
						locale="en"
						v-model="dateRange"
						:select-attribute="selectDragAttribute"
						:drag-attribute="selectDragAttribute"
						color="indigo"
						:min-date="availableDates.start"
						:max-date="availableDates.end"
						@drag="dragValue = $event"
					>
						<div slot="day-popover" slot-scope="{format}">
							{{ format(dragValue ? dragValue.start : dateRange.start, 'MMM D') }}
							-
							{{ format(dragValue ? dragValue.end : dateRange.end, 'MMM D') }}
						</div>
					</ei-date-picker>
				</div>
                <ei-button class="default-btn" flat @click="defaultFilter">Default</ei-button>
			</div>
		</div>
		<div class="border" @click="expand">
			<span class="left"></span>
			<span class="text" :class="{ 'triggered': isEpxanded }">
				Filter
				<awesome-icon class="icon" icon="chevron-down"></awesome-icon>
			</span>
			<span class="right"></span>
		</div>
	</div>
</template>

<script>
import EiGroupButtons from '../EiGroupButtons/Ei-group-buttons'
import EiGroupItem from '../EiGroupButtons/Ei-group-item'

export default {
	components: {
		EiGroupButtons,
		EiGroupItem
    },
    props: {
        availableDates: {
            type: Object
        }
    },
	data: () => ({
        dragValue: null,
		activeItem: -1,
		isEpxanded: false,
        dateRange: {
            start: null,
            end: null,
        }
    }),
    watch: {
        activeItem(val) {
			if (val != -1) {
				this.dateRange = {
					start: null,
					end: null,
				}
				this.$emit('filter', val)
			}
        },
        dateRange(val) {
			if (val.start != null && val.end != null) {
				this.activeItem = -1
				this.$emit('filter', val)	
			}
        }
    },
	computed: {
		selectDragAttribute() {
			return {
				popover: {
					visibility: 'hover',
					isInteractive: false
				}
			}
		}
	},
	methods: {
		expand() {
			const item = this.$refs.templates
			if (this.isEpxanded) {
				item.style.maxHeight = null
			} else {
				item.style.maxHeight = `${item.scrollHeight + 21}px`
			}

			this.isEpxanded = !this.isEpxanded
		},
		defaultFilter() {
			this.dateRange = {
				start: null,
				end: null,
			}
			this.activeItem = -1
			this.$emit('filter', null)
		}
	},
	mounted() {}
}
</script>
