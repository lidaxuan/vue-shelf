<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-07-05 09:58:21
 * @FilePath: /vue-shelf/src/views/test/close.vue
-->
<template>
  <div class="close hmax">
    11
    <el-button>aasdasd</el-button>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  //这里存放数据
  data() {
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {
    window.addEventListener('beforeunload', (e) => this.beforeunloadHandler(e));
    window.addEventListener('unload', (e) => this.unloadHandler(e));
  },
  //方法集合
  methods: {
    beforeunloadHandler(event) {
      // debugger
      this._beforeUnload_time = new Date().getTime();
      console.log('this._beforeUnload_time：', this._beforeUnload_time);
      event = event || window.event;
      console.log(event);
      if (event) {
        event.returnValue = '关闭提示';
      }
      // debugger
      return '关闭提示';
    },
    unloadHandler() {
      console.log('this._beforeUnload_time2：', this._beforeUnload_time);
      this._gap_time = new Date().getTime() - this._beforeUnload_time;
      // console.log('this._gap_time：', this._gap_time);
      // 判断是窗口关闭还是刷新
      // debugger; // 关闭能拦住 刷新拦不住
      // todo
      if (this._gap_time <= 5) {
        // debugger;
        // todo
        $.ajax({});
      } else {
        $.ajax({}); // 关闭
        // debugger;
      }
    },
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    window.removeEventListener('beforeunload', (e) => this.beforeunloadHandler(e));
    window.removeEventListener('unload', (e) => this.unloadHandler(e));
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.close {
  background: pink;
}
</style>