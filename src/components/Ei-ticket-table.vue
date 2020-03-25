<template>
	<table class="ei-ticket-table">
		<thead ref="table-head">
			<tr>
				<th v-for="(column, index) in headers" :key="index">
					<div class="ei-ticket-table-head-item">
						<span>{{ column.label }}</span>
					</div>
				</th>
			</tr>
		</thead>
		<tbody v-if="rows.length > 0" ref="table-body">
			<tr v-for="(row, index) in rows" :key="index">
				<td v-for="(column, index) in headers" :key="index" @click="() => $router.push({path: `/support/ticket`, query: { id: row.id }})">
					<span v-line-clamp:20="2" :style="getStyle(column.meta, row[column.field])">{{ row[column.field] }}</span>
				</td>
			</tr>
			<tr v-if="upload" class="ei-ticket-table-upload">
				<td colspan="4">
          <ei-button v-if="!isUploading" type="with-icon" icon="sync-alt" @click="more">More</ei-button>
          <awesome-icon v-else class="uploading" icon="sync-alt"></awesome-icon>
				</td>
			</tr>
		</tbody>
		<tr v-else class="ei-ticket-table-no-data">
			<td colspan="4">No tickets</td>
		</tr>
	</table>
</template>

<script>
export default {
	props: {
		rows: {
			type: Array,
			default: () => []
		},
		upload: Boolean
	},
	data: () => ({
    isUploading: false,
    headers: [
      {
          label: 'Subject',
          field: 'subject'
      },
      {
          label: 'Section',
          field: 'section'
      },
      {
          label: 'Created',
          field: 'date'
      },
      {
          label: 'Status',
          field: 'status',
          meta: 'colorized'
      }
  ]
	}),
	watch: {
		rows() {
			this.isUploading = false
		}
	},
	methods: {
		getStyle(meta, flag) {
			if (meta != undefined) {
				let color = flag == 'Opened' || flag == 'Processing' ? '#FF9F43' : '#6576ff'
				return {
					color: color
				}
			}
		},
		more() {
      console.log('more')
			this.isUploading = true
			this.$emit('more')
		}
	}
}
</script>

<style lang='scss'>
@import '@/assets/scss/components/ei-ticket-table.scss';
</style>