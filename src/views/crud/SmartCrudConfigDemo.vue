<template>
  <div class="config-demo-container">
    <h2>SmartCrud 字段配置演示</h2>
    <el-row :gutter="20">
      <!-- 左侧配置区 -->
      <el-col :span="10">
        <div class="config-panel">
          <div class="panel-title">基础配置</div>

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

          <div class="divider">字段配置</div>

          <!-- 字段列表 -->
          <div class="field-list">
            <div v-for="field in availableFields" :key="field.prop" class="field-item flex" :class="{ active: selectedFieldProps.includes(field.prop) }">
              <div class="field-main">
                <el-checkbox v-model="field.selected" :label="field.prop">
                  <span class="field-label">{{ field.label }}</span>
                </el-checkbox>
              </div>
              <div class="field-options" v-if="field.selected">
                <el-checkbox v-model="field.canSearch" size="mini">搜索</el-checkbox>
                <el-checkbox v-model="field.canAdd" size="mini">新增</el-checkbox>
                <el-checkbox v-model="field.canEdit" size="mini">编辑</el-checkbox>
              </div>
            </div>
          </div>

        </div>
      </el-col>
      <!--<pre>{{availableFields}}</pre>-->
      <!-- 右侧预览区 -->
      <el-col :span="14">
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
                  @open-add="handleOpenAdd"
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
          <pre class="code-preview">{{ columns }}</pre>
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
      ...fieldDict[key],
      selected: false,
      canSearch: fieldDict[key].search || false,
      canAdd: true,
      canEdit: true
    }))

    // 默认选择常用字段
    const defaultFieldProps = ['userName', 'realName', 'email', 'phone', 'status', 'createTime']
    availableFields.forEach(field => {
      if (defaultFieldProps.includes(field.prop)) {
        field.selected = true
      }
    })

    return {
      availableFields,
      isPaginated: true,
      showIndex: true,
      showSelection: false,
      drawerSize: '50%'
    }
  },
  computed: {
    selectedFieldProps() {
      return this.availableFields.filter(f => f.selected).map(f => f.prop)
    },
    columns() {
      return this.availableFields
              .filter(f => f.selected)
              .map(field => ({
                prop: field.prop,
                search: field.canSearch,
                canAdd: field.canAdd,
                canEdit: field.canEdit
              }))
    },
    codePreview() {
      // 简化代码预览，只展示有差异的配置
      const simplifiedColumns = this.availableFields
              .filter(f => f.selected)
              .map(field => {
                const config = {prop: field.prop}
                if (field.canSearch !== fieldDict[field.prop]?.search) config.search = field.canSearch
                if (field.canAdd !== true) config.canAdd = field.canAdd
                if (field.canEdit !== true) config.canEdit = field.canEdit
                return Object.keys(config).length === 1 ? field.prop : config
              })

      const code = `<smart-crud
  url="${this.isPaginated ? '/api/user/page' : '/api/user/list'}"
  :show-index="${this.showIndex}"
  :show-selection="${this.showSelection}"
  :drawer-size="'${this.drawerSize}'"
  :columns="${JSON.stringify(simplifiedColumns, null, 2)}"
/>`
      return code
    }
  },
  methods: {
    aaaa() {
      return this.columns.map(item => {
        return {
          label: item.label,
          prop: item.prop,
          canSearch: item.canSearch,
          canAdd: item.canAdd,
          canEdit: item.canEdit
        }
      })
    },
    selectAll() {
      this.availableFields.forEach(field => {
        field.selected = true
      })
    },
    deselectAll() {
      this.availableFields.forEach(field => {
        field.selected = false
      })
    },
    selectDefault() {
      const defaultFieldProps = ['userName', 'realName', 'email', 'phone', 'status', 'createTime']
      this.availableFields.forEach(field => {
        field.selected = defaultFieldProps.includes(field.prop)
      })
    },
    openView(row) {
      this.$refs.crudRef.openViewDrawer(row)
    },
    openEdit(row) {
      this.$refs.crudRef.openEditDrawer(row)
    },
    handleOpenAdd() {
      this.$refs.crudRef.openAddDrawer()
      console.log('打开新增抽屉')
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

.field-list {
  max-height: 500px;
  overflow-y: auto;
}

.field-item {
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.3s;
  align-items: center;
}

.field-item.active {
  background: #f5f7fa;
  border-color: #e4e7ed;
}

.field-main {
  display: flex;
  align-items: center;
}

.field-label {
  color: #606266;
  font-weight: 500;
}

.field-options {
  margin-top: 8px;
  padding-left: 22px;
  display: flex;
  gap: 16px;
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
