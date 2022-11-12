<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 11:10:22
 * @FilePath: /vue-shelf/src/views/testLoading/compcopy.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 11:22:09
-->
<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 10:15:46
 * @FilePath: /vue-shelf/src/views/testLoading/comp.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 10:28:46
-->
<template>
  <div class="w300 h300 box"></div>
</template>

<script>

import loading from './loading';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {

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
  beforeCreate() { },
  created() {
    // .$emit
  },
  beforeMount() { },
  mounted() {
    const a = loading.cloading(this);
    setTimeout(() => {

      a.close()
    }, 2000);
  },
  methods: {

  },
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.box {
  background: rgb(189, 28, 54);
}
</style>