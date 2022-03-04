<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-03-02 15:44:53
 * @FilePath: /vue-shelf/src/components/viewComp.vue
-->
<template>
  <div class="">
    <div class="flex flex-ccc">
      <template v-for="item in config.queryform.form">
        <!-- {{ item }} -->
        <div :is="`el-${item.compName}`" v-model="config.queryform.search[item.model]" style="width: 300px" v-bind="item"></div>
        <br />
      </template>
      <button @click="$emit('asdasd', '内部事件')">11</button>
    </div>
    {{ config.tableConfig.isPage }}
    <div class="p40">
      <Table
      :config="config"
        :slotArr="config.tableConfig.slotArr"
        :isPage="config.tableConfig.isPage"
        :pageNumber="config.tableConfig.page"
        :pageSize="config.tableConfig.size"
        :totalNumber="config.tableConfig.total"
        :data="config.tableConfig.tableData"
        :tableColumnData="config.tableConfig.tableColumnData"
      >
        <template #name="scope">
          {{ scope.row.name }}
        </template>
      </Table>
    </div>
    <link rel="stylesheet" href="./one.css" />
    <link rel="stylesheet" href="./tow.css" />
  </div>
</template>

<script>
import Template from '../Template.vue';
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: { Template },
  props: {
    config: Object,
    search: Object
  },
  data() {
    return {};
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
  mounted() {
    // console.log(this.config.queryform.search);
    // this.search = this.config.queryform.search;
  },
  methods: {},
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>