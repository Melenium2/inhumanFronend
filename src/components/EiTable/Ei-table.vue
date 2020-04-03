<template>
	<div class="ei-table">
		<ei-table-filter v-if="filter" @filter="filterEvent" :available-dates="availableDates"></ei-table-filter>
		<div ref="table" class="table">
			<div ref="table-content" class="table-content">
				<table :style="fixColumns.length > 0  ? {'table-layout': 'fixed'}: ''">
					<thead ref="table-head">
						<th v-for="(column, index) in headerSlice" :key="index" :style="fixColumns.length > 0 ? { 'width': fixColumns[index] } : ''">
							<div
								class="header-ceil"
								:class="{'sort-mode': column.sortStatus != 'none'}"
								:style="{'cursor': column.sort != undefined && column.sort != 'none' ? 'pointer' : 'default'}"
								@click="sort(index)"
							>
								<span>{{ column.label }}</span>
								<awesome-icon v-if="column.sortStatus != 'none' && column.sortStatus === 'sortDec'" class="sort-icon" icon="angle-up" />
								<awesome-icon v-else-if="column.sortStatus != 'none' && column.sortStatus === 'sortInc'" class="sort-icon" icon="angle-down" />
							</div>
						</th>
					</thead>
					<tbody ref="table-body">
						<tr v-for="(row, index) in rowSlice" :key="index" class="table-row" :style="{height: `${standartRowHeight}px`}">
							<td v-for="(column, index) in headerSlice" :key="index">
								<span :title="row[column.field]">{{ row[column.field] }}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div ref="pagination" class="pagination">
				<ei-button icon="chevron-left" :disabled="page == 1" type="icon" @click="prevPage" />
				<ul class="pagination-list">
					<li v-for="(item, key) in paginationSlice"
						:key="key"
						class="pagination-list-item" 
						:class="{'active-item': item == page}"
						@click="page = item">
						{{ item }}
					</li>
				</ul>
				<ei-button icon="chevron-right" :disabled="(page * itemsPerPage) > rows.length" type="icon" @click="nextPage" />
				<span class="count">Items: {{ rows.length }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import EiTableFilter from './Ei-table-filter'
import sort from '../../utils/_arraysUtils'

export default {
	components: {
		EiTableFilter
	},
    props: {
        headers: {
            type: Array,
            default: () => []
        },
        rows: {
            type: Array,
            default: () => []
        },
        fixColumns: {
            type: Array,
            default: () => []
        },
		filter: {
			type: Boolean,
			default: false
		}
    },
	data: () => ({
        itemsPerPage: 0,
		page: 1,
		standartRowHeight: 38,
		exemplaryHeight: 0,
		rowsx: [],
		headerSlice: [],
	}),
	watch: {
		rows(newValue) {
			this.rowsx = newValue
		},
		rowSlice: {
			handler() {
			},
			deep: true
		}
	},
	computed: {
		rowSlice() {
			return this.rowsx.slice(this.itemsPerPage * this.page - this.itemsPerPage, this.itemsPerPage * this.page)
		},
		paginationSlice() {
			let pagination = [1, 2, 3, 4, 5]

			if (this.totalPages < 5) pagination = pagination.slice(0, this.totalPages)
			if (this.page > 2) {
				pagination = [1, '..', this.page, '..', this.totalPages]
				if (this.page > (this.totalPages - 3)) pagination = Array.from(pagination, (v, k) => this.totalPages - k).reverse()
			}
			return pagination
		},
		totalPages() {
			return Math.ceil(this.rows.length / this.itemsPerPage)
		},
		availableDates() {
			return this.findDatesRange()
		}
	},
	methods: {
		sort(index) {
			const header = this.headerSlice[index]
			if (header.sort != undefined && header.sort != 'none') {
				const sortField = header.field
				if (header.sortStatus == 'none' || header.sortStatus == 'sortDec') {
					this.changeSortStatus(index, 'sortInc')
					if (header.sort == 'number') 
						this.rowsx = sort.sortNumbers(this.rows, header.field, (a, b) => a[sortField] - b[sortField])
					if (header.sort == 'string')
						this.rowsx = sort.sortStrings(this.rowsx, header.field, { method: 'asc' })
					if (header.sort == 'date')
						this.rowsx = sort.sortDates(this.rowsx, header.field, { method: 'asc' })
				} else {
					this.changeSortStatus(index, 'sortDec')
					if (header.sort == 'number') 
						this.rowsx = sort.sortNumbers(this.rows, header.field, (a, b) => b[sortField] - a[sortField])
					if (header.sort == 'string')
						this.rowsx = sort.sortStrings(this.rowsx, header.field, { method: 'desc' })
					if (header.sort == 'date')
						this.rowsx = sort.sortDates(this.rowsx, header.field, { method: 'desc' })
				}
			}
		},
		filterEvent(val) {
			if (val == null) {
				this.defaultHeaders()
				this.rowsx = this.rows
			}
			if (typeof val == "object") {
				this.rowsx = this.filterForPeriod(this.rowsx, val.start, val.end)
				console.log(val)
			}
			if (typeof val == "number") {
				const today = new Date()
				this.rowsx = this.filterForPeriod(this.rowsx, this.moment(today).subtract(7, 'days').toDate(), today)
				console.log(val)	
			}
		},
		filterForPeriod(array, start, end) {
			console.log(array, start, end)
			// const dateIndex = this.headerSlice.find(el => el.sort == 'date')
			return array
		},
		changeSortStatus(elIndex, status) {
			this.headerSlice.map(el => el.sortStatus = 'none')
			this.headerSlice[elIndex].sortStatus = status
		},
		resizeTableEvent() {
			this.$nextTick(() => {
				const tableHeight = this.$refs['table-content'].clientHeight
				const headersHeight = this.$refs['table-head'].clientHeight
				const exemplaryHeight = tableHeight - headersHeight
				this.exemplaryHeight = exemplaryHeight
				let prev = 0
				let itemsPerPage = 0
				do {
					prev += this.standartRowHeight
					itemsPerPage++
				} while (prev < exemplaryHeight)
				if (prev > exemplaryHeight) {
					this.standartRowHeight = (prev-this.standartRowHeight)/itemsPerPage
				}
				this.itemsPerPage = itemsPerPage - 1
			})
		},
		prevPage() {
			this.page = this.page - 1
		},
		nextPage() {
			this.page = this.page + 1
		},
		defaultHeaders() {
			if (this.headerSlice.length > 0) this.headerSlice = []

            this.headers.forEach(el => {
                this.headerSlice.push({ label: el.label, field: el.field, sort: el.sort, meta: el.meta, style: el.style, sortStatus: 'none' })
            })
		},
		findDatesRange() {
			const dateIndex = this.headerSlice.find(el => el.sort == 'date')
			const availableRange = {
				start: null,
				end: null
			}
			if (dateIndex != undefined && this.rows.length > 0) {
				const sortedArray = sort.sortDates(this.rows, dateIndex.field, {method: 'asc'})
				availableRange.start = this.moment(sortedArray[0][dateIndex.field]).toDate()
				availableRange.end = this.moment(sortedArray[sortedArray.length -1][dateIndex.field]).toDate()
			}
			return availableRange
		}
	},
	mounted() {
		this.defaultHeaders()
		this.rowsx = this.rows
	},
	created() {
		window.addEventListener('resize', this.resizeTableEvent)
		this.resizeTableEvent()
	},
	destroyed() {
		window.removeEventListener('resize', this.resizeTableEvent)
	}
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-table.scss';
</style>