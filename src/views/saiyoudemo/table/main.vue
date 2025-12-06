
<template>
  <!-- <div class="e-table-sp e-table-mini-sp e-table-small-sp e-table-big-sp" :style="{height}"> -->
  <div :class="`e-table-sp e-table-${sizeComputed}-sp`" :style="{height}">
    <div ref="operColumn" class="oper-column" v-if="oper">
      <i class="iconfont icon-D1-A6" style="font-size: 22px; cursor: pointer; color: #bbb;" @click="$emit('oper-click')"/>
    </div>
    <el-table v-bind="$attrs" :border="styleComputed === 'border'" v-on="$listeners" :data="data" ref="table" size="medium" :height="height" :row-class-name="rowClassNameComputed">
      <template v-for="(item, index) in columnsComputed || []">
        <Column v-bind="item" :key="index" v-if="item.display === undefined || item.display === true" :columnData="columnsComputed" :defaultValue="item.defaultValue" :globaDefaultValue="defaultValue">
          <template #[slotName]="scope" v-for="slotName in slotNames">
            <slot :name="slotName" v-bind="scope"/>
          </template>
        </Column>
      </template>
      <slot/>
      <template #empty>
        <slot name="empty"/>
      </template>
    </el-table>
  </div>
</template>

<script>
import Column from './Column.vue';

// table操作函数
const formatMethods = () => {
  const methods = ['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort']
  const newMethods = {};
  methods.forEach(item => newMethods[item] = function () {
    this.$refs.table[item](...arguments)
  })
  return newMethods;
};
export default {
  name: 'ETableSp',
  provide() {
    return {
      containerType: 'text-primary',
    };
  },
  inheritAttrs: false,
  props: {
    // table列数据
    tableColumnData: {
      type: Array,
      default: _ => []
    },
    // table全局默认值
    defaultValue: null,
    // 操作按钮
    oper: {
      type: Boolean,
      default: false
    },
    // table数据
    data: {
      type: Array,
      default: _ => []
    },
    // height
    height: {
      type: Number | String,
      default: null
    },
    size: {
      validator: (value) => ['', 'small', 'medium', null].includes(value),
      default: null
    },
    rowClassName: {
      type: Function,
      default: null
    },
    tableStyle: {
      validator: (value) => ['minimalist', 'border', 'stripe', null].includes(value),
      default: null
    },
  },
  components: {
    Column,
  },
  data() {
    return {};
  },
  watch: {
    // 列改变重新渲染列表
    tableColumnData: {
      handler() {
        this.refresh();
      },
      deep: true
    },
    // 数据改变重新渲染列表
    data() {
      this.refresh();
    },
  },
  computed: {
    sizeComputed() {
      return this.size || this.$store?.getters?.layoutSetting?.tableSetting?.rowHeight || "mini";
    },
    styleComputed() {
      return this.tableStyle || this.$store?.getters?.layoutSetting?.tableSetting?.tableStyle || "minimalist";
    },
    //
    slotNames() {
      return this.fotmatSlotNames(this.tableColumnData);
    },
    columnsComputed() {
      return this.getWidth(this.tableColumnData);
    },
  },
  mounted() {
    this.setHeaderHeight();
  },
  methods: {
    rowClassNameComputed(params) {
      if (this.rowClassName) {
        return this.rowClassName(params);
      }
      if (this.styleComputed === "stripe" && params.rowIndex % 2 === 0) {
        return "table-background";
      }
    },
    // table操作函数
    ...formatMethods(),
    getWidth(arr = [], level = 0) {
      let list = [].concat(arr);
      let span = document.createElement("span");
      let dom;
      for (let i = 0; i < list.length; i++) {
        let item = list[i] || {};
        span.innerText = `${item?.before || ""}${item?.label}${item?.after || ""}`;
        dom = document.body.appendChild(span);
        if (!item.minWidth && !item.width) {
          if (item.slotName === "oper") {
            item.width = 140;
          }
          if (item.type === "selection") {
            item.width = 55;
          }
          if (item.type === "index") {
            item.width = 70;
          }
          item.minWidth = (Math.floor(span.getBoundingClientRect().width) || 50) + 50; // 可能还有边距/边框等值，需要根据实际情况加上，
          // 最后一列加长预留操作按钮
          if (this.oper && list.length - 1 === i && level === 0) {
            item.minWidth += 20;
          }
          // 排序
          if (item.sortable) {
            item.minWidth += 24;
          }
          // Tips
          if (item.tips) {
            item.minWidth += 14;
          }
          if (item["show-overflow-tooltip"] !== false && !item["show-overflow-tooltip"]) {
            item["show-overflow-tooltip"] = true;
          }
        }

        // if (!item["align"]) {
        //   item["align"] = "center";
        // }
        if (item?.children?.length > 0) {
          this.getWidth(item.children, level + 1);
        }
      }
      if (dom) {
        document.body.removeChild(span);
      }
      return list;
    },
    // 获取所有插槽
    fotmatSlotNames(arr) {
      return arr.reduce((count, item) => {
        if (item.slotName) {
          count.push(item.slotName);
        }
        if (item.children) {
          count = [...count, ...this.fotmatSlotNames(item.children)];
        }
        return count;
      }, []);
    },
    // 刷新列表
    refresh() {
      this.$refs.table.doLayout();
    },
    getElementsByClassName(className, children) {
      if (!className || !children) {
        return;
      }
      for (var i = 0; i < children.length; i++) {
        const item = children[i]
        if (item?.className?.includes && item?.className?.includes(className)) {
          return item;
        } else {
          const result = this.getElementsByClassName(className, item?.children);
          if (result) {
            return result;
          }
        }
      }
    },
    setHeaderHeight() {
      this.$nextTick(() => {
        const table = this.$refs.table;
        const el = this.getElementsByClassName("el-table__header-wrapper", table.$el.children);
        if (this.$refs.operColumn) {
          this.$refs.operColumn.style.height = (el.getBoundingClientRect().height - 2) + 'px';
        }
      })
    },
  },
}
</script>

<style type="scss" scoped>

.e-table-sp {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-width: 100%;
  background-color: #FFFFFF;
  font-size: 14px;
  color: #606266;
}

::v-deep .el-table .switchEl {
  justify-content: center !important;
  height: auto !important;
}

::v-deep .el-table .switchEl .el-switch {
  margin: 0 !important;
  margin-right: 5px !important;
}


.el-table-oper-column {
  position: absolute;
  top: 20px;
  right: 25px;
  z-index: 5;
  background-color: #FFFFFF;
}

.oper-column {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 1px;
  right: 1px;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
}

.e-table-mini-sp ::v-deep .el-table tr {
  height: 38px;
}

.e-table-small-sp ::v-deep .el-table tr {
  height: 48px;
}

.e-table-medium-sp ::v-deep .el-table tr {
  height: 58px;
}

::v-deep .el-table .table-background {
  background-color: #f1f4fa;
}
</style>
