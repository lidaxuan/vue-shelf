<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-17 15:57:10
 * @FilePath: /vue-shelf/src/views/entrypage.vue
-->
<template>
  <div class="">
    <div class="flex flex-aic flex-ccc">
      <button class="w100 h50" @click="change('List')">列表</button>
      <button class="w100 h50" @click="change('Table')">表格</button>
      <button class="w100 h50" @click="change('Dxw')">dxw</button>
    </div>
    <br />
    <hr />
    <component :is="active"></component>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import List from './fontClass.vue';
import Table from './tableasd.vue';
import Dxw from './dxw.vue'

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    List,
    Table,
    Dxw
  },
  props: {},
  data() {
    return {
      active: 'Table',
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
    change(name) {
      this.active = name;
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