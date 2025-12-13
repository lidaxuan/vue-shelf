<template>
  <div class="compare-panel">
    <h4>{{ mode === 'period' ? '环比' : '同比' }}</h4>
    <chart-preview :chart-type="chartType" :dimensions="dimensions" :metrics="metrics" :chartData="compareData"/>
  </div>
</template>

<script>
import ChartPreview from './ChartPreview.vue'

export default {
  name: 'ComparePanel',
  components: {ChartPreview},
  props: {
    mode: {
      type: String,
      default: 'period'
    },
    chartType: String,
    dimensions: Array,
    metrics: Array,
    compareData: Array
  }
}
</script>

<style scoped>
.compare-panel {
  margin-top: 16px;
}
</style>
