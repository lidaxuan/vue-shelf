<template>
  <div class="smart-crud">
    <el-form v-if="searchFields.length > 0" :model="searchForm" :inline="true" class="search-form">
      <el-form-item v-for="field in searchFields" :key="field.prop" :label="field.label">
        <el-input v-if="field.type === 'input'" v-model="searchForm[field.prop]" :placeholder="`请输入${field.label}`" clearable @keyup.enter.native="handleSearch"/>
        <el-date-picker v-else-if="field.type === 'date'" v-model="searchForm[field.prop]" :type="field.dateType || 'datetimerange'" :placeholder="`请选择${field.label}`" :format="field.format"
                        :value-format="field.valueFormat" :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clearable/>
        <el-select v-else-if="field.type === 'select'" v-model="searchForm[field.prop]" :placeholder="`请选择${field.label}`" clearable>
          <el-option v-for="opt in field.options" :key="opt.value" :label="opt.label" :value="opt.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <slot name="toolbar">
      <div v-if="showToolbar" class="default-toolbar">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
    </slot>

    <el-table ref="elTable" v-loading="loading" :data="tableData" border stripe :max-height="tableMaxHeight" style="width: 100%" @selection-change="handleSelectionChange" v-bind="$attrs">
      <el-table-column v-if="showSelection" type="selection" width="55" fixed="left"/>
      <el-table-column v-if="showIndex" type="index" label="序号" width="70" fixed="left"/>
      <template v-for="field in tableFields">
        <!--        :width="field.width"-->
        <el-table-column v-if="hasSlot(field.prop)" :key="'slot-' + field.prop" :prop="field.prop" :label="field.label" :min-width="field.minWidth" :align="field.align"
                         :sortable="field.sortable ? 'custom' : false" :show-overflow-tooltip="field.showOverflowTooltip !== false">
          <template slot-scope="scope">
            <slot :name="field.prop" :row="scope.row" :$index="scope.$index"/>
          </template>
        </el-table-column>
        <el-table-column v-else-if="field.type === 'select' && field.options" :key="'select-' + field.prop" :prop="field.prop" :label="field.label" :width="field.width" :min-width="field.minWidth"
                         :align="field.align" :sortable="field.sortable ? 'custom' : false" :show-overflow-tooltip="field.showOverflowTooltip !== false">
          <template slot-scope="{ row }">{{ getOptionLabel(field, row[field.prop]) }}</template>
        </el-table-column>
        <el-table-column v-else :key="'default-' + field.prop" :prop="field.prop" :label="field.label" :width="field.width" :min-width="field.minWidth" :align="field.align"
                         :sortable="field.sortable ? 'custom' : false" :show-overflow-tooltip="field.showOverflowTooltip !== false"/>
      </template>
      <el-table-column v-if="showOper" label="操作" :width="operWidth" :fixed="operFixed" align="center">
        <template slot-scope="{ row }">
          <slot name="oper" :row="row"/>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-if="isPaginated" :current-page="pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                   layout="total, sizes, prev, pager, next, jumper" style="margin-top: 20px; text-align: right" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>

    <!-- 详情和编辑的抽屉 -->
    <el-drawer
            :title="drawer.title"
            :visible.sync="drawer.visible"
            :size="drawer.size"
            :direction="drawer.direction"
            :before-close="handleDrawerClose"
            v-bind="$attrs"
    >
      <!-- 优先使用插槽，没有插槽则自动生成 -->
      <template v-if="$scopedSlots['drawer-content']">
        <slot name="drawer-content" :row="currentRow" :type="drawerType" :edit-form="editForm"/>
      </template>
      <!-- 自动生成详情展示 -->
      <template v-else-if="drawerType === 'view'">

        <div :column="1" border style="margin: 20px;">
          <div v-for="field in tableFields" class="flex mb20" :key="'desc-' + field.prop">
            <div class="label mr20 w100">{{ field.label }}:</div>
            <div>
              <div v-if="hasSlot('view-' + field.prop)" :label="field.label">
                <slot :name="'view-' + field.prop" :row="currentRow"/>
              </div>
              <div v-else-if="field.type === 'select' && field.options" :label="field.label">
                {{ getOptionLabel(field, currentRow[field.prop]) }}
              </div>
              <div v-else :label="field.label">
                {{ currentRow[field.prop] }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 自动生成编辑/新增表单 -->
      <template v-else>
        <el-form :model="editForm" ref="drawerForm" label-width="100px" style="padding: 20px;">
          <div v-for="field in tableFields" :key="'form-' + field.prop">
            <el-form-item v-if="hasSlot('form-' + field.prop)" :label="field.label">
              <slot :name="'form-' + field.prop" :edit-form="editForm" :field="field"/>
            </el-form-item>
            <el-form-item v-else :label="field.label">
              <!-- select 类型 -->
              <el-select v-if="field.type === 'select'" v-model="editForm[field.prop]" :placeholder="'请选择' + field.label" clearable style="width: 100%;">
                <el-option v-for="opt in field.options" :key="opt.value" :label="opt.label" :value="opt.value"/>
              </el-select>
              <!-- date 类型 -->
              <el-date-picker v-else-if="field.type === 'date'" v-model="editForm[field.prop]" :type="field.dateType || 'datetime'" :placeholder="'请选择' + field.label" :format="field.format"
                              :value-format="field.valueFormat || 'yyyy-MM-dd HH:mm:ss'" style="width: 100%;" clearable/>
              <!-- 默认 input -->
              <el-input v-else v-model="editForm[field.prop]" :placeholder="'请输入' + field.label" clearable/>
            </el-form-item>
          </div>
        </el-form>
      </template>

      <!-- 抽屉底部操作按钮 -->
      <div v-if="drawerType !== 'view'" style="position: absolute; left: 0; right: 0; bottom: 0; border-top: 1px solid #e8e8e8; padding: 12px 18px; background: #fff; text-align: right;">
        <el-button @click="closeDrawer">取消</el-button>
        <el-button type="primary" :loading="editFormLoading" @click="handleSaveDrawer">保存</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {fieldDict} from './fieldDict.js'

export default {
  name: 'SmartCrud',
  inheritAttrs: false,
  props: {
    // 数据接口地址（/page 结尾分页，/list 结尾不分页）
    url: {type: String, required: true},
    // 表格字段列表（接口返回的字段，会自动匹配字典表）
    columns: {type: Array, default: () => []},
    // 是否显示多选列
    showSelection: {type: Boolean, default: false},
    // 是否显示序号列
    showIndex: {type: Boolean, default: true},
    // 是否显示工具栏
    showToolbar: {type: Boolean, default: true},
    // 是否显示操作列
    showOper: {type: Boolean, default: true},
    // 操作列宽度
    operWidth: {type: Number, default: 240},
    // 操作列固定位置
    operFixed: {type: String, default: 'right'},
    // 表格最大高度
    tableMaxHeight: {type: [Number, String], default: 'auto'},
    // 是否自动加载数据
    autoLoad: {type: Boolean, default: true},
    // 抽屉默认大小
    drawerSize: {type: String, default: '40%'}
  },
  data() {
    return {
      tableData: [],
      loading: false,
      searchForm: {},
      pagination: {currentPage: 1, pageSize: 10, total: 0},
      // 抽屉相关
      drawer: {visible: false, title: '', size: '40%', direction: 'rtl'},
      drawerType: '', // 'view' | 'edit' | 'add',
      currentRow: null,
      editForm: {}, // 编辑表单数据
      editFormLoading: false // 编辑表单保存加载状态
    }
  },
  computed: {
    isPaginated() {
      return this.url.endsWith('/page') || this.url.includes('/page?')
    },
    // 表格字段：从 columns 或 tableData 中获取
    tableFields() {
      if (this.columns && this.columns.length > 0) {
        return this.columns.map(col => {
          if (typeof col === 'string') return this.getFieldConfig(col)
          return this.getFieldConfig(col.prop, col)
        })
      }
      if (this.tableData.length > 0) {
        return Object.keys(this.tableData[0]).map(prop => this.getFieldConfig(prop))
      }
      return []
    },
    // 搜索字段：匹配到的字段中 search: true 的
    searchFields() {
      return this.tableFields.filter(field => field.search === true)
    }
  },
  mounted() {
    if (this.autoLoad) this.loadData()
  },
  methods: {
    /* ========== 表格暴露的方法 ========== */
    // 暴露 el-table 全部方法
    clearSelection() {
      this.$refs.elTable && this.$refs.elTable.clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable && this.$refs.elTable.toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs.elTable && this.$refs.elTable.toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable && this.$refs.elTable.toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs.elTable && this.$refs.elTable.setCurrentRow(row)
    },
    clearSort() {
      this.$refs.elTable && this.$refs.elTable.clearSort()
    },
    clearFilter(columnKeys) {
      this.$refs.elTable && this.$refs.elTable.clearFilter(columnKeys)
    },
    doLayout() {
      this.$refs.elTable && this.$refs.elTable.doLayout()
    },
    sort(prop, order) {
      this.$refs.elTable && this.$refs.elTable.sort(prop, order)
    },

    /* ========== 抽屉相关方法 ========== */
    // 初始化编辑表单
    initEditForm(row) {
      this.editForm = {}
      this.tableFields.forEach(field => {
        this.$set(this.editForm, field.prop, row ? row[field.prop] : (field.defaultValue || ''))
      })
    },
    // 打开新增抽屉
    openAddDrawer() {
      this.drawerType = 'add'
      this.drawer.title = '新增'
      this.drawer.size = this.drawerSize
      this.currentRow = {}
      this.initEditForm(null)
      this.drawer.visible = true
      this.$emit('open-add')
    },
    // 打开编辑抽屉
    openEditDrawer(row) {
      this.drawerType = 'edit'
      this.drawer.title = '编辑'
      this.drawer.size = this.drawerSize
      this.currentRow = {...row}
      this.initEditForm(row)
      this.drawer.visible = true
      this.$emit('open-edit', row)
    },
    // 打开详情抽屉
    openViewDrawer(row) {
      this.drawerType = 'view'
      this.drawer.title = '详情'
      this.drawer.size = this.drawerSize
      this.currentRow = row
      this.drawer.visible = true
      this.$emit('open-view', row)
    },
    // 关闭抽屉
    closeDrawer() {
      this.drawer.visible = false
      this.currentRow = null
      this.drawerType = ''
    },
    // 抽屉关闭前钩子
    handleDrawerClose(done) {
      this.$emit('drawer-close', this.drawerType, this.currentRow)
      done()
    },
    // 保存抽屉表单
    async handleSaveDrawer() {
      // 触发事件让外部处理保存逻辑
      const shouldClose = await this.$emit('save-form', this.drawerType, {...this.editForm})
      // 如果外部返回 false，则不关闭抽屉
      if (shouldClose === false) return

      this.$message.success(this.drawerType === 'add' ? '新增成功' : '保存成功')
      this.closeDrawer()
      this.refresh()
    },

    // 根据 prop 从本地字典表匹配完整配置，可传入额外配置覆盖（对象结构查找效率 O(1)）
    getFieldConfig(prop, extraConfig = {}) {
      const localConfig = fieldDict[prop]
      const base = localConfig ? {...localConfig, prop} : {prop, label: prop, type: 'input', search: false, width: 120}
      return {...base, ...extraConfig}
    },
    hasSlot(prop) {
      return !!this.$scopedSlots[prop]
    },
    getOptionLabel(field, value) {
      if (!field.options || !value) return value
      const option = field.options.find(opt => opt.value === value)
      return option ? option.label : value
    },
    async loadData() {
      this.loading = true
      try {
        const params = this.buildParams()
        const response = await this.fetchData(params)
        this.handleResponse(response)
      } catch (error) {
        this.$message.error('加载数据失败: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    buildParams() {
      const params = {}
      if (this.isPaginated) {
        params.currentPage = this.pagination.currentPage;
        params.pageSize = this.pagination.pageSize
      }
      this.searchFields.forEach(field => {
        const value = this.searchForm[field.prop]
        if (value !== null && value !== undefined && value !== '') {
          if (field.type === 'date' && Array.isArray(value)) {
            params[`${field.prop}Start`] = value[0];
            params[`${field.prop}End`] = value[1]
          } else {
            params[field.prop] = value
          }
        }
      })
      return params
    },
    fetchData(params) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockData = this.generateMockData(params)
          resolve({code: 200, message: 'success', data: mockData})
        }, 300)
      })
    },
    generateMockData(params) {
      const mockData = []
      const totalCount = 56
      for (let i = 1; i <= totalCount; i++) {
        const record = {}
        this.tableFields.forEach(field => {
          record[field.prop] = this.generateFieldValue(field, i)
        })
        mockData.push(record)
      }
      let filteredData = mockData
      this.searchFields.forEach(field => {
        const value = params[field.prop]
        if (value !== null && value !== undefined && value !== '') {
          if (field.type === 'date' && params[`${field.prop}Start`]) {
            filteredData = filteredData.filter(item => item[field.prop] >= params[`${field.prop}Start`] && item[field.prop] <= params[`${field.prop}End`])
          } else {
            filteredData = filteredData.filter(item => String(item[field.prop] || '').includes(String(value)))
          }
        }
      })
      if (this.isPaginated) {
        const pageSize = params.pageSize || 10, currentPage = params.currentPage || 1
        const startIndex = (currentPage - 1) * pageSize
        return {records: filteredData.slice(startIndex, startIndex + pageSize), total: filteredData.length, current: currentPage, size: pageSize}
      }
      return filteredData
    },
    generateFieldValue(field, index) {
      switch (field.type) {
        case 'select':
          return field.options && field.options.length ? field.options[Math.floor(Math.random() * field.options.length)].value : null
        case 'date':
          return this.formatDate(new Date(Date.now() - Math.random() * 10000000000), field.valueFormat || 'yyyy-MM-dd HH:mm:ss')
        default:
          return `${field.label || field.prop}_${index}`
      }
    },
    handleResponse(response) {
      if (this.isPaginated) {
        this.tableData = response.data.records || []
        this.pagination.total = response.data.total || 0
        this.pagination.currentPage = response.data.current || 1
        this.pagination.pageSize = response.data.size || 20
      } else {
        this.tableData = response.data || []
        this.pagination.total = this.tableData.length
      }
      this.initSearchForm()
    },
    initSearchForm() {
      const formData = {}
      this.searchFields.forEach(field => {
        formData[field.prop] = field.defaultValue || null
      })
      this.searchForm = formData
    },
    handleSearch() {
      this.pagination.currentPage = 1;
      this.loadData()
    },
    handleReset() {
      this.initSearchForm();
      this.pagination.currentPage = 1;
      this.loadData()
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.pagination.currentPage = 1;
      this.loadData()
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.loadData()
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    handleAdd() {
      this.$emit('add')
    },
    refresh() {
      this.loadData()
    },
    formatDate(date, fmt) {
      const opt = {'y+': date.getFullYear(), 'M+': date.getMonth() + 1, 'd+': date.getDate(), 'H+': date.getHours(), 'm+': date.getMinutes(), 's+': date.getSeconds()}
      for (const k in opt) {
        const ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : String(opt[k]).padStart(ret[1].length, '0'))
      }
      return fmt
    }
  }
}
</script>

<style scoped>
.smart-crud {
  width: 100%;
}

.search-form {
  margin-bottom: 20px;
}

.search-form >>> .el-form-item {
  margin-bottom: 10px;
}

.search-form >>> .el-form-item__label {
  font-weight: 500;
}

.default-toolbar {
  margin-bottom: 15px;
}

.el-table {
  margin-bottom: 20px;
}
</style>
