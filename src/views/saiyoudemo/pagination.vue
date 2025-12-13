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
      :page-sizes="[20, 50, 100, 200]"
      layout="total,sizes,prev, pager, next,jumper"
      :total="page.total"
      :page-size="page.pageSize"
      :current-page="page.page"
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
      default: !true
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
  text-align: right;

  .el-pagination {
    padding: 10px 10px 10px 0 !important;
  }
}


</style>
