<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2024/3/8 3:51 下午
 * @FilePath: src/views/xScroll/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2024/3/8 3:51 下午
-->
<template>
  <div class="wmax hmax ">
<!--    <div class="box flex w500" v-horizontalScroll>-->
<!--      <div class="item " v-for="item in 20"> 我真的就是你看哇{{ item }}</div>-->
<!--    </div>-->

<!--    <div class="box2 h400 w500">-->
<!--      <div class="item mb10" v-for="item in 40"> 我真的就是你看哇{{ item }}</div>-->
<!--    </div>-->
    <div  class="box1 wmax flex" style="overflow-x: auto" v-horizontalScroll>
<!--      <img width="1500" height="500" src="../../assets/images/0.jpg" alt="">-->
<!--      <img width="1500" height="500" src="../../assets/images/1.jpg" alt="">-->
<!--      <img width="1500" height="500" src="../../assets/images/2.jpg" alt="">-->
<!--      <img width="1500" height="500" src="../../assets/images/3.jpeg" alt="">-->

    </div>
  </div>
</template>

<script>

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  computed: {},
  data() {
    return {

    };
  },
  watch: {
  // temObj: {
  //   handler(newVal, oldVal) {},
  //   deep: true, // 深度
  //   immediate: true, // 立即执行
  // },
  },
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {},
  methods: {

  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.box  {
  border: 2px solid pink;
  overflow-x: auto;
  flex-wrap: nowrap;
  .item {
    min-width: 150px;
    margin-right: 20px;
  }
}
.box2   {
  border: 2px solid pink;
  overflow-y: auto;
}
</style>