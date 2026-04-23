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
      <i class="el-icon-info"></i>
      表单接入配置: 易聊智能在线客服系统为满足多渠道平台表单线索与私信线索无法聚合问题，特上线了接入各渠道表单线索能力。将各平台按照授权、字段隐射配置即可将表单线索接入在易聊客服系统中。
    </div>
    <div class="flex ai-center jc-center">
      <el-form :inline="true" :model="pageData" class="">
        <el-form-item label="配置名称">
          <el-input v-model="pageData.aaa" placeholder="请输入" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="搜索引擎">
          <el-select v-model="pageData.bbb" placeholder="请选择" size="mini">
            <el-option v-for="(optionItem, index2) in channels" :label="optionItem.label" :value="optionItem.value" :key="index2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button >重置</el-button>
          <el-button @click="" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="creatRule" type="primary">新增</el-button>
    </div>

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
            <el-button type="text" @click="openDetail(row, false, false)">编辑</el-button>
            <el-button type="text" @click="deleteItem(row)" style="color: #FE2C55">删除</el-button>
            <el-button type="text" @click="viewLeads(row)">查看线索</el-button>
            <el-button type="text" @click="openDetail(row, false, true)">同步</el-button>
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

    <CreateRule ref="createRule"></CreateRule>
  </div>
</template>

<script>
import ETableSp from "@/components/table";
import CreateRule from "./Create.vue";
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    ETableSp,
    CreateRule,
  },
  props: {},
  data() {
    return {
      channels: [],
      tableData: [{}],
      tableColumnData: [
        {type: "index", label: "序号", width: 80},
        {label: "渠道名称", slotName: "name"},
        {label: "搜索引擎", slotName: "chartType", width: 150},
        {label: "接入方式", prop: "dimsLabel", "show-overflow-tooltip": false, width: 180},
        {label: "URL 地址", prop: "metricsLabel", "show-overflow-tooltip": false},
        {label: "最近编辑人", slotName: "enabled", width: 150},
        {label: "最近编辑时间", prop: "updateUserId"},
        {label: "启用状态", prop: "updateTime", width: 180},
        {label: "成功/失败 线索数", prop: "updateTime", width: 180},
        {label: "操作", width: 220, align: "center", fixed: 'right', slotName: "oper"}
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
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    creatRule(){
      this.$refs.createRule.open()
    },
    viewLeads(row) {
      this.$router.push({
        path: "/viewLeads",
        query: {id: row.id}
      });
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
