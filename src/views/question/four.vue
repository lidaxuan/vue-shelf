<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-16 17:51:27
 * @FilePath: /vue-shelf/src/views/question/four.vue
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
    // let l1 = [9, 9, 9, 9, 9, 9, 9],
    //   l2 = [9, 9, 9, 9];
    let l1 = [2, 4, 3],
      l2 = [5, 6, 4];
    // let l1 = [0],
      // l2 = [0,1,'1'];
    console.log(this.addTwoNumbers(l1, l2));
  },
  beforeMount() {},
  mounted() {},
  methods: {
    addTwoNumbers(l1, l2) {
      l1 = [].concat(l1 || []);
      l2 = [].concat(l2 || []);
      const maxLength = Math.max(l1.length, l2.length);
      let arr = new Array();
      let ten = 0;
      for (let i = 0; i < maxLength; i++) {
        const sum = (Number(l1[i]) || 0) + (Number(l2[i]) || 0) + ten;
        if (sum >= 10) {
          let sumArr = String(sum).split('').reverse();
          arr.push(Number(sumArr[0]));
          ten = Number(sumArr[1]);
          if (i == maxLength - 1) {
            arr.push(Number(sumArr[1]));
          }
        } else {
          arr.push(sum);
        }
      }
      return arr;
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