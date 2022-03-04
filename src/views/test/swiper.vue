<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-02-25 15:44:19
 * @FilePath: /vue-shelf/src/views/test/swiper.vue
-->
<template>
  <div class="">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- 如果需要滚动条 -->
      <div class="swiper-scrollbar"></div>
    </div>

    <div>
      <div class="flex" v-for="item in 9">
        <div v-for="item1 in item" class="mr20 mb10">
          {{ content(item, item1) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Swiper from 'swiper';
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
  mounted() {
    new Swiper('.swiper-container', {
      loop: true,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      // 如果需要滚动条
      scrollbar: '.swiper-scrollbar'
      //如果需要自动切换海报
      // autoplay: {
      //   delay: 1000,//时间 毫秒
      //   disableOnInteraction: false,//用户操作之后是否停止自动轮播默认true
      // },
    });
  },
  methods: {
    content(item, item1) {
      return `${item1} * ${item} = ${item * item1}`;
    }
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.swiper-container {
  height: 500px;
  width: 100%;
  .swiper-wrapper {
    .swiper-slide {
      width: 100%;
      height: 100%;
      background-color: #42b983;
      text-align: center;
      line-height: 500px;
    }
  }
}
</style>