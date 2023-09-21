<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023/8/26 9:28 AM
 * @FilePath: src/views/docMath/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023/8/26 9:28 AM
-->
<template>
  <div class="">
    <canvas></canvas>
  </div>
</template>

<script>
import drawBackgroundImageToCanvas from './test1';
import img from '@/assets/arr.png'

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
  mounted() {

    let width = 500
    let height = 500

    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    var ctx = canvas.getContext("2d");
    drawBackgroundImageToCanvas(ctx, width, height, img, {
      backgroundRepeat: 'repeat-y',
      backgroundSize: '60%',
      backgroundPosition: 'center center'
    }, (e) => {
      console.log(e)
      document.body.appendChild(e)
    })
  },
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
//@import url(); 引入公共css类

</style>