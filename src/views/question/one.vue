<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-11 10:24:19
 * @FilePath: /vue-shelf/src/views/question/one.vue
-->
<template>
  <div class="">
    输入：nums = [2,7,11,15], target = 9 输出：[0,1] 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
    <br />
  </div>
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
    // var nums = [2, 7, 11, 15],target = 9;
    var nums = [3, 2, 4],
      target = 6;
    console.log(this.twoSum(nums, target));
  },
  beforeMount() {},
  mounted() {},
  methods: {
    twoSum(nums, target) {
      let index = 0;
      while (index <= nums.length) {
        console.log(index);
        for (let i = 0; i < nums.length; i++) {
          if (index == i) {
            continue;
          }
          if (nums[index] + nums[i] == target) {
            return [index, i];
          }
        }
        index++;
      }
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