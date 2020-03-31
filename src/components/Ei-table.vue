<template>
	<div class="ei-table">
		<div ref="table" class="table">
			<div ref="table-content" class="table-content">
				<table :style="fixColumns.length > 0  ? {'table-layout': 'fixed'}: ''">
					<thead ref="table-head">
						<th v-for="(column, index) in headerSlice" :key="index" :style="fixColumns.length > 0 ? { 'width': fixColumns[index] } : ''">
							<div
								class="header-ceil"
								:class="{'sort-mode': column.sortStatus != 'none', 'cursor': column.sort != 'none' ? 'pointer' : 'default'}"
								@click="headerSort(index, column.field)"
							>
								<span>{{ column.label }}</span>
								<awesome-icon v-if="column.sortStatus != 'none' && column.sortStatus === 'sortDec'" class="sort-icon ml-1" icon="angle-down" />
								<awesome-icon v-else-if="column.sortStatus != 'none' && column.sortStatus === 'sortInc'" class="sort-icon ml-1" icon="angle-up" />
							</div>
						</th>
					</thead>
					<tbody ref="table-body">
						<tr v-for="(row, index) in rowsSlice" :key="index" class="table-row" :style="{height: `${standartRowHeight}px`}">
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
				<span class="pl-2 pr-2">Items: {{ rows.length }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
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
        }
    },
	data: () => ({
        itemsPerPage: 0,
		page: 1,
		standartRowHeight: 38,
		exemplaryHeight: 0,
		headerSlice: []
	}),
	computed: {
		rowsSlice() {
			if (this.itemsPerPage == 0) return this.rows
            else return this.rows.slice(this.itemsPerPage * this.page - this.itemsPerPage, this.itemsPerPage * this.page)
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
		}
	},
	methods: {
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
		}
	},
	mounted() {
		this.defaultHeaders()
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