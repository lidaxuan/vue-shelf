<template>
  <div class="report-builder">

    <!-- 图表类型选择 -->
    <!--    <div class="chart-type-panel">
          <div v-for="t in chartTypes" :key="t.type" class="chart-type-item" :class="{active: chartConfig.type === t.type}" @click="chartConfig.type = t.type">
            {{ t.label }}
          </div>
        </div>-->

    <div class="main-panel">
      <!-- =================== 左侧：维度指标 =================== -->
      <div class="left-panel">

        <div class="panel-title">维度</div>
        <draggable class="field-list" :list="dimensionList" :group="{ name: 'dimension', pull: 'clone', put: false }" :clone="cloneField" sort="false">
          <div v-for="item in dimensionList" :key="item.key" class="field-item">
            {{ item.label }}
          </div>
        </draggable>

        <div class="panel-title">指标</div>
        <draggable class="field-list" :list="metricList" :group="{ name: 'metric', pull: 'clone', put: false }" :clone="cloneField" sort="false">
          <div v-for="item in metricList" :key="item.key" class="field-item">
            {{ item.label }}
          </div>
        </draggable>

      </div>

      <!-- =================== 中间：拖拽配置区 =================== -->
      <div class="center-panel">

        <div class="panel-title">拖入维度字段</div>
        <draggable class="drop-zone" v-model="selectedDimensions" :group="{ name: 'dimension', pull: false, put: true }"
                   @add="handleAddDimension" @remove="handleRemoveDimension" @update="handleSortDimension"
        >
          <div v-for="item in selectedDimensions" :key="item.key" class="selected-item">
            {{ item.label }}
          </div>
        </draggable>

        <div class="panel-title">拖入指标字段</div>
        <draggable class="drop-zone" v-model="selectedMetrics" :group="{ name: 'metric', pull: false, put: true }"
                   @add="handleAddMetric" @remove="handleRemoveMetric" @update="handleSortMetric"
        >
          <div v-for="item in selectedMetrics" :key="item.key" class="selected-item">
            {{ item.label }}
          </div>
        </draggable>

      </div>

      <!-- =================== 右侧：图表预览 =================== -->
      <!--      <div class="right-panel">-->
      <!--        <div class="panel-title">图表预览</div>-->
      <!--        <div class="chart-preview" ref="chartRef"></div>-->
      <!--      </div>-->
    </div>

  </div>
</template>


<script>
import draggable from "vuedraggable";
// import echarts from "echarts";

export default {
  name: "ReportBuilder",
  components: {draggable},

  data() {
    return {
      /* 图表类型 */
      chartTypes: [
        {type: 'line', label: '折线图'},
        {type: 'bar', label: '柱状图'},
        {type: 'pie', label: '饼图'}
      ],

      chartConfig: {type: 'line'},

      /* 维度 + 指标 */
      dimensionList: [
        {key: 'month', label: '月份'},
        {key: 'group', label: '接入分组'},
        {key: 'creator', label: '创建者'}
      ],
      metricList: [
        {key: 'validChat', label: '有效对话数'},
        {key: 'cardCount', label: '名片数'},
        {key: 'chatTotal', label: '对话数'}
      ],

      selectedDimensions: [],
      selectedMetrics: []
    };
  },

  mounted() {
    this.chart = echarts.init(this.$refs.chartRef);
    this.renderChart();
  },

  watch: {
    chartConfig: {
      deep: true, handler() {
        this.renderChart();
      }
    },
    selectedDimensions() {
      this.renderChart();
    },
    selectedMetrics() {
      this.renderChart();
    }
  },

  methods: {
    cloneField(field) {
      return {...field};
    },

    // 维度
    handleAddDimension(evt) {
    },
    handleRemoveDimension(evt) {
    },
    handleSortDimension() {
    },

    // 指标
    handleAddMetric(evt) {
    },
    handleRemoveMetric(evt) {
    },
    handleSortMetric() {
    },

    renderChart() {
      if (!this.chart) return;

      // 简单 mock 图
      const labels = ['A', 'B', 'C', 'D', 'E'];
      const values = labels.map(() => Math.floor(Math.random() * 300));

      const option = {
        tooltip: {},
        xAxis: {type: 'category', data: labels},
        yAxis: {type: 'value'},
        series: [
          {
            type: this.chartConfig.type,
            data: values,
            smooth: true
          }
        ]
      };

      this.chart.setOption(option);
    }
  }
};
</script>


<style scoped>
.report-builder {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 顶部图表类型 */
.chart-type-panel {
  display: flex;
  padding: 10px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
}

.chart-type-item {
  padding: 6px 12px;
  margin-right: 10px;
  background: #f2f2f2;
  cursor: pointer;
  border-radius: 4px;
}

.chart-type-item.active {
  background: #409eff;
  color: #fff;
}

/* 主面板 */
.main-panel {
  display: flex;
  flex: 1;
}

/* 左侧 */
.left-panel {
  width: 240px;
  padding: 10px;
  border-right: 1px solid #eee;
}

.panel-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.field-list {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
}

.field-item {
  padding: 6px 8px;
  background: #f8f8f8;
  margin-bottom: 4px;
  border-radius: 4px;
}

/* 中间 */
.center-panel {
  flex: 1;
  padding: 10px;
}

.drop-zone {
  border: 1px dashed #bbb;
  padding: 15px;
  min-height: 80px;
  margin-bottom: 20px;
}

.selected-item {
  padding: 6px 8px;
  background: #e9f4ff;
  margin-bottom: 6px;
  border-radius: 4px;
}

/* 右侧 */
.right-panel {
  width: 420px;
  border-left: 1px solid #eee;
  padding: 10px;
}

.chart-preview {
  height: 300px;
  background: #fff;
}
</style>
