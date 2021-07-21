<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-07-15 11:13:46
 * @FilePath: /vue-shelf/src/views/test/optimization.vue
-->
<template>
  <div class="">
    {{ form }}
    <el-card>
      <el-form class="flex flex-aic">
        <select1 :label="1" v-model="form.val1"></select1>
        <select2 :key="`${form.val1}`" :label="2" v-model="form.val2"></select2>
        <select3 :key="`${form.val1}-${form.val2}`" :label="3" v-model="form.val3"></select3>
        <select4 :key="`${form.val1}-${form.val2}-${form.val3}`" :label="4" v-model="form.val4"></select4>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import select from './select';
const components = {};
for (let i = 1; i <= 104; i++) {
  const comp = {
    extends: select,
  };
  components[`select${i}`] = comp;
}
console.log(components);
export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {
    ...components,
  },
  props: {},
  //这里存放数据
  data() {
    return {
      form: {
        val1: '',
        val2: '',
        val3: '',
        val4: '',
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {},
  //方法集合
  methods: {},
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