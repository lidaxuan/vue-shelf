<!--
 * @Description:
 * @Author: lidaxuan
 * @Date: 2025-12-11 10:46:44
 * @FilePath: src/views/ReportBuilder/components/TopFilterActions.vue
 * @LastEditors: lijixuan
 * @LastEditTime: 2025-12-11 10:46:44
-->
<template>
  <div class="top-filter-actions">
    <slot name="left"></slot>
    <div class="filter-panel">
      <el-date-picker v-model="range" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" @change="emit" style="width:100%"/>
      <el-select v-model="channel" placeholder="渠道" style="width:100%;" @change="emit">
        <el-option label="360搜索" value="360"/>
        <el-option label="搜狗" value="sogou"/>
      </el-select>
    </div>

    <slot name="right"></slot>

    <el-dialog :visible.sync="dialogVisible" title="配置筛选项" width="30%" append-to-body custom-class="filter-config-dialog">
      <div>选择要显示的筛选项(未选中的不参与筛选)</div>
      <el-checkbox-group v-model="checkedConfig">
        <el-checkbox v-for="(item, key) in fieldConfig" :label="item.key" :key="key" style="display: flex">{{ item.label }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setFilterConfig">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const fieldConfig = [
  {key: "dialogStartTime", label: '对话开始时间', isDate: true},
  {key: "leadCreateTime", label: '线索创建时间', isDate: true},
  {key: "channel", label: '渠道'},
  {key: "platformAccount", label: '平台授权账号'},
  {key: "accessGroup", label: '接入分组'},
  {key: "serviceStaff", label: '对话接待客服'},
  {key: "cardCreator", label: '名片创建者'},
  {key: "cardOwner", label: '名片所属者'},
  {key: "dialogCount", label: '对话数', agg: 'sum'},
  {key: "validDialogCount", label: '有效对话数', agg: 'sum'},
  {key: "cardCount", label: '名片数', agg: 'sum'},
  {key: "validCardCount", label: '有效名片数', agg: 'sum'},
  {key: "contactRate", label: '留联率', agg: 'avg', isPercent: true},
  {key: "validContactRate", label: '有效留联率', agg: 'avg', isPercent: true}
];
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: !true,
      searchMap: {},
      checkedConfig: [],
      filterList: [],
      range: [],
      channel: ''
    };
  },
  computed: {
    fieldConfig: () => fieldConfig
  },
  watch: {},
  created() {

  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    emit() {
      this.$emit('filterChanged', {range: this.range, channel: this.channel})
    },
    setFilterConfig() {
      this.filterList = fieldConfig.filter(item => this.checkedConfig.includes(item.key))
    }
  }
};
</script>

<style lang='scss'>
.filter-config-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #ccc;
  }

  .el-dialog__footer {
    border-top: 1px solid #ccc;
  }
}
</style>

<style lang='scss' scoped>
.top-filter-actions {
  display: flex;
  align-items: baseline;
  background: #fff;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  .filter-panel {
    display: flex;
  }
}
</style>
