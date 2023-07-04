<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023-07-03 09:38:26
 * @FilePath: /vue-shelf/src/views/MultipleRenderingComponents/_compOutLine.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-07-03 09:38:26
-->
<template>
  <div class="wmax hmax">
    <iframe width="100%" height="100%" src="http://test-prd18.easyliao.net/eom-doc-web/index#/note"></iframe>
  </div>
</template>

<script>
export default {
  name: "", // Pascal命名
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
</style>
