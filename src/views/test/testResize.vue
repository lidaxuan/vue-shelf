<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-09-19 18:09:33
 * @FilePath: /vue-shelf/src/views/test/testResize.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-09-19 20:58:16
-->
<template>
  <div class="f">
    <el-switch active-value="300px" inactive-value="500px" v-model="sw"></el-switch>
    <el-button @click="bgchange('blue')">blue</el-button>
    <el-button @click="bgchange('yellow')">yellow</el-button>
    <el-button @click="bgchange('black')">black</el-button>
    <div class="flex">
      <div class="box1" :style="{ width: sw, background: bg }"></div>
      <div v-watchResize="asdasd" class="flex-item box2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "", // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      sw: "300px",
      bg: "#000"
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
  methods: {
    asdasd(val) {
      console.log(val);
    },
    bgchange(color) {
      this.bg = color;
    }
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.f {
  height: 100%;
  border: 10px solid red;
  .box1 {
    height: 300px;
    background: #000;
  }
  .box2 {
    height: 300px;
    background: pink;
  }
}
</style>
