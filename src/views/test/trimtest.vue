<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-07-05 21:41:25
 * @FilePath: /vue-shelf/src/views/test/trimtest.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-07-05 21:48:10
-->
<template>
  <div v-html="str" class="overauto w300 h300"></div>
</template>

<script>
import { str } from '../../new';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      str: ''
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
  mounted() {
    this.str = str.replace(/\s*/g, '');
  },
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
</style>
