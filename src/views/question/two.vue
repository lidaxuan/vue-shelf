<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-11 10:47:53
 * @FilePath: /vue-shelf/src/views/question/two.vue
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
    var nums = [1, 0], // [1,3,,4,3,5,5,4,6,4,75,67,56,8,]
      target = 0;
    console.log(this.searchRange(nums, target));
  },
  beforeMount() {},
  mounted() {},
  methods: {
    searchRange(nums, target) {
      const errorarr = [-1, -1];
      if (!nums.length) {
        return errorarr;
      }
      var left = 0;
      var right = nums.length - 1;
      while (left <= right) {
        if (left > right) {
          return errorarr;
        }
        if (nums[left] != target && nums[right] != target) {
          left++;
          right--;
        } else if (nums[left] == target && nums[right] != target) {
          right--;
        } else if (nums[left] != target && nums[right] == target) {
          left++;
        } else if (nums[left] == target && nums[right] == target) {
          return [left, right];
        }
      }
      return errorarr;
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