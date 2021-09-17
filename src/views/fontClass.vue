<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-07 19:11:11
 * @FilePath: /vue-shelf/src/views/fontClass.vue
-->
<template>
  <div class="">
    1123123
    <i class="iconfont icon-tonghua"></i>
    <FictitiousList :data="list">
      <template #default="{ item, index }">
        <div :key="index" class="item" style="width: 100%">
          <!-- <template v-for="ele in 10"> -->
            <span class="ele" :style="`background: ${color16()}`">{{ index }}{{item}}</span>
          <!-- </template> -->
        </div>
      </template>
    </FictitiousList>
    <input type="text" v-model="value" @input="iptValue" />

    <!-- <div class="h300 overauto" style="background: pink">
      <div v-for="(item, index) in list" :key="index">
        {{item}}
      </div>
    </div> -->
    <hr />
    <!-- <div class="h400">
      <VirtualList
          :list-data="list"
          :estimated-item-size="100"
          v-slot="slotProps"
          class="h400"
      >
          <div class="context">
              {{ slotProps.item }}
          </div>
      </VirtualList>
    </div> -->
    
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import FictitiousList from './test/selectv2.vue';
import VirtualList from '@/components/VirtualList';

let arr = [];
for (let i = 0; i < 300000; i++) {
  arr.push({
    id: i,
    name: `苍天有井名为空${i}`,
  });
}

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    FictitiousList,
    VirtualList,
  },
  props: {},
  data() {
    return {
      list: arr,
      value: '',
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
    iptValue(val) {
      console.log(val);
      this.list[3].name = this.value;
    },
    color16() {
      //十六进制颜色随机
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    },
    handleScroll() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //如何计算滚动速度???
      //利用定时器，来计算滚动速度(滚动条在timeScale没有被连续滚动则结束间隔)
      let distance = 0,
        startTimer = null,
        beginTime = 0,
        speed = 0;
      const timeScale = 100; //检测滚动停止的时间
      window.onscroll = () => {
        let tempScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        distance += tempScrollTop - scrollTop; //间隔时间内滑动的距离（+向下，-向上）
        console.log('distance', distance);
        scrollTop = tempScrollTop; //下一次滚动开始时滚动条初始位置
        clearTimeout(startTimer); //清除开始定时器
        if (!beginTime) {
          beginTime = new Date().getTime(); //如果timer为0,则开始滚动,则获取起始时间
          //console.log(beginTime)
        }
        startTimer = setTimeout(() => {
          //设置开始定时器
          let overTime = new Date().getTime(); //延时500ms后，滚动后结束的时间
          //console.log(overTime)
          let diffTimer = (overTime - beginTime - timeScale) / 1000; //时间差 = 结束-开始-500ms
          speed = distance / diffTimer;
          distance = 0; //间隔距离归零
          beginTime = 0; //起始时间
          console.log('speed', speed);
        }, timeScale);
      };
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
.item {
  display: flex;
  justify-content: space-around;
}
.ele {
  display: inline-block;
  width: -webkit-fill-available;
}
</style>