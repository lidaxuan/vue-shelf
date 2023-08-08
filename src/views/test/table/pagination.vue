<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-02-15 09:25:34
 * @FilePath: /vue-shelf/src/views/test/table/pagination.vue
-->
<template>
  <div :class="{ 'fixed-foot': isFixed, pagination: !isFixed }">
    <el-pagination
      v-if="isSmall"
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :page-size="page.pageSize"
      :total="page.total"
    >
    </el-pagination>

    <el-pagination
      :page-sizes="[10, 50, 100, 500]"
      layout="total,sizes,prev, pager, next,jumper"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "pagination", //分页组件
  props: {
    page: {
      type: Object,
      default: {}
    },
    enableSmall: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isSmall: this.enableSmall || false //是否启用small模式
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("pageChange", val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("pageChangeSize", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  position: absolute;
  bottom: 52px;
  width: calc(100% - 216px);
  margin: 0 !important;
  text-align: right;

  .el-pagination {
    padding: 10px 10px 10px 0 !important;
    background-color: rgba(99, 99, 99, 0.6);
  }
}

.fixed-foot {
  position: fixed;
  width: calc(100% - 216px);
  right: 10px;
  bottom: 0;
  margin: 0 !important;
  text-align: right;

  .el-pagination {
    padding: 10px 10px 10px 0 !important;
    background-color: rgba(99, 99, 99, 0.6);
  }
}

::v-deep.el-pagination__total {
  color: #fff;
}

::v-deep .el-input__inner,
::v-deep .btn-prev,
::v-deep .btn-next,
::v-deep .el-pager li {
  border: 1px solid transparent;
  background-color: rgba(99, 99, 99, 0.6);
  color: #fff;
}

::v-deep .el-pager li.active {
  color: #409eff;
}

::v-deep .el-pagination button:disabled {
  background-color: rgba(99, 99, 99, 0.6);
}

::v-deep .el-pagination__jump {
  color: #fff;
}
</style>
