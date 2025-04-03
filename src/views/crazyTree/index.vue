<template>
  <div class="box">
    <canvas id="canvas" style="width: 300px; height: 500px"></canvas>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Main from './js/main'
export default {
  name:'',  // Pascal命名
  mixins: [],
  components: {},
  props: {},
  //import引入的组件需要注入到对象中才能使用
  //这里存放数据
  data() {
    return {
    
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {
  
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {
    new Main()
  },
  //方法集合
  methods: {
  
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.box {
  width: 100%;
  height: 100%;
}
#canvas {
  border: 1px solid red;
}
</style>