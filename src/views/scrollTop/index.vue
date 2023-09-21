<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2023-08-09 13:57:12
 * @FilePath: /vue-shelf/src/views/scrollTop/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-08-09 14:37:52
-->
<template>
  <div class="">
    <button @click="screenTop(Math.floor(Math.random() * 10000))">随机滚动位置</button>
    <div @scroll="scroll" class="" ref="box" style="width: 200px; height: 400px; overflow-y: auto">
      <div v-for="item in 1000" :key="item">招招 {{ item }}</div>
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
      height: "",
      time: ""
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
  created() {
    // .$emit
  },
  beforeMount() {},
  mounted() {},
  methods: {
    screenTop(h) {
      // console.log("height", height);
      this.$refs.box.scrollTop = h || this.height;
    },
    scroll(e) {
      if (this.time) {
        clearTimeout(this.time);
        this.time = "";
      }
      this.time = setTimeout(() => {
        console.log(this.$refs.box.scrollTop);
      }, 1000);
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

.box {
  transition: all 1s;
}
</style>
