<template>
  <div class="box">
    <canvas id="Mycanvas" width="100%" height="100%"></canvas>
    <i class="iconfont configIcon icon-D1-A6"></i>
<!--    <img src="../../assets/images/1.jpg" width="400" height="200" alt="">-->
<!--    <div class="topText">本网址仅供学习,禁止传播,如有侵权请24小时联系我</div>-->
<!--    <span class="centerText">本片由 <span class="lim">wwww.easyliao.com</span> 独家提供</span>-->
<!--    <span class="bottomRight">最新网址</span>-->
  </div>
</template>

<script>
import Main from './js/main'
export default {
  name:'',  // Pascal命名
  mixins: [],
  components: {},
  props: {},
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
    // window.addEventListener('resize', this.handleResize);
    this.handleResize()
  },
  //方法集合
  methods: {
    handleResize() {
      var canvas = document.getElementById("Mycanvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      new Main("Mycanvas")
    }
  }
}
</script>
<style lang='scss' scoped>sh
//@import url(); 引入公共css类

.box {
  width: 100%;
  height: 100%;
  .configIcon {
    position: fixed;
    top: 50px;
    left: 50px;
    font-size: 48px;
  }
}
.topText {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  font-size: 20px;
  color: #ffd669;
  font-weight: bold;
}
.centerText {
  position: fixed;
  top: 120px;
  left: 0;
  //transform: translate(-50%, 0);
  text-align: center;
  font-size: 20px;
  color: #ffd669;
  font-weight: bold;
  .lim {
    font-size: 16px;
    color: red;
  }
}
.bottomRight {
  position: fixed;
  top: 160px;
  right: 40px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
</style>
