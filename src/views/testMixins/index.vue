<template>
  <div class=""></div>
</template>

<script>
import A from './mixinsA';
import B from './mixinsB';

export default {
  name: '', // Pascal命名
  mixins: [A,  B],
  components: {},
  props: {},
  computed: {},
  data() {
    return {

    };
  },
  watch: {
  // temObj: {
  //   handler(newVal, oldVal) {},
  //   deep: true, // 深度
  //   immediate: true, // 立即执行
  // },
  },
  beforeCreate() {},
  created() {
    this.hello = () =>  {
      console.log('haha')
    }
    this.hello()
  },
  beforeMount() {},
  mounted() {},
  methods: {

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