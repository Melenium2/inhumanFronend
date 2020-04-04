<template>
	<div class="ei-table">
		<ei-table-filter v-if="filter" @filter="filterEvent" :available-dates="availableDates"></ei-table-filter>
		<div ref="table" class="table">
			<div ref="table-content" class="table-content">
				<table :style="fixColumns.length > 0 ? { 'table-layout': 'fixed' } : ''">
					<thead ref="table-head">
						<th v-for="(column, index) in headerSlice" :key="index" :style="fixColumns.length > 0 ? { width: fixColumns[index] } : ''">
							<div
								class="header-ceil"
								:class="{ 'sort-mode': column.sortStatus != 'none' }"
								:style="{
									cursor: column.sort != undefined && column.sort != 'none' ? 'pointer' : 'default'
								}"
								@click="sort(index)"
							>
								<span>{{ column.label }}</span>
								<awesome-icon v-if="column.sortStatus != 'none' && column.sortStatus === 'sortDec'" class="sort-icon" icon="angle-up" />
								<awesome-icon v-else-if="column.sortStatus != 'none' && column.sortStatus === 'sortInc'" class="sort-icon" icon="angle-down" />
							</div>
						</th>
					</thead>
					<tbody ref="table-body">
						<tr v-for="(row, index) in rowSlice" :key="index" class="table-row" :style="{ height: `${standartRowHeight}px` }">
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
					<li v-for="(item, key) in paginationSlice" :key="key" class="pagination-list-item" :class="{ 'active-item': item == page }" @click="page = item">
						{{ item }}
					</li>
				</ul>
				<ei-button icon="chevron-right" :disabled="page * itemsPerPage > rowsx.length" type="icon" @click="nextPage" />
				<span class="count">Items: {{ rowsx.length }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import EiTableFilter from "./Ei-table-filter"
import sort from "../../utils/_arraysUtils"

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
		headerSlice: []
	}),
	watch: {
		rows(val) {
			this.rowsx = val
		},
		rowSlice: {
			handler() {
			},
			deep: true
		}
	},
	computed: {
		rowSlice() {
			const slice = this.rowsx.slice(this.itemsPerPage * this.page - this.itemsPerPage, this.itemsPerPage * this.page)
			return slice
		},
		paginationSlice() {
			let pagination = [1, 2, 3, 4, 5]

			if (this.totalPages < 5) pagination = pagination.slice(0, this.totalPages)
			if (this.page > 2) {
				pagination = [1, "..", this.page, "..", this.totalPages]
				if (this.page > this.totalPages - 3) pagination = Array.from(pagination, (v, k) => this.totalPages - k).reverse()
			}
			return pagination
		},
		totalPages() {
			return Math.ceil(this.rowsx.length / this.itemsPerPage)
		},
		availableDates() {
			return this.findDatesRange()
			// return {}
		}
	},
	methods: {
		sort(index) {
			const header = this.headerSlice[index]
			if (header.sort != undefined && header.sort != "none") {
				if (header.sortStatus == "none" || header.sortStatus == "sortDec") {
					this.changeSortStatus(index, "sortInc")
					this.rowsx = this.sortInc(this.rowsx, header)
				} else {
					this.changeSortStatus(index, "sortDec")
					this.rowsx = this.sortDec(this.rowsx, header)
				}
			}
		},
		sortInc(array, header) {
			if (header.sort == "number") return sort.sortNumbers(array, header.field, (a, b) => a[header.field] - b[header.field])
			if (header.sort == "string") return sort.sortStrings(array, header.field, { method: "asc" })
			if (header.sort == "date") return sort.sortDates(array, header.field, { method: "asc" })
		},
		sortDec(array, header) {
			if (header.sort == "number") return sort.sortNumbers(array, header.field, (a, b) => b[header.field] - a[header.field])
			if (header.sort == "string") return sort.sortStrings(array, header.field, { method: "desc" })
			if (header.sort == "date") return sort.sortDates(array, header.field, { method: "desc" })
		},
		filterEvent(val) {
			if (val == null) {
				this.page = 1
				this.defaultHeaders()
				this.rowsx = this.rows
			} else {
				const header = this.headerSlice.filter((el) => el.sortStatus == "sortDec" || el.sortStatus == "sortInc")
				let array = [...this.rows]

				if (header.length > 0) array = this[header[0].sortStatus](array, header[0])

				if (typeof val == "object") {
					this.rowsx = this.filterForPeriod(array, val.start, val.end)
				} else if (typeof val == "number") {
					const today = new Date()
					let lastDays = 7
					if (val == 1) lastDays = 30
					this.rowsx = this.filterForPeriod(
						array,
						this.moment(today)
							.subtract(lastDays, "days")
							.toDate(),
						today
					)
				}
			}
		},
		filterForPeriod(array, start, end) {
			const dateIndex = this.headerSlice.find((el) => el.sort == "date")
			let newArray = []
			if (dateIndex != undefined) {
				const field = dateIndex.field
				newArray = array.filter((el) => this.moment(el[field]) >= this.moment(start) && this.moment(el[field]) <= this.moment(end))
			}
			return newArray
		},
		changeSortStatus(elIndex, status) {
			this.headerSlice.map((el) => (el.sortStatus = "none"))
			this.headerSlice[elIndex].sortStatus = status
		},
		resizeTableEvent() {
			this.$nextTick(() => {
				const tableHeight = this.$refs["table-content"].clientHeight
				const headersHeight = this.$refs["table-head"].clientHeight
				const exemplaryHeight = tableHeight - headersHeight
				this.exemplaryHeight = exemplaryHeight
				let prev = 0
				let itemsPerPage = 0
				do {
					prev += this.standartRowHeight
					itemsPerPage++
				} while (prev < exemplaryHeight)
				if (prev > exemplaryHeight) {
					this.standartRowHeight = (prev - this.standartRowHeight) / itemsPerPage
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

			this.headers.forEach((el) => {
				this.headerSlice.push({
					label: el.label,
					field: el.field,
					sort: el.sort,
					meta: el.meta,
					style: el.style,
					sortStatus: "none"
				})
			})
		},
		findDatesRange() {
			const dateIndex = this.headerSlice.find((el) => el.sort == "date")
			const availableRange = {
				start: null,
				end: null
			}
			if (dateIndex != undefined && this.rows.length > 0) {
				const array = [...this.rows]
				const sortedArray = sort.sortDates(array, dateIndex.field, {
					method: "asc"
				})
				availableRange.start = this.moment(sortedArray[0][dateIndex.field]).toDate()
				availableRange.end = this.moment(sortedArray[sortedArray.length - 1][dateIndex.field]).toDate()
			}
			return availableRange
		}
	},
	mounted() {
		this.defaultHeaders()
		this.rowsx = [...this.rows]
	},
	created() {
		window.addEventListener("resize", this.resizeTableEvent)
		this.resizeTableEvent()
	},
	destroyed() {
		window.removeEventListener("resize", this.resizeTableEvent)
	}
}
</script>

<style lang="scss">
@import "@/assets/scss/components/ei-table.scss";
</style>
