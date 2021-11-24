<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-16 18:35:30
 * @FilePath: /vue-shelf/src/views/question/five.vue
-->
<template>
  <div class=""></div>
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
    //   handler(newVal, oldVal) {
    //   },
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {},
  created() {
    let s1 = 'abcabcbb';
    let s2 = 'bbbbb';
    let s3 = 'pwwkew';
    let s4 = '';
    console.log(this.lengthOfLongestSubstring(s1));
    console.log(this.lengthOfLongestSubstring(s2));
    console.log(this.lengthOfLongestSubstring(s3));
    console.log(this.lengthOfLongestSubstring(s4));
  },
  beforeMount() {},
  mounted() {},
  methods: {
    lengthOfLongestSubstring(s) {
      let obj = {};
      if (!s.length) {
        return 0;
      }
      let arr = s.split('');
      for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = obj[arr[i]] ? (obj[arr[i]] += 1) : 1;
      }
      // console.log(Math.max(Object.values(obj)));
      return Math.max(...Object.values(obj));
    },
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