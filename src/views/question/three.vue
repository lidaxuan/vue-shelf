<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-11 11:33:37
 * @FilePath: /vue-shelf/src/views/question/three.vue
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
    var mat = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      target = 13;
    console.log(this.minimizeTheDifference(mat, target));
  },
  beforeMount() {},
  mounted() {},
  methods: {
    minimizeTheDifference(mat, target) {
      const row = mat.length,
        col = mat[0].length;
      let dp = new Set([0]);
      for (let i = 0; i < row; i++) {
        const tmp = new Set();
        for (let j = 0; j < col; j++) {
          dp.forEach((num) => {
            tmp.add(num + mat[i][j]);
          });
        }
        dp = tmp;
      }
      let ans = Infinity;
      dp.forEach((num) => {
        ans = Math.min(Math.abs(num - target), ans);
      });
      return ans;
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