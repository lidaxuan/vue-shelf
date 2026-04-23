<!--
 * @Description:
 * @Author: lidaxuan
 * @Date: 2026-04-14 14:59:32
 * @FilePath: src/views/formAccess/index.vue
 * @LastEditors: lijixuan
 * @LastEditTime: 2026-04-14 14:59:32
-->
<template>
  <div class="form-access">
    <div class="tip">
      <el-button class="back" @click="goBack"><i class="el-icon-arrow-left back"></i>查看线索</el-button>

    </div>
    <el-form :inline="true" :model="pageData" class="">
      <el-form-item label="手机号">
        <el-input v-model="pageData.aaa" placeholder="请输入" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="获取时间">
        <el-select v-model="pageData.bbb" placeholder="请选择" size="mini">
          <el-option v-for="(optionItem, index2) in channels" :label="optionItem.label" :value="optionItem.value" :key="index2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button >重置</el-button>
        <el-button @click="" type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="activeMain">
      <div style="height: calc(100% - 42px);" class="mb-10">
        <e-table-sp height="100%" :data="tableData" :tableColumnData="tableColumnData">
          <template #name="{ row }">

          </template>
          <template #chartType="{ row }">

          </template>
          <template #enabled="{ row }">
            <div>
              <el-switch v-model="row.enabled" @change="val => updateEnableFlag(val, row)" :active-value="1" :inactive-value="0"></el-switch>
              {{ row.enabled == 1 ? '已发布' : '草稿' }}
            </div>
          </template>

          <template #oper="{ $index, row }">
            <el-button type="text" @click="openDetail(row, true, false)">查看</el-button>
          </template>
        </e-table-sp>
      </div>
      <div class="" style="text-align: right">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="pageData.pageNum" :page-size="pageData.pageSize" :total="pageData.totalCount"
                       :page-sizes="[20, 50, 100]"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ETableSp from "@/components/table";
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {ETableSp},
  props: {},
  data() {
    return {
      channels: [],
      tableData: [{}],
      tableColumnData: [
        {type: "index", label: "序号", width: 80},
        {label: "线索ID", slotName: "name"},
        {label: "姓名", slotName: "chartType", width: 150},
        {label: "手机号", prop: "dimsLabel", "show-overflow-tooltip": false, width: 180},
        {label: "微信", prop: "metricsLabel", "show-overflow-tooltip": false},
        {label: "QQ", slotName: "enabled", width: 150},
        {label: "线索创建时间", prop: "updateUserId"},
        {label: "推送状态", prop: "updateTime", width: 180},
        {label: "推送次数", prop: "updateTime", width: 180},
        {label: "获取时间", prop: "updateTime", width: 180},
        {label: "操作",  align: "center", fixed: 'right', slotName: "oper"}
      ],
      pageData: {
        name: '',
        chartType: '',
        enabled: '',
        pageNum: 1,
        pageSize: 20,
        totalCount: 0
      },
    };
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // temStr(val) {
    // },
  },
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    goBack(){
      this.$router ? this.$router.back() : window.history.back();
    },
    // 状态切换
    async updateEnableFlag(val, row) {
      row.enabled = val == 1 ? 0 : 1
      const params = {
        id: row.id,
        enabled:  val
      };
      const res = await window.EWebPlat.platService(window.privateMessagerApiMap.clientWebcall.dataBoardCustomReportEnable, params)
      if (res.code) {
        this.$message.error(res.msg);
        return;
      }
      row.enabled = val
      this.$message.success('操作成功');
    },
    handleSizeChange(val) {
      this.pageData.pageSize = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.pageData.pageNum = val;
      this.getDataList();
    },
    search() {
      this.pageData.page = 1;
      this.getDataList();
    },
  }
};
</script>
<style lang='scss' scoped>
.form-access {
  height: 100%;
  border-radius: 8px;
  width: 100%;
}
</style>
