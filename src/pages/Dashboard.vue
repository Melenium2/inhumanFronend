<template>
	<div class="ei-dashboard">
		<div class="ei-dashboard-header main-container-page-header">
			<span class="main-container-subtitle">Hello, Nikola Tesla</span>
			<h2 class="main-container-title">Dashboard</h2>
			<span class="main-container-page-description">Short information about you</span>
		</div>
		<div class="ei-dashboard-top">
			<ei-form class="ei-dashboard-top-chart">
				<div slot="header">
					Spent money
				</div>
				<div slot="body" class="chart-container">
					<line-chart ref="chart" :chartData="chartData" :options="chartConfig.options" :style="{ height: `${chartHeight}px` }"></line-chart>
				</div>
			</ei-form>
			<div class="ei-dashboard-top-info">
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
								<ei-copyfield text="2f766bb7f2dc84487e119"></ei-copyfield>
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
		<div class="ei-dashboard-bottom">
			<div class="ei-dashboard-bottom-table">
				<h1>adsad</h1>
				<h1>adsad</h1>
				<h1>adsad</h1>
				<h1>adsad</h1>
				<h1>adsad</h1>
				<h1>adsad</h1>
				<h1>adsad</h1>
				<h1>adsad</h1>
				<h1>adsad</h1>
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from '../components/LineChart'
import EiCopyfield from '../components/Ei-copyfield'
import chartConfig from '../config/chartConfigs/_dashboardCharts'

export default {
	components: {
		LineChart,
		EiCopyfield
	},
	data: () => ({
		chartConfig: chartConfig,
		chartHeight: 0
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
		console.log(this.$refs.chart)
		console.log(this.getDatesRange("MMM, D"))
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