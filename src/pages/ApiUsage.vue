<template>
    <div class="apiusage">
        <div class="apiusage-header main-container-page-header">
			<span class="main-container-subtitle">Statistic</span>
			<h2 class="main-container-title">Api usage</h2>
			<span class="main-container-page-description">Information about our api and statistic of your use</span>
		</div>
        <div class="apiusage-top">
            <ei-form class="apiusage-top-chart">
                <div slot="header">
                    Chart
                </div>
                <div slot="body">
                    <div class="chart-filter-btns">
                        <ei-group-buttons v-model="activeFilter">
                            <ei-group-item>Day</ei-group-item>
                            <ei-group-item>Week</ei-group-item>
                            <ei-group-item>Month</ei-group-item>
                        </ei-group-buttons>
                    </div>
                    <line-chart ref="chart" class="chart" :chartData="userChartData" :options="chartConfig.userChart.options" :style="{ height: `${chartHeight}px` }" />
                </div>
            </ei-form>
            <div class="apiusage-top-stat">
                <div ref="stat-body" class="stat-body">
                    <div v-for="(item, index) in statBlocks" :key="index" class="stat-body-block" :style="{ height: `${statBlocksSize}px`, width: `${statBlocksSize}px` }">
                        <div class="header">
                            <div class="text">
                                <span>{{ item.text }}</span>
                                <span class="count">{{ item.value }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="apiusage-bottom">
            <ei-form>
                <div slot="body">
                    <ei-table
                        filter
                        :headers="[
							{
								label: 'Id',
								field: 'id'
							},
							{
								label: 'Operation',
								field: 'operation',
                                sort: 'string'
							},
							{
								label: 'Cost',
								field: 'cost',
                                sort: 'number'
							},
							{
								label: 'Date',
								field: 'date',
                                sort: 'date'
							},
							{
								label: 'Task result',
								field: 'taskResult',
                                sort: 'string'
							}
						]"
                        :rows="test_TableRows"
                    />
                </div>
            </ei-form>
        </div>
    </div>
</template>

<script>
import LineChart from '../components/LineChart'
import apiusageCharts from '../config/chartConfigs/_apiusageCharts'
import EiGroupItem from '../components/EiGroupButtons/Ei-group-item'
import EiGroupButtons from '../components/EiGroupButtons/Ei-group-buttons.vue'
import EiTable from '../components/EiTable/Ei-table'

export default {
    components: {
        LineChart,
        EiGroupItem,
        EiGroupButtons,
        EiTable
    },
    data: () => ({
        chartConfig: apiusageCharts,
        activeFilter: 0,
        chartHeight: 0,
        statBlocksSize: 190,
        test_TableRows: [],
        statBlocks: [
            {
                text: 'Api request last day',
                value: '20'   
            },
            {
                text: 'Spent points last day',
                value: '1200'   
            },
            {
                text: 'Api request last month',
                value: '400000'   
            },
            {
                text: 'Spent points last month',
                value: '40000'   
            },
        ]
    }),
    computed: {
        userChartData() {
            return this.prepareUserChartData()
        }
    },
    methods: {
        prepareUserChartData() {
            if (this.activeFilter == 0) 
                return {
                    labels: this.dayHoursRange(),
                    datasets: [
                        {
                            data:  this.randomDataset(24, 10, 30),
                            borderColor: '#6576ff',
                            fill: false,
                            yAxisID: 'y',
                        },
                        {
                            data: this.randomDataset(24, 0, 10),
                            borderColor: '#8094ae',
                            fill: false,
                            yAxisID: 'y1'
                        }
                    ]
                }
            else if (this.activeFilter == 1) 
                return {
                    labels: this.weekRange(),
                    datasets: [
                        {
                            data:  this.randomDataset(7, 10, 30),
                            borderColor: '#6576ff',
                            fill: false,
                            yAxisID: 'y',
                        },
                        {
                            data: this.randomDataset(7, 0, 10),
                            borderColor: '#8094ae',
                            fill: false,
                            yAxisID: 'y1'
                        }
                    ]
                }
            
            return {
                    labels: this.monthRange(),
                    datasets: [
                        {
                            data:  this.randomDataset(this.moment().daysInMonth(), 10, 30),
                            borderColor: '#6576ff',
                            fill: false,
                            yAxisID: 'y',
                        },
                        {
                            data: this.randomDataset(this.moment().daysInMonth(), 0, 10),
                            borderColor: '#8094ae',
                            fill: false,
                            yAxisID: 'y1'
                        }
                    ]
                }
        },
        dayHoursRange() {
            return Array.from({ length: 24 }, (x, i) =>
				this.moment()
                    .startOf('hour')
                    .hour(i)
                    .format('HH:mm')
			)
        },
        weekRange() {
            return Array.from({ length: 7 }, (x, i) =>
				this.moment()
                    .startOf('week')
                    .isoWeekday(i + 1)
                    .format('ddd')
			)
        },
        monthRange() {
            return Array.from({ length: this.moment().daysInMonth() }, (x, i) =>
				this.moment()
					.startOf('month')
                    .add(i, 'days')
                    .format('MMM, D')
			)
        },
        randomDataset(range, min, max) {
            return Array.from([].fill.call({length: range}, 0)).reduce((prev, curr) => {
                curr = Math.floor(Math.random() * (max - min)) + max
                if (prev.length > 0) curr += prev[prev.length-1]
                prev.push(curr)
                return prev
            }, [])
        },
        resizeWindow() {
			this.$nextTick(() => {
                const groupButtons = 51.1
                const header = 24 + 41.6
                const padding = header + groupButtons
                this.statBlocksSize = this.$refs['stat-body'].clientWidth/2 - 32
                this.chartHeight = this.$refs['stat-body'].clientHeight - padding
			})
        },
        randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        },
        test_FilTableRows() {
            let array = []
            for (let i = 0; i < 100; i++) {
                array.push({
                    id: 1,
                    operation: 'operation',
                    cost: Math.floor(Math.random() * (100 - 20)) + 100,
                    date: this.moment(this.randomDate(new Date(2018, 0, 1), new Date())).format("YYYY-MM-DD"),
                    taskResult: 'complete'
                })
            }
            array.push({
                    id: 1,
                    operation: 'Aperation',
                    cost: Math.floor(Math.random() * (100 - 20)) + 100,
                    date: '2021-03-30',
                    taskResult: 'complete'
                })
            return array
        }
    },
    mounted() {
        this.statBlocksSize = this.$refs['stat-body'].clientWidth/2 - 32
        this.resizeWindow()
        this.test_TableRows = this.test_FilTableRows()
    },
    created() {
        window.addEventListener('resize', this.resizeWindow)
    },
    destroyed() {
        window.removeEventListener('resize', this.resizeWindow)
    }
}
</script>

<style lang='scss'>
@import '@/assets/scss/pages/apiusage.scss';
</style>