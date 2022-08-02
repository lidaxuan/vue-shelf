<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2021-08-25 18:06:55
 * @FilePath: /vue-shelf/src/components/table/index.vue

 background: #1b1b1b
-->

<template>
  <!-- :style="`width: 100%; ${ backgroundBlack ? '' : ''}`" -->
  <div :style="{ height }" class="flex flex-column flex-ccb">
    <!-- :height="isPage ? tableHeight - 54 : tableHeight - 1" -->
    <Table
      v-if="display"
      :height="height ? (isPage ? 'calc(10% - 54px)' : '100%') : null"
      v-bind="$attrs"
      v-on="$listeners"
      ref="table"
      size="medium"
      :border="border"
      style="margin-bottom: 15px"
    >
      <template v-if="newTableColumnData2 && newTableColumnData2.length > 0">
        <template v-for="(item, index) in newTableColumnData2">
          <TableColumn :key="index" v-bind="item" :sortable="item.sortable || false" v-if="item.display">
            <template #header="scope" v-if="item.headerSlotName">
              <slot :name="item.headerSlotName" v-bind="scope" />
            </template>

            <template #header="scope" v-else-if="item.operColumn">
              {{ item.label }}
              <span v-if="item.operColumn">
                <Popover placement="bottom" trigger="click" v-model="columnOper">
                  <div style="max-height: 300px; overflow: auto">
                    <!-- <draggable
                      class="el-table__list-group"
                      tag="div"
                      v-model="newTableColumnData2"
                      v-bind="dragOptions"
                      handle=".el-icon-s-operation"
                      @change="tableColumnChange"
                    > -->
                    <!-- <transition-group type="transition" name="flip-list"> -->
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
                    <!-- </transition-group> -->
                    <!-- </draggable> -->
                    <div style="text-align: right; margin-top: 10px">
                      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                    </div>
                  </div>
                  <strong slot="reference" class="el-icon-setting" style="cursor: pointer" />
                </Popover>
              </span>
            </template>

            <template #default="scope" v-if="item.slotName">
              <template v-if="slotArr[item.slotName]">
                <template v-for="btn in item.Plugin">
                  <el-button :type="btn.type || 'primary'" @click="handle(scope.row, btn)">{{ btn.text }}</el-button>
                </template>
              </template>
              <slot v-else-if="!slotArr[item.slotName]" :name="item.slotName" v-bind="scope" />
            </template>

            <template #default="scope" v-else-if="!['index', 'selection', 'expand'].includes(item.type)">
              <span v-if="item.formatter">
                <span>{{ item.formatter(scope.row, scope.column, '', scope.$index) }}</span>
              </span>
              <span v-else>{{
                `${item.beforeConcat || ''}${(scope.row[item.prop] == '0' ? '0' : scope.row[item.prop]) || item.defaultValue || ''}${item.afterConcat || ''}`
              }}</span>
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
      style="text-align: right"
      background
      @size-change="($event) => $emit('pageSizeChange', $event)"
      @current-change="($event) => $emit('pageNumberChange', $event)"
      :current-page="pageNumber"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="parseInt(totalNumber)"
      :pager-count="pagerCount"
    />
  </div>
</template>

<script>
import { Table, TableColumn, Popover, Tooltip, Pagination } from 'element-ui';
// import draggable from "vuedraggable";

const formatMethods = function () {
  let methods = ['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort'];
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
  props: {
    tableColumnData: {
      type: Array,
      default: (_) => []
    },
    isPage: {
      type: Boolean,
      default: false
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: (_) => [10, 20, 50, 100]
    },
    totalNumber: {
      type: Number | String,
      default: 0
    },
    border: {
      type: Boolean,
      default: true
    },
    height: [String, Number],
    backgroundBlack: {
      type: Boolean,
      default: () => true
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    slotArr: Object
  },
  components: {
    Table,
    TableColumn,
    Popover,
    // draggable,
    Tooltip,
    Pagination
  },
  data() {
    return {
      newTableColumnData: [],
      newTableColumnData2: [],
      display: true,
      columnOper: false,
      tableHeight: 250
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  },
  watch: {
    tableColumnData: {
      handler: function (nc, ov) {
        this.setColumnData();
      },
      deep: true
    }
  },
  mounted() {
    this.setColumnData();
  },
  methods: {
    handle(row, btn) {
      this.$emit('tableHandle', row, btn);
    },
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
    }
  }
};
</script>

<style scoped>
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
.el-pagination {
  padding: 0;
  margin-bottom: 0;
}
</style>
