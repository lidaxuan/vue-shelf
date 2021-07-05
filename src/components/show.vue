<!--
 * @Description: 
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-06-03 20:47:15
 * @FilePath: /vue-shelf/src/components/show.vue
-->
<template>
  <div class="show ql-editor">
    {{content}}
    <div v-html="content"></div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {
    content: {
      type: String
    }
  },
  //import引入的组件需要注入到对象中才能使用
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
    // temStr(val) {
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
.show {
  background: pink;
}
</style>