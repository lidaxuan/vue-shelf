<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-26 14:09:13
 * @FilePath: /vue-shelf/src/views/test/tiger.vue
-->
<template>
  <div class="">
    <div class="container">
      <div class="tigre">
        <div class="body">
          <div class="cola"></div>
          <div class="cola3"></div>
          <div class="body7"></div>
          <div class="body5">
            <div class="ray"></div>
          </div>
          <div class="legs"></div>
          <div class="ray3"></div>
          <div class="ray5"></div>
          <div class="legs3"></div>
        </div>
        <div class="head">
          <div class="orejas"></div>
          <div class="orejas3"></div>
          <div class="face"></div>
          <div class="face3">
            <div class="rayas">
              <span class="r1"></span>
              <span class="r2"></span>
              <span class="r3"></span>
              <span class="r4"></span>
              <span class="r5"></span>
              <span class="r6"></span>
              <span class="r7"></span>
              <span class="r8"></span>
            </div>
            <div class="cejas"></div>
            <div class="cejas3"></div>
            <div class="cejas7"></div>
            <div class="ojos">
              <div class="iris"><div class="iris3"></div></div>
            </div>
            <div class="ojos3">
              <div class="iris7"><div class="iris9"></div></div>
            </div>
            <div class="boca7"></div>
            <div class="boca"></div>
            <div class="boca3"></div>
            <div class="bigotes"></div>
            <div class="bigotes3"></div>
          </div>
        </div>
      </div>
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
// @import 'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css';
body {
  background: black;
}
.container {
  position: relative;
  width: 800px;
  height: 600px;
  background: #24292e;
  margin: 0px auto;
}
.tigre {
  position: absolute;
  margin: 271px 350px;
}
.face {
  position: absolute;
  width: 251px;
  height: 172px;
  border-radius: 90px;
  background: #d8d3d6;
  margin: -90px -90px;
}
.face::before {
  content: '';
  position: absolute;
  width: 152px;
  height: 152px;
  border-radius: 700px 700px 5000px 700px;
  background: #d8d3d6;
  -webkit-transform: rotate(225deg);
  transform: rotate(225deg);
  margin: 30px 55px;
}
.face3 {
  position: absolute;
  width: 231px;
  height: 182px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: #e4393c;
  margin: -102px -80px;
}
.face3::before {
  content: '';
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 700px 700px 5000px 700px;
  background: #e4393c;
  -webkit-transform: rotate(225deg);
  transform: rotate(225deg);
  margin: 95px 73px;
}
.face5 {
  position: absolute;
  width: 152px;
  height: 132px;
  border-radius: 100%;
  background: #eda65e;
  margin: 40px 40px;
}
.orejas,
.orejas3 {
  position: absolute;
  width: 60px;
  height: 65px;
  border-radius: 100%;
  background: #fff;
  border: 12px solid #e4393c;
}
.orejas {
  margin: -121px -83px;
}
.orejas3 {
  margin: -121px 63px;
}
.ojos,
.ojos3 {
  position: absolute;
  width: 90px;
  height: 80px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: #937b54;
  border-top: 7px solid black;
  -webkit-animation: cerrar 3s alternate infinite;
  animation: cerrar 3s alternate infinite;
}
.ojos {
  margin: 70px 12px;
  border-left: 7px solid black;
}
.ojos3 {
  margin: 70px 121px;
  border-right: 7px solid black;
}
.ojos::before,
.ojos3::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 60px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: #c99621;
}
.ojos::before {
  margin: 17px 3px;
}
.ojos3::before {
  margin: 17px 8px;
}
.iris,
.iris7 {
  position: absolute;
  width: 63px;
  height: 77px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: black;
  margin: 0 14px;
}
.iris {
  -webkit-transform: rotate(-12deg);
  transform: rotate(-12deg);
}
.iris7 {
  -webkit-transform: rotate(12deg);
  transform: rotate(12deg);
}
.iris::before,
.iris7::before {
  content: '';
  position: absolute;
  width: 35px;
  height: 50px;
  border-radius: 100%;
  background: white;
}
.iris::before {
  -webkit-transform: rotate(33deg);
  transform: rotate(33deg);
  margin: 0px 5px;
}
.iris7::before {
  -webkit-transform: rotate(-33deg);
  transform: rotate(-33deg);
  margin: 0px 23px;
}
.iris3,
.iris9 {
  position: absolute;
  width: 14px;
  height: 12px;
  border-radius: 100%;
  background: white;
  margin: 62px 30px;
}
.iris3::before,
.iris9::before {
  content: '';
  position: absolute;
  width: 80px;
  height: 35px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  opacity: 0.3;
  background: #937b54;
}
.iris3::before {
  margin: -60px -30px;
  -webkit-transform: rotate(33deg);
  transform: rotate(33deg);
}
.iris9::before {
  margin: -60px -49px;
  -webkit-transform: rotate(-33deg);
  transform: rotate(-33deg);
}
.boca {
  position: absolute;
  width: 21px;
  height: 21px;
  border-radius: 100%;
  background: #eaeaea;
  margin: 152px 95px;
  -webkit-animation: go7 2.1s alternate infinite;
  animation: go7 2.1s alternate infinite;
}
.boca::before {
  content: '';
  position: absolute;
  width: 21px;
  height: 21px;
  border-radius: 100%;
  background: #eaeaea;
  margin: 0px 21px;
}
.boca3 {
  position: absolute;
  width: 18px;
  height: 16px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: #8c4b59;
  margin: 145px 107px;
}
.boca7 {
  position: absolute;
  width: 21px;
  height: 12px;
  border-radius: 0 0 21px 21px;
  background: #8c4b59;
  border: 1px solid black;
  margin: 162px 105px;
}
.cejas {
  position: absolute;
  width: 25px;
  height: 12px;
  border-radius: 100%;
  background: black;
  margin: 50px 35px;
  -webkit-transform: rotate(-21deg);
  transform: rotate(-21deg);
}
.cejas::before {
  content: '';
  position: absolute;
  width: 25px;
  height: 12px;
  border-radius: 100%;
  background: black;
  margin: 50px 125px;
  -webkit-transform: rotate(42deg);
  transform: rotate(42deg);
}
.cejas3,
.cejas7 {
  position: absolute;
  width: 21px;
  height: 21px;
  border-radius: 100%;
}
.cejas3 {
  border-bottom: 5px solid black;
  margin: 63px 12px;
}
.cejas7 {
  border-bottom: 5px solid black;
  margin: 63px 195px;
}
.cejas3::before,
.cejas7::before {
  content: '';
  position: absolute;
  width: 21px;
  height: 21px;
  border-radius: 100%;
  border-bottom: 5px solid black;
}
.cejas3::before {
  margin: 9px -3px;
  -webkit-transform: rotate(-30deg);
  transform: rotate(-30deg);
}
.cejas7::before {
  margin: 9px 0px;
  -webkit-transform: rotate(21deg);
  transform: rotate(21deg);
}
.bigotes,
.bigotes3 {
  position: absolute;
  width: 35px;
  height: 1px;
  background: black;
  -webkit-animation: go7 2.1s alternate infinite;
  animation: go7 2.1s alternate infinite;
}
.bigotes {
  margin: 162px 73px;
}
.bigotes3 {
  margin: 162px 123px;
}
.bigotes::before,
.bigotes3::before {
  content: '';
  position: absolute;
  width: 35px;
  height: 1px;
  background: black;
}
.bigotes::before {
  margin: 7px 3px;
  -webkit-transform: rotate(-21deg);
  transform: rotate(-21deg);
}
.bigotes3::before {
  margin: 7px -3px;
  -webkit-transform: rotate(21deg);
  transform: rotate(21deg);
}
.body5 {
  position: absolute;
  width: 95px;
  height: 95px;
  border-radius: 100%;
  background: #f4b09f;
  margin: 80px -21px;
}
.body7 {
  position: absolute;
  width: 60px;
  height: 102px;
  border-radius: 100%;
  background: #b94535;
  margin: 77px -45px;
}
.body7::before {
  content: '';
  position: absolute;
  width: 65px;
  height: 102px;
  border-radius: 100%;
  background: #b94535;
  margin: 0px 105px;
}
.legs,
.legs3 {
  position: absolute;
  width: 90px;
  height: 150px;
  border-top: 40px solid #e4393c;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-radius: 100px / 100px;
}
.legs {
  -webkit-transform: rotate(85deg);
  transform: rotate(85deg);
  margin: 30px -75px;
}
.legs3 {
  -webkit-transform: rotate(-85deg);
  transform: rotate(-85deg);
  margin: 30px -12px;
}
.legs::before,
.legs3::before {
  content: '';
  position: absolute;
  width: 33px;
  height: 50px;
  border-radius: 100%;
  background: #e4393c;
}
.legs::before {
  margin: -21px 77px;
}
.legs3::before {
  margin: -21px -19px;
}
.legs7::before {
  content: '';
  position: absolute;
  width: 33px;
  height: 21px;
  border-radius: 0 0 50px 50px;
  background: #cc9666;
  margin: 1px 87px;
}
.cola {
  position: absolute;
  width: 25px;
  height: 125px;
  border-radius: 30px;
  background: #e4393c;
  margin: 50px -55px;
  -webkit-transform: rotate(-21deg);
  transform: rotate(-21deg);
}
.cola3 {
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: #e4393c;
  border-right: 1px solid gray;
  margin: 50px -90px;
  -webkit-animation: go3 3s alternate infinite;
  animation: go3 3s alternate infinite;
}
.r1,
.r2,
.r3 {
  position: absolute;
  width: 7px;
  height: 35px;
  border-radius: 3px;
  background: black;
}
.r1 {
  margin: 3px 93px;
}
.r2 {
  margin: 5px 112px;
}
.r3 {
  margin: 3px 132px;
}
.r4,
.r5,
.r6,
.r7,
.r8 {
  position: absolute;
  width: 21px;
  height: 5px;
  border-radius: 3px;
  background: black;
}
.r4 {
  margin: 70px 9px;
}
.r5 {
  margin: 70px 201px;
}
.r6 {
  margin: 50px 107px;
}
.r7 {
  margin: 162px 50px;
  -webkit-transform: rotate(-12deg);
  transform: rotate(-12deg);
}
.r8 {
  margin: 162px 162px;
  -webkit-transform: rotate(12deg);
  transform: rotate(12deg);
}
.ray {
  position: absolute;
  width: 21px;
  height: 12px;
  border-top: 3px solid black;
  border-bottom: 3px solid black;
  margin: 45px 50px;
  z-index: 333;
}
.ray::before {
  content: '';
  position: absolute;
  width: 9px;
  height: 21px;
  border-radius: 100%;
  border-left: 3px solid black;
  margin: -30px -80px;
  -webkit-transform: rotate(50deg);
  transform: rotate(50deg);
  z-index: 333;
}
.ray::after {
  content: '';
  position: absolute;
  width: 9px;
  height: 21px;
  border-radius: 100%;
  border-left: 3px solid black;
  margin: -45px -85px;
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
  z-index: 333;
}
.ray3,
.ray5 {
  position: absolute;
  width: 33px;
  height: 30px;
  border-radius: 100%;
  border-top: 5px solid black;
  z-index: 777;
}
.ray3 {
  margin: 121px -16px;
}
.ray5 {
  margin: 121px 65px;
}
.ray3::before,
.ray5::before {
  content: '';
  position: absolute;
  width: 33px;
  height: 30px;
  border-radius: 100%;
  border-top: 5px solid black;
  z-index: 777;
}
.ray3:after,
.ray5::after {
  content: '';
  position: absolute;
  width: 21px;
  height: 9px;
  border-radius: 100%;
  border-top: 5px solid black;
  z-index: 777;
}
.ray3::before {
  margin: 12px 0px;
}
.ray3::after {
  margin: 9px -25px;
}
.ray5::before {
  margin: 12px 0px;
}
.ray5::after {
  margin: 9px 37px;
}

@-webkit-keyframes go {
  0% {
    -webkit-transform: translatex(0px) translatey(0px);
    transform: translatex(0px) translatey(0px);
  }
  100% {
    -webkit-transform: translatex(3px) translatey(3px);
    transform: translatex(3px) translatey(3px);
  }
}

@keyframes go {
  0% {
    -webkit-transform: translatex(0px) translatey(0px);
    transform: translatex(0px) translatey(0px);
  }
  100% {
    -webkit-transform: translatex(3px) translatey(3px);
    transform: translatex(3px) translatey(3px);
  }
}
@-webkit-keyframes go3 {
  0% {
    -webkit-transform: translatex(0px) translatey(0px) scale(1);
    transform: translatex(0px) translatey(0px) scale(1);
  }
  100% {
    -webkit-transform: translatex(-3px) translatey(-12px) scale(0.9);
    transform: translatex(-3px) translatey(-12px) scale(0.9);
  }
}
@keyframes go3 {
  0% {
    -webkit-transform: translatex(0px) translatey(0px) scale(1);
    transform: translatex(0px) translatey(0px) scale(1);
  }
  100% {
    -webkit-transform: translatex(-3px) translatey(-12px) scale(0.9);
    transform: translatex(-3px) translatey(-12px) scale(0.9);
  }
}
@-webkit-keyframes go7 {
  0% {
    -webkit-transform: translatey(0px);
    transform: translatey(0px);
  }
  100% {
    -webkit-transform: translatey(-5px);
    transform: translatey(-5px);
  }
}
@keyframes go7 {
  0% {
    -webkit-transform: translatey(0px);
    transform: translatey(0px);
  }
  100% {
    -webkit-transform: translatey(-5px);
    transform: translatey(-5px);
  }
}
@-webkit-keyframes cerrar {
  0%,
  25% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes cerrar {
  0%,
  25% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>