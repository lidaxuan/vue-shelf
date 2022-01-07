<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-22 15:29:54
 * @FilePath: /vue-shelf/src/views/inout.vue
-->
<template>
  <div>
    <div @click="asdasdasd">按钮</div>
    <div class="wmax box flex flex-aic" style="border: 5px solid #000">
      <div :style="`width: ${flag ? '100%' : '70%'}; background: rgba(0,0,0,.8); height: 100%`" class="left"></div>
      <div style="width: 30%; background: red; height: 100%; font-size: 40px" class="right">111222333444555666</div>
    </div>
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
    return {
      flag: false,
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
  methods: {
    asdasdasd() {
      this.flag = !Boolean(this.flag);
    },
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
.box {
  height: 600px;
  position: relative;
  .left {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 22;
    transition: all .3s;
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 11;
  }
}
</style>