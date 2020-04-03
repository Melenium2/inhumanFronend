<template>
	<div class="ei-table-filter">
		<div ref="templates" class="templates">
			<div class="templates-header">
				<h3>Filters</h3>
			</div>
			<div class="filter">
				<span class="label">View last</span>
				<ei-group-buttons v-model="activeItem" inactive>
					<ei-group-item>7 days</ei-group-item>
					<ei-group-item>30 days</ei-group-item>
				</ei-group-buttons>
                <span class="label">or</span>
				<span class="label">
					<awesome-icon class="label-icon" icon="calendar-alt"></awesome-icon>
				</span>
				<ei-date-picker
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
                <ei-button class="default-btn" flat @click="$emit('filter', null)">Default</ei-button>
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
		activeItem: 0,
		isEpxanded: false,
        dateRange: {
            start: null,
            end: null,
        }
    }),
    watch: {
        activeItem(val) {
            this.$emit('filter', val)
        },
        dateRange(val) {
            this.$emit('filter', val)
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
		}
	},
	mounted() {}
}
</script>
