<!--
 * @Description: 组件测试
 * @Author: 李大玄
 * @Date: 2021-11-01 09:24:56
 * @FilePath: /vue-shelf/src/views/testComp.vue
-->
<template>
  <div class="">
    {{arr}}
    <div v-for="item in arr">
      <Child :item="item"></Child>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Child from '../components/testcomp/child.vue'

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    Child
  },
  props: {},
  data() {
    return {
      arr: [
        {
          a: {
            b: {
              c: 1,
            },
          },
          f: 1
        },
        {
          a: {
            b: {
              c: 234,
            },
          },
          f: 45
        },
      ],
    };
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