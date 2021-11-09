<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-25 18:06:55
 * @FilePath: /vue-shelf/src/components/table/index.vue

 background: #1b1b1b
-->

<template>
  <!-- :style="`width: 100%; ${ backgroundBlack ? '' : ''}`" -->
  <div :style="{ height }">
    <Table
      :id="tableId"
      v-if="display"
      v-bind="$attrs"
      v-on="$listeners"
      ref="table"
      size="medium"
      :height="height ? (isPage ? 'calc(' + height + ' - 54px)' : height) : null"
      :header-cell-style="headerCellStyle"
      :border="border"
      :data="lazy ? tableData : data"
    >
      <template v-if="newTableColumnData2 && newTableColumnData2.length > 0">
        <template v-for="(item, index) in newTableColumnData2">
          <TableColumn :key="index" v-bind="item" v-if="item.display">
            <Column v-if="item.children && item.children.length" :list="item.children">
              <template #default="scope" v-if="item.slotName">
                {{ item }}
                <slot :name="item.slotName" v-bind="scope" />
              </template>
              <template #default="scope" v-else-if="!['index', 'selection', 'expand'].includes(item.type)">
                <span v-if="item.formatter">
                  <span>{{ item.formatter(scope.row, scope.column, '', scope.$index) }}</span>
                </span>
                <span v-else>{{ scope.row }}</span>
              </template>
            </Column>
            <template #header="scope" v-if="item.operColumn">
              {{ item.label }}
              <!-- <span v-if="item.operColumn">
                <Popover placement="bottom" trigger="click" v-model="columnOper">
                  <div style="max-height: 300px; overflow: auto">
                    <draggable
                      class="el-table__list-group"
                      tag="div"
                      v-model="newTableColumnData2"
                      v-bind="dragOptions"
                      handle=".el-icon-s-operation"
                      @change="tableColumnChange"
                    >
                      <transition-group type="transition" name="flip-list">
                        <template v-for="(item, index) in newTableColumnData2">
                          <div class="el-table__list-group-item" :key="scope.$index + '-' + index" v-if="!(item.fixed || item.type)">
                            <div style="min-width: 150px; padding: 5px 0; padding-left: 10px; display: flex">
                              <el-checkbox v-model="item.display" style="flex: 1" @change="tableColumnCheckboxChange">
                                {{ item.label }}
                                <Tooltip placement="top" v-if="item.tips">
                                  <div slot="content">{{ item.tips }}</div>
                                  <strong class="el-icon-info" />
                                </Tooltip>
                              </el-checkbox>
                              <strong class="el-icon-s-operation" style="margin: 0 10px; display: flex; align-items: center" />
                            </div>
                          </div>
                        </template>
                      </transition-group>
                    </draggable>
                    <div style="text-align: right; margin-top: 10px">
                      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                    </div>
                  </div>
                  <strong slot="reference" class="el-icon-setting" style="cursor: pointer" />
                </Popover>
              </span> -->
            </template>
            <template #default="scope" v-if="item.slotName">
              <slot :name="item.slotName" v-bind="scope" />
            </template>
            <template #default="scope" v-else-if="!['index', 'selection', 'expand'].includes(item.type)">
              <span v-if="item.formatter">
                <span>{{ item.formatter(scope.row, scope.column, '', scope.$index) }}</span>
              </span>
              <span v-else>{{ `${item.beforeConcat || ''}${scope.row[item.prop] || item.defaultValue}${item.afterConcat || ''}` }}</span>
            </template>
          </TableColumn>
        </template>
      </template>

      <template v-else>
        <slot />
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
    </Table>

    <Pagination
      v-if="isPage"
      style="margin-top: 20px; text-align: right"
      background
      @size-change="($event) => $emit('pageSizeChange', $event)"
      @current-change="($event) => $emit('pageNumberChange', $event)"
      :current-page="pageNumber"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNumber"
    />
  </div>
</template>

<script>
import uuid from 'uuid';
import { Table, TableColumn, Popover, Tooltip, Pagination } from 'element-ui';
import Column from './column.vue';

// import draggable from 'vuedraggable';
const formatMethods = function () {
  let methods = [
    'clearSelection',
    'toggleRowSelection',
    'toggleAllSelection',
    'toggleRowExpansion',
    'setCurrentRow',
    'clearSort',
    'clearFilter',
    'doLayout',
    'sort',
  ];
  let newMethods = {};
  methods.forEach((item) => {
    newMethods[item] = function () {
      this.$refs.table[item](...arguments);
    };
  });
  return newMethods;
};
export default {
  name: 'CustomTable',
  inheritAttrs: false,
  components: {
    Table,
    TableColumn,
    Popover,
    // draggable,
    Tooltip,
    Pagination,
    Column,
  },
  props: {
    tableColumnData: {
      type: Array,
      default: (_) => [],
    },
    isPage: {
      type: Boolean,
      default: false,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: (_) => [10, 20, 50, 100],
    },
    totalNumber: {
      type: Number,
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
    height: [String, Number],
    backgroundBlack: {
      type: Boolean,
      default: () => true,
    },
    // ----------
    lazy: {
      type: Boolean,
      default: () => false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    tableConfig: {
      type: Object,
      default: () => {
        return {
          itemHeight: 53, // 每一行高度
          start: 0,
          end: 30, // 3倍的pageList
          starts: 0, // 备份[保持与上一样]
          ends: 30, // 备份[保持与上一样]
          pageNum: 10, // 一屏显示
          timeOut: 400, // 延迟
        };
      },
    },
  },

  data() {
    return {
      newTableColumnData: [],
      newTableColumnData2: [],
      display: true,
      columnOper: false,

      tableData: [],
      dataList: [],
      tableRef: null,
      tableWarp: null,
      fixLeft: null,
      fixRight: null,
      scrollTop: 0,
      num: 0,
      tableId: 'TABLE' + uuid(),
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  watch: {
    tableColumnData: {
      handler: function (nc, ov) {
        this.setColumnData();
      },
      deep: true,
    },
    data: {
      handler: function (nc, ov) {
        this.dataList = [].concat(nc || []);
      },
      deep: true,
      immediate: true,
    },
    num: function (newV) {
      if (!this.lazy) {
        return;
      }
      if (newV > 1) {
        this.tableConfig.start = (newV - 1) * this.tableConfig.pageNum;
        this.tableConfig.end = (newV + 2) * this.tableConfig.pageNum;
        setTimeout(() => {
          this.tableData = this.dataList.slice(this.tableConfig.start, this.tableConfig.end);
          this.tableWarp.style.transform = `translateY(${this.tableConfig.start * this.tableConfig.itemHeight}px)`;
          if (this.fixLeft) {
            this.fixLeft.style.transform = `translateY(${this.tableConfig.start * this.tableConfig.itemHeight}px)`;
          }
          if (this.fixRight) {
            this.fixRight.style.transform = `translateY(${this.tableConfig.start * this.tableConfig.itemHeight}px)`;
          }
        }, this.tableConfig.timeOut);
      } else {
        setTimeout(() => {
          this.tableData = this.dataList.slice(this.tableConfig.starts, this.tableConfig.ends);
          this.tableWarp.style.transform = `translateY(0px)`;
          if (this.fixLeft) {
            this.fixLeft.style.transform = `translateY(0px)`;
          }
          if (this.fixRight) {
            this.fixRight.style.transform = `translateY(0px)`;
          }
        }, this.tableConfig.timeOut);
      }
    },
  },
  created() {
    if (this.lazy) {
      this.init();
      this.serScroll();
    }
    this.setColumnData();
  },
  mounted() {},
  methods: {
    serScroll() {
      this.$nextTick(() => {
        this.tableRef = this.$refs.table.bodyWrapper;
        let tableFixedLeft = document.querySelector(`#${this.tableId}.el-table .el-table__fixed .el-table__fixed-body-wrapper`);
        let tableFixedRight = document.querySelector(`#${this.tableId}.el-table .el-table__fixed-right .el-table__fixed-body-wrapper`);
        /**
         * fixed-left | 主体 | fixed-right
         */
        // 主体改造
        let divWarpPar = document.createElement('div');
        divWarpPar.style.height = this.dataList.length * this.tableConfig.itemHeight + 'px';
        let divWarpChild = document.createElement('div');
        divWarpChild.className = 'fix-warp';
        divWarpChild.append(this.tableRef.children[0]);
        divWarpPar.append(divWarpChild);
        this.tableRef.append(divWarpPar);

        // left改造
        let divLeftPar = document.createElement('div');
        divLeftPar.style.height = this.dataList.length * this.tableConfig.itemHeight + 'px';
        let divLeftChild = document.createElement('div');
        divLeftChild.className = 'fix-left';
        tableFixedLeft && divLeftChild.append(tableFixedLeft.children[0]);
        divLeftPar.append(divLeftChild);
        tableFixedLeft && tableFixedLeft.append(divLeftPar);

        // right改造
        let divRightPar = document.createElement('div');
        divRightPar.style.height = this.dataList.length * this.tableConfig.itemHeight + 'px';
        let divRightChild = document.createElement('div');
        divRightChild.className = 'fix-right';
        tableFixedRight && divRightChild.append(tableFixedRight.children[0]);
        divRightPar.append(divRightChild);
        tableFixedRight && tableFixedRight.append(divRightPar);

        // 被设置的transform元素
        this.tableWarp = document.querySelector(`#${this.tableId}.el-table .el-table__body-wrapper .fix-warp`);
        this.fixLeft = document.querySelector(`#${this.tableId}.el-table .el-table__fixed .el-table__fixed-body-wrapper .fix-left`);
        this.fixRight = document.querySelector(`#${this.tableId}.el-table .el-table__fixed-right .el-table__fixed-body-wrapper .fix-right`);

        this.tableRef.addEventListener('scroll', this.onScroll);
      });
    },
    init() {
      this.tableData = this.dataList.slice(this.tableConfig.start, this.tableConfig.end);
    },
    onScroll() {
      this.scrollTop = this.tableRef.scrollTop;
      this.num = Math.floor(this.scrollTop / (this.tableConfig.itemHeight * this.tableConfig.pageNum));
    },
    // ----------------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------------
    ...formatMethods(),
    setColumnData() {
      this.display = false; // 销毁 组件（更换列数据时，可能会存在页面错乱问题。所以销毁后再重新刷新，就不会了）
      this.newTableColumnData2 = Object.assign([], this.tableColumnData).map((item) => {
        if (item.display === false && item.display !== undefined) {
          item.display = false;
        } else {
          item.display = true;
        }
        return item;
      });
      this.display = true; // 重新展示组件
      // this.$nextTick(_=> {
      //   this.display = true; // 重新展示组件
      // });
    },
    headerCellStyle({ row, rowIndex }) {
      // if (rowIndex === 0) {
      //   return 'background-color: #f5f7fa';
      // }
    },
    tableColumnCheckboxChange() {
      this.tableColumnChange();
    },
    tableColumnChange(val) {
      // let newTableColumnData = JSON.parse(JSON.stringify(this.newTableColumnData));
      // this.$emit('tableColumnChange', newTableColumnData);
      // this.display = false;
      // setTimeout(() => {
      //   this.display = true;
      // }, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.el-table__list-group {
  min-height: 20px;
}
.el-table__list-group-item {
  cursor: move;
}
.el-table__list-group-item i {
  cursor: pointer;
}

</style>