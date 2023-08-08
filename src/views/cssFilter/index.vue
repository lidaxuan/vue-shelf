<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2023-08-08 17:19:34
 * @FilePath: /vue-shelf/src/views/cssFilter/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-08-08 18:01:58
-->
<template>
  <div class="">
    <input type="text" v-model="logo" />
    <svg view-box="0 0 600 600">
      <defs>
        <filter id="conform">
          <feimage x="0" y="0" width="100%" height="100%" href="./1.webp" preserve-aspect-ratio="none" result="origin_image"></feimage>
          <feColorMatrix in="origin_image" type="saturate" values="0" result="gary_image"></feColorMatrix>
        </filter>
      </defs>
      <image width="100%" height="100%" href="./1.webp" alt="" class="bg" preserve-aspect-ratio="none" />
      <text text-anchor="middle" alignment-baseline="middle" font-weight="700" class="text" x="50%" y="50%" font-size="80px" fill="#000">{{ logo }}</text>
    </svg>
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
      logo: "logo"
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
  methods: {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
svg {
  width: 500px;
  height: 500px;
}
.bg {
  width: 100%;
  height: 100%;
}
.text {
}
</style>
