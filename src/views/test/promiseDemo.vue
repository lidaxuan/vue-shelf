<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-02-14 10:45:36
 * @FilePath: /vue-shelf/src/views/test/promiseDemo.vue
-->
<template>
  <div class="">1</div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      time: 0
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
    let num1 = 22;
    let num2 = num1;
    num1 = 23;
    console.log(num2);
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('aaa');
      }, 5000);
    });
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('bbb');
      }, 2000);
    });
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ccc');
      }, 1000);
    });

    var times = setInterval(() => {
      this.time += 1;
      console.log(this.time);
    }, 1000);
    Promise.race([p3, p1, p2])
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        clearInterval(times);
        times = null;
      });
  },
  methods: {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>