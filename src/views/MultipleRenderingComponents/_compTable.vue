<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023-07-03 09:37:27
 * @FilePath: /vue-shelf/src/views/MultipleRenderingComponents/_compTable.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-07-03 09:48:34
-->
<template>
  <div class="hmax">
    <Table v-bind="$attrs" class="tableComStyle" key="1" style="width: 100%; height: 100%" :data="tableData" :tableColumnData="tableColumnData" ref="table">
        <template #handle="scope">
          <el-button type="text" @click="addAiUserTimeoutBtn(scope.row)">修改</el-button>
          <el-button type="text" @click="delTableItemBtn(scope.row)">删除</el-button>
        </template>
      </Table>
  </div>
</template>

<script>
import Table from '@/components/table';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {Table},
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumnData: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
    };
  },
  computed: {},
  watch: {
  // temObj: {
  //   handler(newVal, oldVal) {},
  //   deep: true, // 深度
  //   immediate: true, // 立即执行
  // },
  },
  beforeCreate() {},
  created() {
    // .$emit
  },
  beforeMount() {},
  mounted() {},
  methods: {
    addAiUserTimeoutBtn(row) {

    },
    delTableItemBtn(row) {

    },
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>