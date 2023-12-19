<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023/10/20 3:24 PM
 * @FilePath: src/views/imgsort/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023/10/20 3:24 PM
-->
<template>
  <div class="hmax">
    <el-button @click="wave">方案1</el-button>
    <el-button @click="line">方案2</el-button>
    <el-button @click="corssLine">方案3</el-button>
    <el-button @click="corssWave">方案4</el-button>
    <div class="box" ref="box">
      <img v-for="(item, index) in imgList" :key="index" :src="item" alt="">
    </div>
  </div>
</template>

<script>
import img from './bg.jpg';

let imgList = []
for (let i = 0; i < 50; i++) {
  imgList.push(img);
}

class Curve {
  constructor(curveFunc, xRange, yRange) {
    this.curveFunc = curveFunc;
    this.xRange = xRange;
    this.yRange = yRange;
  }

  getY(x) {
    let y = this.curveFunc(x);
    if (x < this.xRange[0]) {
      y = this.curveFunc(this.xRange[0])
    } else if (x > this.xRange[1]) {
      y = this.curveFunc(this.xRange[1])
    }

    if (y < this.yRange[0]) {
      y = this.yRange[0]
    }
    if (y > this.yRange[1]) {
      y = this.yRange[1]
    }
    return y
  }
}

function layout(curve, doms, width, height) {
  const [xmin, xmax] = curve.xRange;
  const [ymin, ymax] = curve.yRange;

  const cx = (xmin + xmax) / 2;
  const cy = (ymin + ymax) / 2;

  const scaleX = width / (xmax - xmin);
  const scaleY = height / (ymin - ymax);

  const step = (xmax - xmin) / doms.length;
  for (let i = 0; i < doms.length; i++) {
    const dom = doms[i];
    const x = xmin + i * step;
    const y = curve.getY(x);

    const dx = (x - cx) * scaleX;
    const dy = (y - cy) * scaleY;

    dom.style.setProperty('--dx', dx + 'px');
    dom.style.setProperty('--dy', dy + 'px');
  }
}

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  computed: {},
  data() {
    return {
      imgList: imgList
    };
  },
  watch: {},
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
    let num = 0
    let arr = ['wave', 'line', 'corssLine', 'corssWave']
    // setInterval(() => {
    //   if (num >= 3) {
    //     num = 0
    //   }
    //   this[arr[num]]();
    //   num++;
    // }, 2000)
  },
  methods: {
    wave() {
      const doms = document.querySelectorAll('img');
      const container = this.$refs.box;
      const wave = new Curve(x => Math.sin(x), [0, Math.PI * 3], [-1, 1]);
      layout(wave, doms, container.clientWidth - 100, container.clientHeight / 2);
    },
    line() {
      const doms = document.querySelectorAll('img');
      const container = this.$refs.box;
      const line = new Curve(x => 1, [0, 1], [0, 2]);
      layout(line, doms, container.clientWidth - 100, container.clientHeight / 2);
    },
    corssLine() {
      const doms = document.querySelectorAll('img');
      const container = this.$refs.box;
      const curve1 = new Curve(x => x, [-1, 1], [-1, 1]);
      const curve2 = new Curve(x => -x, [-1, 1], [-1, 1]);
      const midIndex = Math.floor(doms.length / 2);
      const doms1 = Array.from(doms).slice(0, midIndex);
      const doms2 = Array.from(doms).slice(midIndex);
      layout(curve1, doms1, container.clientWidth - 100, container.clientHeight / 2);
      layout(curve2, doms2, container.clientWidth - 100, container.clientHeight / 2);
    },
    corssWave() {
      const doms = document.querySelectorAll('img');
      const container = this.$refs.box;
      const curve1 = new Curve(x => Math.sin(x), [0, Math.PI * 3], [-1, 1]);
      const curve2 = new Curve(x => -Math.sin(x), [0, Math.PI * 3], [-1, 1]);
      const midIndex = Math.floor(doms.length / 2);
      const doms1 = Array.from(doms).slice(0, midIndex);
      const doms2 = Array.from(doms).slice(midIndex);
      layout(curve1, doms1, container.clientWidth - 100, container.clientHeight / 3);
      layout(curve2, doms2, container.clientWidth - 100, container.clientHeight / 3);
    }
  },
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
:root {

}

.box {
  height: 100%;
  background: #000;
  position: relative;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    --dx: 0px;
    --dy: 0px;
    top: calc(50% - var(--dy));
    left: calc(50% + var(--dx));
    transition: 1s;
  }


}
</style>