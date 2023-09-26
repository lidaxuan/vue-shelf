<template>
  <e-container-list-n @query="query" @reset="reset" :tabs="tabs" :activeName="activeName">
    <!-- 查询表单 开始 -->
    <template #query-form="{ queryFormAttr }">
      <el-form v-bind="queryFormAttr" :model="queryForm" :rules="queryFormRules" label-width="100px">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="queryForm.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="单行文本" prop="field101">
          <el-input v-model="queryForm.field101" placeholder="请输入单行文本" clearable></el-input>
        </el-form-item>
        <el-form-item label="单选框组" prop="field104">
          <el-radio-group v-model="queryForm.field104" size="small">
            <el-radio-button v-for="(item, index) in field104Options" :key="index" :label="item.值键名"
                             :disabled="item.disabled" border>{{item.标签键名}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开关" prop="field101">
          <el-switch v-model="queryForm.field101"></el-switch>
        </el-form-item>
      </el-form>
    </template>
    <!-- 查询条件 结束 -->
    <!-- 列表操作 开始 -->
    <template #table-oper="{ buttonAttr }">
      <e-button-n v-bind="buttonAttr" @click="add">新增</e-button-n>
      <e-button-n v-bind="buttonAttr" @click="batchRem">批量删除</e-button-n>
    </template>
    <!-- 列表操作 结束 -->
    <!-- 查询列表 开始 -->
    <template #query-table="{ queryTableAttr }">
      <e-table-sp v-bind="queryTableAttr" v-loading="loading" :tableColumnData="tableColumnData"
                  :data="tableData" @selection-change="tableSelectionChange">
        <template #oper="{ row }">
          <e-button-n @click="edit(row)">修改</e-button-n>
          <e-button-n @click="remove(row)">删除</e-button-n>
        </template>
      </e-table-sp>
    </template>
    <!-- 查询列表 结束 -->
    <!-- 列表分页 开始 -->
    <template #table-page="{ tablePageAttr }">
      <el-pagination v-bind="tablePageAttr" @size-change="pageSizeChange" @current-change="pageNumberChange"
                     :current-page="pageNumber" :page-size="pageSize" :total="totalNumber" />
    </template>
    <!-- 列表分页 结束 -->
  </e-container-list-n>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'default',
      tabs: [{
        label: '默认查询',
        value: 'default'
      }, ],
      queryForm: {
        mobile: '',
        field101: undefined,
        field104: undefined,
        field101: false,
      },
      queryFormRules: {
        mobile: [{
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        field101: [],
        field104: [{
          required: true,
          message: '单选框组不能为空',
          trigger: 'change'
        }],
      },
      field104Options: [],
      loading: false, // 列表加载控制
      // 列表展示列
      tableColumnData: [{
        type: 'selection'
      }, {
        width: '80px',
        type: 'index',
        label: '序号'
      }, {
        minWidth: '100px',
        label: '手机号',
        prop: 'mobile',
      }, {
        minWidth: '100px',
        label: '单行文本',
        prop: 'field101',
      }, {
        minWidth: '100px',
        label: '单选框组',
        prop: 'field104',
      }, {
        minWidth: '100px',
        label: '开关',
        prop: 'field101',
      }, {
        width: '100px',
        label: '操作',
        fixed: 'right',
        slotName: 'oper',
        operColumn: true,
      }, ],
      tableData: [], // 列表数据
      pageNumber: 1, // 页码
      pageSize: 10, // 每页大小
      totalNumber: 0, // 列表总条数
      tableSelectionData: [], // 列表选中数据
    }
  },
  methods: {
    // 获得单选框组 选项数据
    async getField104Options() {
      let res;
      try {
        // TODO: 检查请求函数时候需要修改
        res = await this.$api.请求函数();
      }
      catch (error) {
        this.$message.error('请求异常');
        console.error(error);
        return;
      }
      if (!res || res.status !== 1) {
        this.$message.error(res && res.reason ? res.reason : '响应错误');
        return;
      }
      let newData = [];
      if (获取路径) {
        newData = res.data;
      }
      this.field104Options = newData;
    },
    // 查询工具
    async queryUtil() {
      let checkValid = await new Promise(resolve => this.$refs.queryForm.validate(valid => resolve(valid)));
      if (!checkValid) {
        return;
      }
      let queryForm = this.queryForm;
      let params = {
        ...queryForm,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      };
      let res;
      this.loading = true; // 打开 加载中
      try {
        res = await this.$api.query(params);
        this.loading = false; // 关闭 加载中（请求成功）
      }
      catch (error) {
        this.loading = false; // 关闭 加载中（请求异常）
        this.$message.error('请求异常');
        console.error(error);
        return;
      }
      if (!res || res.code !== 0) {
        this.$message.error(res && res.msg ? res.msg : '响应错误');
        return;
      }
      let tableData = [];
      let totalNumber = 0;
      let data = res.data
      if (data) {
        if (data.list) {
          tableData = data.list;
        }
        if (data.total) {
          totalNumber = data.total;
        }
      }
      this.tableData = tableData;
      this.totalNumber = totalNumber;
    },
    // 查询
    query() {
      this.pageNumberChange(1);
    },
    // 清空
    reset() {
      this.$refs.queryForm.resetFields();
      this.query();
    },
    // 页码切换
    pageNumberChange(val) {
      this.pageNumber = val;
      this.queryUtil();
    },
    // 展示数量切换
    pageSizeChange(val) {
      this.pageSize = val;
      this.queryUtil();
    },
    // 列表选中 事件
    tableSelectionChange(selection) {
      this.tableSelectionData = selection;
    },
    // 新增
    add() {
      // let params = { operationType: '0' };
      // this.$refs.Add.open(params);
    },
    // 批量删除
    batchRem() {
      let tableSelectionData = this.tableSelectionData;
      if (!tableSelectionData || tableSelectionData.length === 0) {
        this.$message.info('请先选择要操作的数据');
        return;
      }
      this.$confirm('确认批量删除 ' + tableSelectionData.length + ' 条数据吗？', '批量删除提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeUtil(tableSelectionData.map(item => item.id));
      }).catch(() => {
        this.$message.info('已取消');
      });
    },
    // 修改
    edit(row) {
      // let params = { operationType: '1', row };
      // this.$refs.Add.open(params);
    },
    // 删除
    remove(row) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeUtil([row.id]);
      }).catch(() => {
        this.$message.info('已取消');
      });
    },
    // 删除工具
    removeUtil(ids) {
      this.$message.success('操作成功');
    },
  }
}

</script>
<style>
</style>
