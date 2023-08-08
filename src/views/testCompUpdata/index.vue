<template>
  <div class="">
    <Child></Child>
  </div>
</template>

<script>
import  Child from './child';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {Child},
  props: {},
  computed: {},
  data() {
    return {};
  },
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
    console.log(1);
  },
  mounted() {
    console.log(2);
  },
  methods: {},
  beforeUpdate() {
    console.log('父页面: beforeUpdate');
  }, //生命周期 - 更新之前
  updated() {
    console.log('父页面: updated');
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