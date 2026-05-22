<template>
  <div class="config-demo-container">
    <h2>SmartCrud 字段配置演示</h2>
    <el-row :gutter="20">
      <!-- 左侧配置区 -->
      <el-col :span="6">
        <div class="config-panel">
          <div class="panel-title">字段配置</div>

          <!-- 基础配置 -->
          <el-form label-width="100px" style="margin-bottom: 20px;">
            <el-form-item label="分页">
              <el-switch v-model="isPaginated"/>
            </el-form-item>
            <el-form-item label="显示序号">
              <el-switch v-model="showIndex"/>
            </el-form-item>
            <el-form-item label="显示多选">
              <el-switch v-model="showSelection"/>
            </el-form-item>
            <el-form-item label="抽屉大小">
              <el-select v-model="drawerSize" style="width: 100%;">
                <el-option label="30%" value="30%"/>
                <el-option label="40%" value="40%"/>
                <el-option label="50%" value="50%"/>
                <el-option label="60%" value="60%"/>
              </el-select>
            </el-form-item>
          </el-form>

          <div class="divider">快捷操作</div>
          <el-button-group style="width: 100%;">
            <el-button size="small" @click="selectAll">全选</el-button>
            <el-button size="small" @click="deselectAll">全不选</el-button>
            <el-button size="small" @click="selectDefault">常用字段</el-button>
          </el-button-group>
          <div class="divider">选择要展示的字段（可拖拽排序）</div>

          <!-- 字段列表 -->
          <el-checkbox-group v-model="selectedFields">
            <el-checkbox v-for="field in availableFields" :key="field.prop" :label="field.prop" style="display: block; margin-bottom: 8px;">
              <span class="field-label">{{ field.label }}</span>
              <el-tag v-if="field.search" size="mini" type="primary" style="margin-left: 8px;">可搜索</el-tag>
            </el-checkbox>
          </el-checkbox-group>

        </div>
      </el-col>

      <!-- 右侧预览区 -->
      <el-col :span="18">
        <div class="preview-panel">
          <div class="panel-title">实时预览</div>

          <smart-crud
                  ref="crudRef"
                  :url="isPaginated ? '/api/user/page' : '/api/user/list'"
                  :columns="columns"
                  :show-index="showIndex"
                  :show-selection="showSelection"
                  :drawer-size="drawerSize"
                  @save-form="handleSave"
                  @add="handleOpenAdd"
                  @open-edit="handleOpenEdit"
                  @open-view="handleOpenView"
          >
            <!-- 自定义状态显示 -->
            <template #status="{ row }">
              <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">{{ row.status === 1 ? '启用' : '禁用' }}</el-tag>
            </template>

            <!-- 自定义操作列 -->
            <template #oper="{ row }">
              <el-button type="text" @click="openView(row)">查看</el-button>
              <el-button type="text" @click="openEdit(row)">编辑</el-button>
              <el-button type="text" style="color:#f56c6c" @click="handleDelete(row)">删除</el-button>
            </template>
          </smart-crud>

          <!-- 配置代码预览 -->
          <div class="divider">配置代码</div>
          <pre class="code-preview">{{ codePreview }}</pre>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SmartCrud from './SmartCrud.vue'
import fieldDict from './fieldDict.js'

export default {
  name: 'SmartCrudConfigDemo',
  components: {SmartCrud},
  data() {
    const availableFields = Object.keys(fieldDict).map(key => ({
      prop: key,
      ...fieldDict[key]
    }))

    const defaultFields = ['userName', 'realName', 'email', 'phone', 'status', 'createTime']

    return {
      availableFields,
      selectedFields: [...defaultFields],
      isPaginated: true,
      showIndex: true,
      showSelection: false,
      drawerSize: '50%'
    }
  },
  computed: {
    columns() {
      return this.selectedFields.map(prop => ({prop}))
    },
    codePreview() {
      const code = `<smart-crud
  url="${this.isPaginated ? '/api/user/page' : '/api/user/list'}"
  :show-index="${this.showIndex}"
  :show-selection="${this.showSelection}"
  :drawer-size="'${this.drawerSize}'"
  :columns="${JSON.stringify(this.columns, null, 2)}"
/>`
      return code
    }
  },
  methods: {
    selectAll() {
      this.selectedFields = this.availableFields.map(f => f.prop)
    },
    deselectAll() {
      this.selectedFields = []
    },
    selectDefault() {
      this.selectedFields = ['userName', 'realName', 'email', 'phone', 'status', 'createTime']
    },
    openView(row) {
      this.$refs.crudRef.openViewDrawer(row)
    },
    openEdit(row) {
      this.$refs.crudRef.openEditDrawer(row)
    },
    handleOpenAdd() {
      console.log('打开新增抽屉')
      this.$refs.crudRef.openEditDrawer({})
    },
    handleOpenEdit(row) {
      console.log('打开编辑抽屉', row)
    },
    handleOpenView(row) {
      console.log('打开查看抽屉', row)
    },
    handleDelete(row) {
      const name = row.userName || row.name || row.id
      this.$confirm(`确认删除 "${name}" 吗？`, '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => this.$message.success('删除成功')).catch(() => {
      })
    },
    handleSave(type, formData) {
      console.log('保存表单', type, formData)
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500)
      })
    }
  }
}
</script>

<style scoped>
.config-demo-container {
  padding: 20px;
}

.config-panel, .preview-panel {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 20px;
}

.panel-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.divider {
  font-size: 14px;
  color: #909399;
  margin: 16px 0 12px;
}

.field-label {
  color: #606266;
}

.code-preview {
  background: #f5f7fa;
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  margin: 0;
}

h2 {
  color: #303133;
  margin-bottom: 20px;
}
</style>
