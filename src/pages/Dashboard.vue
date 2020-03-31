<template>
	<div class="dashboard">
		<div class="dashboard-header main-container-page-header">
			<span class="main-container-subtitle">Hello, Nikola Tesla</span>
			<h2 class="main-container-title">Dashboard</h2>
			<span class="main-container-page-description">Short information about you</span>
		</div>
		<div class="dashboard-top">
			<ei-form class="dashboard-top-chart">
				<div slot="header">
					Spent money
				</div>
				<div slot="body" class="chart-container">
					<line-chart ref="chart" :chartData="chartData" :options="chartConfig.options" :style="{ height: `${chartHeight}px` }"></line-chart>
				</div>
			</ei-form>
			<div class="dashboard-top-info">
				<ei-form class="api-info" ref="api-info">
					<div slot="header">Api information</div>
					<div slot="body" class="api-info-container">
						<div class="preview">
							<span class="icon">
								<awesome-icon icon="key"></awesome-icon>
							</span>
							<span class="text">Api credentials</span>
						</div>
						<div class="credentials">
							<div class="login">
								<span>Login:</span>
								<ei-copyfield text="nikolatesla@gmail.com"></ei-copyfield>
							</div>
							<div class="password">
								<span>Password:</span>
								<ei-copyfield text="2f766bb7f2dc84487e119" protected></ei-copyfield>
							</div>
						</div>
					</div>
				</ei-form>
				<ei-form class="promo" ref="promo">
					<div slot="header">Promo</div>
					<div slot="body" class="promo-container">
						<div class="preview">
							<span class="icon">
								<awesome-icon icon="info"></awesome-icon>
							</span>
							<span class="text">Pay attension</span>
						</div>
						<div class="info">
							<span>здесть какая та супер мега акция на которую хочет каждый успеьт!!!!</span>
						</div>
					</div>
					<div slot="footer" class="promo-footer">
						<ei-button class="margin" type="with-icon" icon="plus" size="st" flat>Add points</ei-button>
						<ei-button type="with-icon" icon="angle-double-up" size="st" standart>Upgrade</ei-button>
					</div>
				</ei-form>
			</div>
		</div>
		<div class="dashboard-bottom">
			<ei-form>
				<div slot="body">
					<ei-table
						:headers="[
							{
								label: 'Id',
								field: 'id'
							},
							{
								label: 'Operation',
								field: 'operation',
							},
							{
								label: 'Cost',
								field: 'cost',
							},
							{
								label: 'Date',
								field: 'date',
							},
							{
								label: 'Task result',
								field: 'taskResult',
							}
						]"
						:rows="test_tableRows"
					/>
				</div>
			</ei-form>
		</div>
	</div>
</template>

<script>
import LineChart from '../components/LineChart'
import EiCopyfield from '../components/Ei-copyfield'
import chartConfig from '../config/chartConfigs/_dashboardCharts'
import EiTable from '../components/Ei-table'

export default {
	components: {
		LineChart,
		EiCopyfield,
		EiTable
	},
	data: () => ({
		chartConfig: chartConfig,
		chartHeight: 0,
		test_tableRows: []
	}),
	computed: {
		chartData() {
			return this.prepareChartValues()
		}
	},
	methods: {
		resizeWindow() {
			this.$nextTick(() => {
				let padding = 24 + 41.6
				this.chartHeight = this.$refs['api-info'].$el.clientHeight + this.$refs['promo'].$el.clientHeight - padding
			})
		},
		prepareChartValues() {
			return {
				labels: this.getDatesRange("MMM, D"),
				datasets: [
					{
						data: [0, 30, 30, 30, 40, 50, 60, 100, 150, 150, 150, 150, 150, 200, 200, 200, 400, 400, 450],
						borderColor: '#6576ff',
						fill: false
					}
				]
			}
		},
		getDatesRange(format) {
			let range = Array.from({ length: this.$moment().daysInMonth() }, (x, i) =>
				this.$moment()
					.startOf('month')
					.add(i, 'days')
			)
			if (format) range = range.map(el => el.format(format))

			return range
		}
	},
	mounted() {
		let array = []
		for (let i = 0; i < 100; i++) {
			array.push({
				id: 1,
				operation: 'operation',
				cost: 250,
				date: '2020-03-30',
				taskResult: 'complete'
			})
		}
		this.test_tableRows = Array.from(array)
	},
	created() {
		window.addEventListener('resize', this.resizeWindow)
		this.resizeWindow()
	},
	destroyed() {
		window.removeEventListener('resize', this.resizeWindow)
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/dashboard.scss';
</style>