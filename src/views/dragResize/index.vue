<template>
  <div class="">
    <template v-for="(item, index) in list">
      <VueDraggableResizable v-bind="item" :key="index">
        {{item.title}}
        <el-button @click="del(index)">删除</el-button>
      </VueDraggableResizable>

    </template>
  </div>
</template>

<script>
import {list} from './list';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      list
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
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    del(index) {
      this.list.splice(index, 1);
    }
  },
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>