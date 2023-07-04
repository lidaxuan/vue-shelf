<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023-07-03 09:22:26
 * @FilePath: /vue-shelf/src/views/MultipleRenderingComponents/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-07-03 09:42:07
-->
<template>
  <div class=" hmax" style="width: 220%">
    <el-button @click="fetchData">更新数据</el-button>
    <div class="flex flex-ccb hmax">
      <!--      <Table style="width: 60%" row-key="id" :tableData="formatterEntity.originalData" :tableColumnData="[].concat(tableColumnData, {width: '100', label: '操作', prop: 'desp', slotName: 'handle'})" />-->
      <Lucksheet style="width: 60%" ref="LuckysheetComp" @cellUpdated="cellUpdated" />
      <!--      <OutLine style="width: 100%" />-->
    </div>
  </div>
</template>

<script>
import Table from "./_compTable.vue";
import Lucksheet from "./_compLucksheet.vue";
import OutLine from "./_compOutLine.vue";
import luckysheetDemoUtil from './utils';
import uuid from "uuid";

export default {
  name: "", // Pascal命名
  mixins: [],
  components: {Table, Lucksheet, OutLine},
  props: {},
  data() {
    return {
      tableColumnData: [
        {width: "70px", label: "排序号", prop: "date", type: "index", fixed: "left"},
        {label: "动作", prop: "name", width: "150"},
        {label: "ID", prop: "id", showOverflowTooltip: true},
        {label: "aad阿萨德", prop: "aaaaa", showOverflowTooltip: true},
        {label: "b人挺好", prop: "bbbbb", showOverflowTooltip: true},
        {label: "c给我", prop: "c", showOverflowTooltip: true},
        {label: "d如何", prop: "d", showOverflowTooltip: true},
        {label: "数字", prop: "num", showOverflowTooltip: true},
        // { label: "e", prop: "e", showOverflowTooltip: true },
        // { label: "f", prop: "f", showOverflowTooltip: true },
        // {width: "100", label: "操作", prop: "desp", slotName: "handle"}
      ],
      list: [],
      formatterEntity: ''
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
  beforeCreate() {
  },
  created() {
    // .$emit
  },
  beforeMount() {
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    getItem(i) {
      return {
        name: `张三${i + 1}`,
        id: parseInt(Math.random() * 10000),
        aaaaa: `VR额GV${uuid()}`,
        bbbbb: `VR额GV${uuid()}`,
        c: `VR额GV${uuid()}`,
        d: `VR额GV${uuid()}`,
        num: parseInt(Math.random() * 10000)
        // e: `VR额GV${uuid()}`,
        // f: `VR额GV${uuid()}`
      };
    },
    fetchData() {
      let arr = [];
      for (let i = 0; i < 10; i++) {

        const item = this.getItem(100 + i);
        const item2 = this.getItem(200 + i);
        const item3 = this.getItem(300 + i);
        // const item4 = this.getItem(i);
        item.children = [item2];
        item2.children = [item3]
        // item3.children = [item4]
        arr.push(item);
      }
      // arr[1].children = [this.getItem(100)]
      // console.log(JSON.stringify(arr, null, 2))
      this.formatterEntity = new luckysheetDemoUtil.FormatterData(arr, this.tableColumnData);
      this.$refs.LuckysheetComp.init(this.formatterEntity);
    },
    cellUpdated(val) {
      this.formatterEntity.cellUpdated(val);
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
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
