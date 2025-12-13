<template>
  <div class="report-builder">
    <!-- 左侧：维度 / 指标 -->
    <div class="left-panel">
      <h3>数据集</h3>
      <el-input v-model="searchText" placeholder="搜索维度/指标" clearable>
        <i slot="suffix" @click="search" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="section">
        <h4>维度</h4>
        <draggable v-model="dimensionList" :group="{ name: 'dimension', pull: true, put: false }" @end="update" :sort="false" class="list">
          <div v-for="item in dimensionList" :key="item.id" class="item">
            {{ item.label }}
          </div>
        </draggable>
      </div>

      <div class="section">
        <h4>指标</h4>
        <draggable v-model="metricList" :group="{ name: 'metric', pull: true, put: false }" class="list">
          <div v-for="item in metricList" :key="item.id" class="item">
            {{ item.label }}
          </div>
        </draggable>
      </div>
    </div>

    <!-- 中间：图表类型 + 配置区 -->
    <div class="center-panel">
      <div class="chart-types">
        <div v-for="t in chartTypes" :key="t.type" class="chart-type-item" :class="{active: chartConfig.type === t.type}" @click="chartConfig.type = t.type">
          {{ t.label }}
        </div>
      </div>

      <div class="config-area">
        <h4>维度配置区</h4>
        <draggable v-model="selectedDimensions" :group="{ name: 'dimension', pull: false }" @remove="onRemoveDimension" class="drop-area">
          <div v-for="item in selectedDimensions" :key="item.id" class="drop-item">
            {{ item.label }}
            <span class="del" @click="deleteDimension(item)">×</span>
          </div>
        </draggable>

        <h4>指标配置区</h4>
        <draggable v-model="selectedMetrics" :group="{ name: 'metric', pull: false }" @remove="onRemoveMetric" class="drop-area">
          <div v-for="item in selectedMetrics" :key="item.id" class="drop-item">
            {{ item.label }}
            <span class="del" @click="deleteMetric(item)">×</span>
          </div>
        </draggable>
      </div>
    </div>

    <!--    <div class="right-panel">-->
    <!--      <div class="panel-title">图表预览</div>-->
    <!--      <div class="chart-preview" ref="chartRef"></div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {draggable},
  data() {
    return {
      searchText: '',
      dimensionList: [
        {id: 1, label: "日期"},
        {id: 2, label: "城市"},
        {id: 3, label: "渠道"}
      ],
      metricList: [
        {id: 101, label: "销售额"},
        {id: 102, label: "订单量"},
        {id: 103, label: "访客数"}
      ],
      /* 配置区 */
      selectedDimensions: [],
      selectedMetrics: [],
      /* 图表类型 */
      chartTypes: [
        {type: 'line', label: '折线图'},
        {type: 'bar', label: '柱状图'},
        {type: 'pie', label: '饼图'},
        {type: 'table', label: '表格'},
      ],
      chartConfig: {type: 'line'},
    };
  },
  computed: {
    filteredDimensions() {
      // return this.dimensionList.filter(d => d.label.includes(this.searchText))
    },
    filteredMetrics() {
      // return this.metricList.filter(m => m.label.includes(this.searchText))
    }
  },
  watch: {
    chartConfig: {
      deep: true,
      handler() {
        this.renderChart();
      }
    },
  },
  mounted() {
    // this.chart = echarts.init(this.$refs.chartRef);
    // this.renderChart();
  },
  methods: {
    search() {
      console.log(this.dimensionList)
      console.log(this.metricList)
    },
    update(val) {
      console.log(val)
    },
    // 删除维度
    deleteDimension(item) {
      this.selectedDimensions = this.selectedDimensions.filter(i => i.id !== item.id);
      this.dimensionList.push(item);
    },
    // 删除指标
    deleteMetric(item) {
      this.selectedMetrics = this.selectedMetrics.filter(i => i.id !== item.id);
      this.metricList.push(item);
    },
    // 拖出维度配置区（删除 → 回到左侧）
    onRemoveDimension(evt) {
      const item = evt.item.__vue__.item;
      this.dimensionList.push(item);
    },
    // 拖出指标配置（删除 → 回到左侧）
    onRemoveMetric(evt) {
      const item = evt.item.__vue__.item;
      this.metricList.push(item);
    },
    getConfig() {
      const {selectedDimensions, selectedMetrics, chartConfig} = this;
      return {
        selectedDimensions,
        selectedMetrics,
        chartConfig,
      }
    },
    renderChart() {
      if (!this.chart) return;

      // 简单 mock 图
      const labels = ['aaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbb', 'ccccccccccccc', 'dddddddddddddddd', 'eeeeeeeeeeeeee'];
      const values = labels.map(() => Math.floor(Math.random() * 300));

      const option = {
        tooltip: {},
        xAxis: {
          type: 'category', data: labels,
          axisLabel: {
            interval: 0,
            rotate: 40
          },
        },
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

<style lang="scss" scoped>
.report-builder {
  display: flex;
  height: 100%;
  font-family: Arial;

  .left-panel, .center-panel, .right-panel {
    padding: 16px;
    box-sizing: border-box;
  }

  .left-panel {
    width: 260px;
    border-right: 1px solid #ddd;

    .list {
      border: 1px solid #eee;
      background: #fafafa;
      padding: 8px;
      min-height: 50px;

      .item {
        padding: 6px 10px;
        background: #fff;
        border: 1px solid #ddd;
        margin-bottom: 6px;
        cursor: move;
        border-radius: 4px;
      }
    }
  }

  .center-panel {
    width: 380px;
    border-right: 1px solid #ddd;

    .chart-types {
      display: flex;
      margin-bottom: 16px;

      .chart-type-item {
        padding: 6px 12px;
        background: #f5f5f5;
        margin-right: 8px;
        cursor: pointer;
        border-radius: 4px;

        &.active {
          background: #409eff;
          color: #fff;
        }
      }
    }

    .drop-area {
      border: 1px dashed #bbb;
      padding: 10px;
      margin-bottom: 20px;
      min-height: 40px;

      .drop-item {
        padding: 6px 10px;
        background: #e9f5ff;
        border: 1px solid #bcdcff;
        margin-bottom: 6px;
        border-radius: 4px;
        position: relative;

        .del {
          position: absolute;
          right: 6px;
          top: 4px;
          cursor: pointer;
        }
      }
    }
  }

  .right-panel {
    flex: 1;

    .chart-preview {
      width: 100%;
      height: 300px;
      background: #fafafa;
      border: 1px dashed #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .right-panel {
    width: 420px;
    border-left: 1px solid #eee;
    padding: 10px;
  }

  .chart-preview {
    height: 300px;
    background: #fff;
  }
}
</style>
