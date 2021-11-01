<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-01 09:27:20
 * @FilePath: /vue-shelf/src/components/testcomp/child.vue
-->
<template>
  <div class="">
    <!-- <pre>{{ item }}</pre> -->
  <Children :item="item.a"></Children>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Children from './children.vue';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    Children
  },
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {
    //   },
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
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>