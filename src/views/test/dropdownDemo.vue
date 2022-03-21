<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-21 15:54:35
 * @FilePath: /vue-shelf/src/views/test/dropdownDemo.vue
-->
<template>
  <div class="">
    <div>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
    </div>

    <span :is="getElem()">
      <span class="el-dropdown-link"> <i class="el-icon-share"></i> </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :is="getElem('el-dropdown-item')">黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </span>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
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
  methods: {
    getElem(elem) {
      if (len > 2) {
        return elem
      }
      return 'div'
    }
  },
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