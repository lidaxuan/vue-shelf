<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-05 09:45:21
 * @FilePath: /vue-shelf/src/views/icon.vue
-->
<template>
  <div class="">1
    <IconFont type="icon-qianmingguanli" fill="green" active="pink" size="120"></IconFont>
    <Preview src="https://dss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/749.jpg?2" width="100" radius="8" :height="200"></Preview>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Preview from '@/components/Preview/image'
export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {Preview},
  props: {},
  //这里存放数据
  data() {
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 对象写法
    // temObj: {
    //   handler(newVal, oldVal) {
    //   },
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {},
  //方法集合
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