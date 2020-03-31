<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options', 'chartData'],
  mounted() {
    // this.$nextTick(() => {
      this.renderChart(this.chartData, this.options)
    // })
  }
}
</script>