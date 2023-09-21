<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023/8/12 11:13 AM
 * @FilePath: src/views/leetcode/6.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023/8/12 11:13 AM
-->
<template>
  <div class="">1
    <a href="https://leetcode.cn/problems/zigzag-conversion/description/" target="_blank">https://leetcode.cn/problems/zigzag-conversion/description/</a>
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
    return {};
  },
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {},
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
    parent.postMessage({asd: '我是子页面传递过来的数据'}, "*");
  },
  methods: {
    convert(s, numRows) {
      let arr = []
      for (let i = 0; i < numRows; i++) {
        arr.push([])
      }
      console.log(arr)
      let len = 0
      while (len == s.length) {
        s.split(len)
        len++
      }
    }
  },
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>