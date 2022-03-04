<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-02 15:46:23
 * @FilePath: /vue-shelf/src/views/ImplementationComponent/index.vue
-->

<template>
  <div class=""> 
    <viewComp ref="viewComp" :search="search" :config="config"></viewComp>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import viewComp from '@/components/viewComp.vue';
import config from './config';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: { viewComp },
  props: {},
  data() {
    return {
      config: config,
      search: {}
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
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
