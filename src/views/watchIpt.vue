<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-24 18:12:14
 * @FilePath: /vue-shelf/src/views/watchIpt.vue
-->
<template>
  <div class="">
    111
    <el-input v-model.number="one" @input="changeone" placeholder="11111111111"></el-input>
    <el-input v-model.number="two" @input="changetwo" placeholder="22222222222"></el-input>
    <span font="20">{{ result }}</span>
    <div class="w100 h100" v-if="flag" style="background: pink"></div>
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
    return {
      one: '',
      two: '',
      result: '',
      flag: false,
    };
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
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    changeone(e) {
      let time = null;
      clearTimeout(time);
      time = setTimeout(() => {
        if (!e) {
          this.result = '';
          return;
        }
        this.result = e / this.two;
        console.log(this.result);
        this.asd();
      }, 2000);
    },
    changetwo(e) {
      let time = null;
      clearTimeout(time);
      time = setTimeout(() => {
        if (!e) {
          this.result = '';
          return;
        }
        this.result = this.one / e;
        this.asd();
      }, 2000);
    },
    asd() {
      const str = String(this.result).indexOf('.');
      console.log(str);
      if (str != -1) {
        this.flag = true;
        return;
      }
      this.flag = false;
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