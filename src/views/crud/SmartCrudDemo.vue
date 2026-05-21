<template>
  <div class="demo-container">
    <h2>SmartCrud 组件示例</h2>
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="自动生成抽屉" name="drawer">
        <div style="margin-bottom:10px;">
          <el-button type="warning" @click="demoClearSelection">清空表格选中</el-button>
          <el-button type="primary" @click="demoOpenAdd">新增用户</el-button>
        </div>
        <smart-crud ref="crudRef" url="/api/user/page" :columns="simpleColumns" :show-selection="true" :drawer-size="'50%'" @save-form="handleSaveForm" @open-add="handleOpenAdd" @open-edit="handleOpenEdit" @open-view="handleOpenView">
          <template #status="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
          <template #oper="{ row }">
            <el-button type="text" @click="openView(row)">查看</el-button>
            <el-button type="text" @click="openEdit(row)">编辑</el-button>
            <el-button type="text" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
          </template>
        </smart-crud>
      </el-tab-pane>

      <el-tab-pane label="自定义字段抽屉" name="customDrawer">
        <smart-crud ref="crudRef2" url="/api/user/page" :columns="simpleColumns" :drawer-size="'50%'" @save-form="handleSaveForm">
          <template #status="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
          <!-- 自定义详情里的状态字段 -->
          <template #view-status="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '正常使用' : '已禁用' }}
            </el-tag>
          </template>
          <!-- 自定义表单里的状态字段 -->
          <template #form-status="{ editForm, field }">
            <el-radio-group v-model="editForm[field.prop]">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </template>
          <template #oper="{ row }">
            <el-button type="text" @click="openView2(row)">查看</el-button>
            <el-button type="text" @click="openEdit2(row)">编辑</el-button>
          </template>
        </smart-crud>
        <div style="margin-top:15px;">
          <el-button type="primary" @click="openAdd2">新增</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="①简单配置 - 字典表已有字段，直接写prop" name="simple">
        <smart-crud url="/api/user/page" :columns="simpleColumns">
          <template #toolbar>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          </template>
          <template #status="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
          <template #oper="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
          </template>
        </smart-crud>
      </el-tab-pane>

      <el-tab-pane label="②完整配置 - 覆盖字典表所有属性" name="full">
        <smart-crud url="/api/user/page" :columns="fullColumns">
          <template #toolbar>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          </template>
          <template #status="{ row }">
            <el-switch :value="row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(row)"/>
          </template>
          <template #avatar="{ row }">
            <el-avatar :src="row.avatar" :size="40"/>
          </template>
          <template #oper="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleView(row)">详情</el-button>
            <el-button type="text" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
          </template>
        </smart-crud>
      </el-tab-pane>

      <el-tab-pane label="③混合配置 - 部分覆盖字典表" name="mix">
        <smart-crud url="/api/order/page" :columns="mixColumns">
          <template #toolbar>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建订单</el-button>
          </template>
          <template #orderStatus="{ row }">
            <el-tag :type="getOrderStatusType(row.orderStatus)">{{ getOrderStatusText(row.orderStatus) }}</el-tag>
          </template>
          <template #amount="{ row }"><span style="color:#f56c6c;font-weight:bold;">¥{{ row.amount }}</span></template>
          <template #oper="{ row }">
            <el-button type="text" @click="handleView(row)">查看</el-button>
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          </template>
        </smart-crud>
      </el-tab-pane>

      <el-tab-pane label="④时间范围搜索" name="dateRange">
        <smart-crud url="/api/log/page" :columns="logColumns">
          <template #toolbar>
            <el-button type="success" icon="el-icon-download" @click="handleExport">导出</el-button>
          </template>
          <template #oper="{ row }">
            <el-button type="text" @click="handleView(row)">详情</el-button>
          </template>
        </smart-crud>
      </el-tab-pane>

      <el-tab-pane label="⑤数字/金额对齐" name="amount">
        <smart-crud url="/api/product/page" :columns="productColumns">
          <template #price="{ row }"><span style="color:#e6a23c;font-weight:bold;">¥{{ row.price }}</span></template>
          <template #stock="{ row }">
            <el-tag :type="row.stock > 10 ? 'success' : row.stock > 0 ? 'warning' : 'danger'">{{ row.stock }}</el-tag>
          </template>
          <template #oper="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
          </template>
        </smart-crud>
      </el-tab-pane>

      <el-tab-pane label="⑥不分页列表" name="noPage">
        <smart-crud url="/api/channel/list" :columns="channelColumns" :show-toolbar="false">
          <template #status="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
          <template #url="{ row }">
            <el-link type="primary" :href="row.url" target="_blank">{{ row.url }}</el-link>
          </template>
          <template #oper="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
          </template>
        </smart-crud>
      </el-tab-pane>

      <el-tab-pane label="⑦多选表格" name="selection">
        <smart-crud url="/api/user/page" :columns="simpleColumns" :show-selection="true" :show-toolbar="false">
          <template #status="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
          <template #oper="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
          </template>
        </smart-crud>
        <div style="margin-top:15px;">
          <el-button type="primary" @click="handleBatchEdit">批量编辑</el-button>
          <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="⑧自定义操作列" name="customOper">
        <smart-crud url="/api/user/page" :columns="simpleColumns">
          <template #toolbar>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增用户</el-button>
            <el-button type="success" icon="el-icon-upload2">导入</el-button>
            <el-button type="warning" icon="el-icon-download">导出</el-button>
          </template>
          <template #status="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
          </template>
          <template #oper="{ row }">
            <el-button type="text" size="small" icon="el-icon-view" @click="handleView(row)">查看</el-button>
            <el-button type="text" size="small" icon="el-icon-edit" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" size="small" icon="el-icon-copy-document" @click="handleCopy(row)">复制</el-button>
            <el-button type="text" size="small" icon="el-icon-delete" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
          </template>
        </smart-crud>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SmartCrud from './SmartCrud.vue'

export default {
  name: 'SmartCrudDemo',
  components: {SmartCrud},
  data() {
    return {
      activeTab: 'drawer',
      // ① 简单配置：直接写prop，自动从字典表匹配
      simpleColumns: [
        {prop: 'userName'},
        {prop: 'realName'},
        {prop: 'email'},
        {prop: 'phone'},
        {prop: 'status'},
        {prop: 'createTime'}
      ],
      // ② 完整配置：覆盖字典表所有属性
      fullColumns: [
        {prop: 'id', label: '用户ID', width: 100, sortable: true},
        {prop: 'avatar', label: '头像', width: 80},
        {prop: 'userName', label: '登录账号', width: 150},
        {prop: 'realName', label: '姓名', width: 120},
        {prop: 'email', label: '邮箱地址', width: 220},
        {prop: 'phone', label: '联系电话', width: 150},
        {prop: 'status', label: '账号状态', width: 120, align: 'center'},
        {prop: 'createTime', label: '注册时间', width: 180}
      ],
      // ③ 混合配置：部分覆盖字典表
      mixColumns: [
        {prop: 'orderNo', label: '订单编号'},
        {prop: 'userName', label: '买家账号'},
        {prop: 'amount', label: '订单金额(元)', width: 140, align: 'right'},
        {prop: 'orderStatus', label: '订单状态'},
        {prop: 'createTime', label: '下单时间'}
      ],
      // ④ 时间范围搜索
      logColumns: [
        {prop: 'id', label: '日志ID', width: 100},
        {prop: 'userName', label: '操作人'},
        {prop: 'action', label: '操作内容'},
        {prop: 'ip', label: 'IP地址', width: 150},
        {prop: 'createTime', label: '操作时间'}
      ],
      // ⑤ 金额对齐
      productColumns: [
        {prop: 'name', label: '商品名称'},
        {prop: 'category', label: '分类'},
        {prop: 'price', label: '售价', width: 100, align: 'right'},
        {prop: 'stock', label: '库存', width: 100, align: 'center'},
        {prop: 'salesCount', label: '销量', width: 100, align: 'center'},
        {prop: 'updateTime', label: '更新时间'}
      ],
      // ⑥ 不分页列表
      channelColumns: [
        {prop: 'channelName', label: '渠道名称'},
        {prop: 'category', label: '类型'},
        {prop: 'url', label: '渠道URL', minWidth: 300},
        {prop: 'status', label: '状态', width: 100, align: 'center'},
        {prop: 'createTime', label: '创建时间'}
      ]
    }
  },
  methods: {
    /* ========== 抽屉演示 ========== */
    getProp(col) { return typeof col === 'string' ? col : col.prop },
    getLabel(col) { return typeof col === 'string' ? col : col.label || col.prop },
    
    // 第一个 demo
    openView(row) { this.$refs.crudRef.openViewDrawer(row) },
    openEdit(row) { this.$refs.crudRef.openEditDrawer(row) },
    demoClearSelection() { this.$refs.crudRef.clearSelection() },
    demoOpenAdd() { this.$refs.crudRef.openAddDrawer() },
    handleOpenAdd() { console.log('打开新增抽屉') },
    handleOpenEdit(row) { console.log('打开编辑抽屉', row) },
    handleOpenView(row) { console.log('打开查看抽屉', row) },
    handleSaveForm(type, formData) { 
      console.log('保存表单', type, formData)
      // 这里模拟保存请求
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve() // 返回 false 可以阻止抽屉关闭
        }, 500)
      })
    },
    
    // 第二个 demo
    openView2(row) { this.$refs.crudRef2.openViewDrawer(row) },
    openEdit2(row) { this.$refs.crudRef2.openEditDrawer(row) },
    openAdd2() { this.$refs.crudRef2.openAddDrawer() },

    handleAdd() {
      this.$message.info('点击了新增')
    },
    handleEdit(row) {
      this.$message.info(`编辑: ${row.name || row.orderNo || row.userName || row.id}`)
    },
    handleDelete(row) {
      const name = row.name || row.orderNo || row.userName || row.id
      this.$confirm(`确认删除 "${name}" 吗？`, '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => this.$message.success('删除成功')).catch(() => {
      })
    },
    handleView(row) {
      this.$message.info(`查看详情: ${row.name || row.orderNo || row.userName || row.id}`)
    },
    handleCopy(row) {
      this.$message.info('复制功能')
    },
    handleExport() {
      this.$message.info('导出数据')
    },
    handleStatusChange(row) {
      this.$message.success(`状态已更新为: ${row.status === 1 ? '启用' : '禁用'}`)
    },
    handleBatchEdit() {
      this.$message.info('批量编辑')
    },
    handleBatchDelete() {
      this.$message.info('批量删除')
    },
    getOrderStatusType(status) {
      const map = {0: 'warning', 1: 'success', 2: 'primary', 3: 'info'};
      return map[status] || 'info'
    },
    getOrderStatusText(status) {
      const map = {0: '待支付', 1: '已支付', 2: '已发货', 3: '已完成'};
      return map[status] || '未知'
    }
  }
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

h2 {
  color: #303133;
  margin-bottom: 20px;
}
</style>
