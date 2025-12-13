<template>
  <div class="report-builder">
    <!-- Top bar -->
    <div class="topbar">
      <el-input v-model="reportName" placeholder="新创建的报表" style="width:300px"/>
      <div class="top-actions">
        <el-button @click="exportReport">导出</el-button>
        <el-button @click="goBack">返回</el-button>
        <el-button type="primary" @click="saveReport">保存</el-button>
      </div>
    </div>

    <div class="layout">
      <left-dataset-panel ref="leftDatasetPanel" :style="`width: ${isCollapse ? '650px' : '0px'};overflow:hidden;transition: all 0.3s;`" @updateDataset="onDatasetUpdate"/>
      <TopFilterActions>
        <template #left>
          <el-button icon="el-icon-s-fold" @click="isCollapse = !isCollapse"></el-button>
        </template>
        <template #right>
          <el-button @click="search">查询</el-button>
        </template>
      </TopFilterActions>
    </div>
  </div>
</template>

<script>
import LeftDatasetPanel from './components/LeftDatasetPanel.vue'
import ChartTypeSelector from './components/ChartTypeSelector.vue'
import ChartPreview from './components/ChartPreview.vue'
import ComparePanel from './components/ComparePanel.vue'
import TopFilterActions from './components/TopFilterActions.vue'
import {mockDataset, mockChartData} from './mock/data'

export default {
  name: 'ReportBuilderPage',
  components: {LeftDatasetPanel, ChartTypeSelector, TopFilterActions, ChartPreview, ComparePanel},
  data() {
    return {
      isCollapse: true,
      reportName: '新创建的报表',
      dataset: mockDataset,
      chartType: 'line',
      dimensions: [],
      metrics: [],
      filters: {},
      chartData: [],
      compareMode: '',
      compareData: [],
    }
  },
  created() {
    console.clear()
    this.chartData = mockChartData
  },
  methods: {
    onDatasetUpdate(d) {
      console.log(1111, d)
      this.dataset = d
    },
    onFilterChanged(f) {
      this.filters = f;
      this.reloadData()
    },
    reloadData() {
      // placeholder for data fetch using dimensions/metrics/filters
      this.chartData = mockChartData
    },
    saveReport() {
      this.$message.success('保存成功（示例）')
    },
    exportReport() {
      this.$message.info('导出（示例）')
    },
    goBack() {
      window.history.back()
    },
    search() {
      const config = this.$refs.leftDatasetPanel.getConfig();
      console.log(config);
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.top-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.layout {
  display: flex;
  height: calc(100vh - 60px);
  background: #f5f7fa;
}

.center {
  width: 420px;
  padding: 16px;
  border-right: 1px solid #eee;
}

.right {
  flex: 1;
  padding: 16px;
  overflow: auto;
}
</style>
