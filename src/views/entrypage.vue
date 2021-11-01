<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-17 15:57:10
 * @FilePath: /vue-shelf/src/views/entrypage.vue
-->
<template>
  <div class="hmax">
    <!-- <div class="flex flex-aic flex-ccc">
      <button class="w100 h50" @click="change('List')">列表</button>
      <button class="w100 h50" @click="change('Table')">表格</button>
      <button class="w100 h50" @click="change('Dxw')">dxw</button>
      <button class="w100 h50" @click="change('inout')">淡出</button>
    </div> -->
    <!-- <component :is="active"></component> -->

    <!-- <br />
    <hr />
    <hr />

    <IconFont type="icon-yuyin"></IconFont>
    <IconFont type="icon-tonghua"></IconFont>
    <hr />
    <i class="icon iconfont icon-tonghua"></i>
    <i class="icon iconfont icon-yuyin"></i>
    <span class="icon iconfont icon-yuyin"></span>
    <hr />
    <i class="iconfont">&#xe615;</i>
    <i class="iconfont">&#xe748;</i>
    <i class="iconfont">&#xe733;</i>
    <i class="iconfont"></i>

    <hr />
    <hr />
    <hr />
    <IconFont type="icon-qianmingguanli"></IconFont>
    <i class="icon iconfont icon-feiyongtongji"></i>
    <i class="iconfont">&#xe65e;</i>

    <hr />
    <el-select v-model="value1" multiple class="ml100" placeholder="请选择" @change="selectChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    {{ value1 }} -->
    <div class="w100 h100" style="background: pink">1</div>
    <div class="mb10 w700 h100 ml100 button-lg" style="background: pink" v-waves="{ color: 'green', type: 'center', duration: 1000 }"></div>
    <div class="mb10 w700 h100 ml100 button-lg" style="background: pink" v-waves></div>
    <!-- <div class="mb10 w200 h100 ml100" style="background: pink" v-waves="{ color: 'black', type: 'hit', duration: 3000 }"></div> -->
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import List from './fontClass.vue';
import Table from './tableasd.vue';
import Dxw from './dxw.vue';
import Inout from './inout.vue';
import { reportExchange } from '@/model/share';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    List,
    Table,
    Dxw,
    Inout,
  },
  props: {},
  data() {
    return {
      active: 'Table',
      options: [
        { value: '全选', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' },
      ],
      value1: [],
      value2: [],
      Height: 250,
      tableData: [{ name: 111 }, { name: 111 }, { name: 111 }, { name: 111 }, { name: 111 }, { name: 111 }, { name: 111 }, { name: 111 }],
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    selectChange(val) {
      // console.log(val);
      // console.log(val.indexOf('全选') == -1 && val.length == this.options.length - 1);
      // 一个都没有 全选
      if (val.indexOf('全选') != -1 && val.length == 1) {
        this.value1 = this.options.map((item) => {
          return item.value;
        });
        return;
      }
      if (val.length == this.options.length - 1 && val[val.length - 1] == '全选') {
        return;
      }
      console.log(val[val.length - 1] != '全选' && val.length == this.options.length);
      if (val[val.length - 1] != '全选' && val.length == this.options.length) {
        this.value1 = [];
      }
      console.log(val);
      // if (val == '全选') {
      //   console.log(this.value1.length);
      //   if (!this.value2.length) {
      //     this.value2 = this.options.map((item) => {
      //       return item.value;
      //     });
      //     this.value1 = this.value2
      //   } else {
      //     this.value1 = [];
      //   }
      // }
      // if (val != '全选' && this.value1.length == this.options.length) {
      //   for (let i = 0; i < this.value1.length; i++) {
      //     if (this.value1[i] == '全选') {
      //       this.value1.splice(i, 1);
      //     }
      //   }
      // }
    },
    getdata() {
      reportExchange()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    change(name) {
      this.active = name;
    },
    // getColor();
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
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}


</style>
<style scoped>

.button-lg {
  position: relative;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: all 0.1s ease;
}

.button-lg:before, .button-lg:after {
    content: "";
    position: absolute;
    border-radius: 20px;
    top: -2px;
    left: -2px;
    background: linear-gradient( 45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000 );
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -1;
    animation: animate 20s linear infinite;
}

.button-lg:after {
    filter: blur(20px);
}

@keyframes animate {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 300% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>