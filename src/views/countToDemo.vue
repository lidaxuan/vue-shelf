<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-12-01 14:13:59
 * @FilePath: /vue-shelf/src/views/countToDemo.vue
-->
<template>
  <div class="" v-waterMarker="{text:'李大玄版权所有'}">
    <div v-separator="12312"></div>
    <div font="28" v-separator="num"></div>
    <div font="28" v-separator="11111112312.234"></div>
    <div font="28" v-separator="{ num: 234633.234 }"></div>
    <div font="28" v-separator="{ num: 11111112312.234, separator: '#@' }"></div>
    <div>
      <h3>simple example</h3>
      <pre class="box" style="background: #ccc">
          <code>
             &lt;CountTo
                ref="example1"
                class="example1"
                :start-val="<input v-focus v-model.number="obj1.startVal">" 开始数
                :end-val="<input v-model.number="obj1.endVal">" 结束数
                :duration="<input v-model.number="obj1.duration">" 时长 ms
                :autoplay="<el-switch v-model="obj1.autoplay" inactive-color="red"/>" 自动开始
                :decimals="<input v-model.number="obj1.decimals">" 保留几位小数
                :decimal="<input v-model="obj1.decimal">" 用什么分隔小数部分
                :separator="<input v-model="obj1.separator">" 千分位 符号
                :prefix="<input v-model="obj1.prefix">" 前缀
                :suffix="<input v-model="obj1.suffix">" 后缀
             /&gt;
          </code>
        </pre>
      <CountTo
        :key="getKey()"
        ref="example1"
        class="example1"
        :start-val="obj1.startVal"
        :end-val="obj1.endVal"
        :duration="obj1.duration"
        :autoplay="obj1.autoplay"
        :decimals="obj1.decimals"
        :decimal="obj1.decimal"
        :separator="obj1.separator"
        :prefix="obj1.prefix"
        :suffix="obj1.suffix"
        :useEasing="obj1.useEasing"
      ></CountTo>
      <el-button type="primary" class="example-btn" @click="start1">开始</el-button>
      <el-button type="primary" class="example-btn" @click="changeExampleEndVal">demo</el-button>
      <el-button type="primary" class="example-btn" @click="pauseResume">暂停/开启</el-button>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import CountTo from '@/components/count/countTo.vue';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    CountTo,
  },
  props: {},
  data() {
    return {
      num: 34365.234,
      obj1: {
        startVal: 2000,
        endVal: 10000,
        decimals: 0, // 小数点后几位
        duration: 2000,
        autoplay: false, // true  false
        decimal: '.', // 默认小数直接是不是 . 分隔
        separator: '', // 3位一分隔 默认 ,
        prefix: '今日完成', // 前缀
        suffix: '下', // h后缀
      },
      setStartVal: 0,
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
  mounted() {},
  methods: {
    getKey() {
      return Object.values(this.obj1).join('-');
    },
    changeExampleEndVal() {
      this.obj1.startVal = this.obj1.endVal;
      this.obj1.endVal = this.obj1.endVal + 1000;
    },
    start1() {
      this.$refs.example1.start();
    },
    pauseResume() {
      this.$refs.example1.pauseResume();
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

.box {
  display: inline-block;
  font-size: 22px;
  border: 10px solid pink;
  border-radius: 15px;
  input {
    font-size: 24px;
    width: 100px;
  }
}

.example1 {
  font-size: 40px;
  color: #30b08f;
  display: block;
  margin: 10px 0;
}

.pause-resume-btn {
  font-size: 20px;
  color: #e65d6e;
  background-color: #fff;
}

.pause-resume-btn:hover {
  background-color: #e65d6e;
  color: #fff;
  border-color: #e65d6e;
}
</style>