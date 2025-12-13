<template>
  <div ref="chart" style="width:100%; height:420px; background:#fff; padding:12px; border-radius:6px;"></div>
</template>

<script>
// import echarts from 'echarts'
function buildEchartsOption({ type = 'line', dimensions = [], metrics = [], data = [] }) {
  const xField = dimensions[0] ? dimensions[0].field : ''
  const categories = data.map(r => r[xField])

  const series = metrics.map(m => {
    return {
      name: m.label,
      type: (type === 'table' ? 'line' : type),
      data: data.map(r => r[m.field] != null ? r[m.field] : 0)
    }
  })

  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: metrics.map(m => m.label) },
    xAxis: { type: 'category', data: categories },
    yAxis: { type: 'value' },
    series
  }

  if (type === 'pie') {
    // simple pie: use first metric and aggregate by categories
    const pieSeries = metrics[0] ? {
      name: metrics[0].label,
      type: 'pie',
      radius: '40%',
      data: data.map(r => ({ name: r[xField], value: r[metrics[0].field] }))
    } : []
    return { tooltip: { trigger: 'item' }, legend: { data: categories }, series: [pieSeries] }
  }

  return option
}

export default {
  name: 'ChartPreview',
  props: {
    chartType: {
      type: String, default: 'line'
    },
    dimensions: {
      type: Array,
      default: () => []
    },
    metrics: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.renderChart()
  },
  watch: {chartType: 'renderChart', dimensions: 'renderChart', metrics: 'renderChart', chartData: 'renderChart'},
  methods: {
    renderChart() {
      const option = buildEchartsOption({type: this.chartType, dimensions: this.dimensions, metrics: this.metrics, data: this.chartData})
      this.chart.setOption(option, true)
    }
  }
}
</script>

<style scoped>
</style>
