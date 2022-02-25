<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-25 16:03:11
 * @FilePath: /vue-shelf/src/views/test/box.vue
-->
<template>
  <div class="flex flex-ccc flex-aic asd hmax">
    <div class="box"></div>
    <h1>Raindrops</h1>
    <ul>
      <li><span class="raindrop"></span><span class="ripple"></span></li>
      <li><span class="raindrop"></span><span class="ripple"></span></li>
      <li><span class="raindrop"></span><span class="ripple"></span></li>
      <li><span class="raindrop"></span><span class="ripple"></span></li>
      <li><span class="raindrop"></span><span class="ripple"></span></li>
      <li><span class="raindrop"></span><span class="ripple"></span></li>
      <li><span class="raindrop"></span><span class="ripple"></span></li>
      <li><span class="raindrop"></span><span class="ripple"></span></li>
    </ul>
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
  methods: {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.box {
  width: 200px;
  height: 200px;
  background: pink;
  border-radius: 50%;
  border-width: 100px;
  border-style: solid;
  border-left-color: skyblue;
  border-right-color: red;
  border-bottom-color: yellow;
  border-top-color: blue;
}
.asd {
  background: #1a1a1a;
  font-family: sans-serif;
}
h1,
h2 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
}
h1 {
  top: 24px;
  font-size: 12px;
}
h2 {
  top: 44px;
  font-size: 10px;
  opacity: 0.7;
}
h2 a {
  color: white;
  text-decoration: none;
  border-bottom: 1px dotted #999999;
}
body {
  width: 100%;
  height: 100vh;
  perspective: 600px;
}
ul {
  position: absolute;
  width: 60vh;
  height: 60vh;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(65deg);
  transform-style: preserve-3d;
}
ul li {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  border-radius: 50%;
  transform-style: preserve-3d;
}
ul li span {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
}
ul li span.raindrop {
  // width: 5px;
  // height: 5px;
  // background: #cccccc;
  width: 20px;
  height: 20px;
  background: pink;
  border-radius: 50%;
  border-width: 10px;
  border-style: solid;
  border-left-color: skyblue;
  border-right-color: red;
  border-bottom-color: yellow;
  border-top-color: blue;

  animation: raindrop 8s ease-in infinite;
  animation-fill-mode: backwards;
}
ul li span.ripple {
  width: 100%;
  height: 100%;
  border: 2px solid #cccccc;
  animation: ripple 8s ease-out infinite;
  animation-fill-mode: backwards;
}
li:nth-child(1) {
  transform-origin: 50% 100%;
  transform: translate(-50%, -50%) rotate(45deg);
}
li:nth-child(1) span.raindrop,
li:nth-child(1) span.ripple {
  animation-delay: 0s;
}
li:nth-child(2) {
  transform-origin: 50% 100%;
  transform: translate(-50%, -50%) rotate(90deg);
}
li:nth-child(2) span.raindrop,
li:nth-child(2) span.ripple {
  animation-delay: 1s;
}
li:nth-child(3) {
  transform-origin: 50% 100%;
  transform: translate(-50%, -50%) rotate(135deg);
}
li:nth-child(3) span.raindrop,
li:nth-child(3) span.ripple {
  animation-delay: 2s;
}
li:nth-child(4) {
  transform-origin: 50% 100%;
  transform: translate(-50%, -50%) rotate(180deg);
}
li:nth-child(4) span.raindrop,
li:nth-child(4) span.ripple {
  animation-delay: 3s;
}
li:nth-child(5) {
  transform-origin: 50% 100%;
  transform: translate(-50%, -50%) rotate(225deg);
}
li:nth-child(5) span.raindrop,
li:nth-child(5) span.ripple {
  animation-delay: 4s;
}
li:nth-child(6) {
  transform-origin: 50% 100%;
  transform: translate(-50%, -50%) rotate(270deg);
}
li:nth-child(6) span.raindrop,
li:nth-child(6) span.ripple {
  animation-delay: 5s;
}
li:nth-child(7) {
  transform-origin: 50% 100%;
  transform: translate(-50%, -50%) rotate(315deg);
}
li:nth-child(7) span.raindrop,
li:nth-child(7) span.ripple {
  animation-delay: 6s;
}
li:nth-child(8) {
  transform-origin: 50% 100%;
  transform: translate(-50%, -50%) rotate(360deg);
}
li:nth-child(8) span.raindrop,
li:nth-child(8) span.ripple {
  animation-delay: 7s;
}
@keyframes raindrop {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) translateZ(200px);
  }
  1%,
  9% {
    opacity: 1;
  }
  10%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translateZ(0px);
  }
}
@keyframes ripple {
  0%,
  10% {
    transform: translate(-50%, -50%) scale(0);
  }
  40% {
    opacity: 1;
  }
  80%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>