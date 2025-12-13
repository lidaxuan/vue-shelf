<template>
  <div class="chart-types">
    <el-button v-for="t in types" :key="t.value" :type="value === t.value ? 'primary' : 'default'" @click="$emit('input', t.value)">{{ t.label }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'ChartTypeSelector',
  props: {value: {type: String, default: 'line'}},
  data() {
    return {
      types: [
        {label: '折线图', value: 'line'},
        {label: '柱状图', value: 'bar'},
        {label: '饼图', value: 'pie'},
        {label: '表格', value: 'table'}
      ]
    }
  }
}
</script>

<style scoped>
.chart-types {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>
