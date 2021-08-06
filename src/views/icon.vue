<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-05 09:45:21
 * @FilePath: /vue-shelf/src/views/icon.vue
-->
<template>
  <div class="">
    <Timer v-model="asaaaaaaaaa" color=""></Timer>
    <template v-for="(list, index) in timeList">
      <div class="item-text pt8 pb8 pl25 pr25 mt12" v-for="(item, key) in list" :key="`${index}-${key}`">
        <span class="mr10">
          <span>周</span>
          <span>{{ index | day }}</span>
        </span>
        <span>
          <span>{{ item.start }}</span>
          <span>-</span>
          <span>{{ item.end }}</span>
        </span>
      </div>
    </template>
    <div class="box p10">
      <IconFont type="icon-qianmingguanli" fill="red" data-active="green" active="green" size="20"></IconFont>
    </div>
    <Preview doMain="https://dss2.bdstatic.com" src="/lfoZeXSm1A5BphGlnYG/skin/749.jpg?2" width="100" radius="8" :height="200"></Preview>
    <br />
    <pre>{{ asaaaaaaaaa }}</pre>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Preview from '@/components/Preview/image';
import Timer from '@/components/timer';
import MultipleCheckbox from '@/components/multiple-checkbox';
import format from '@/components/timer/format';
export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: { Preview, Timer, MultipleCheckbox },
  props: {},
  //这里存放数据
  data() {
    return {
      asaaaaaaaaa: '',
    };
  },
  filters: {
    day: function (index) {
      return ['一','二','三','四','五','六','日'][index];
    },
  },
  //监听属性 类似于data概念
  computed: {
    timeList() {
      return format(this.asaaaaaaaaa);
    }
  },
  //监控data中的数据变化
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {},
  //方法集合
  methods: {
    
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
  width: 200px;
  height: 100px;
  background: pink;
  margin-left: 500px;
  margin-top: 200px;
}
</style>