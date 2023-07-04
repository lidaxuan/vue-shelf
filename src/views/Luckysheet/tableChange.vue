<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2023-01-04 09:29:30
 * @FilePath: /vue-shelf/src/views/Luckysheet/tableChange.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-06-30 17:22:45
-->
<template>
  <div class="wmax hmax flex">
    <div class="h500" style="width: 48%">
      <el-button type="primary" @click="changeData">切换excel 数据</el-button>
      <Table class="tableComStyle" key="1" style="width: 100%" height="100%" :data="list" :tableColumnData="tableColumnData" ref="table">
        <template #handle="scope">
          <el-button type="text" @click="addAiUserTimeoutBtn(scope.row)">修改</el-button>
          <el-button type="text" @click="delTableItemBtn(scope.row)">删除</el-button>
        </template>
      </Table>
    </div>
    <div class="hmax" style="width: 50%">
      <LuckysheetComp ref="LuckysheetComp" :excelData="excelData"></LuckysheetComp>
    </div>
  </div>
</template>

<script>
import uuid from "uuid";
import LuckysheetComp from "./index";

export default {
  name: "", // Pascal命名
  mixins: [],
  components: { LuckysheetComp },
  props: {},
  data() {
    return {
      tableColumnData: [
        { width: "70px", label: "排序号", prop: "date", type: "index", fixed: "left" },
        { label: "动作", prop: "name", width: "150" },
        { label: "ID", prop: "id", showOverflowTooltip: true },
        { label: "aad阿萨德", prop: "aaaaa", showOverflowTooltip: true },
        { label: "b人挺好", prop: "bbbbb", showOverflowTooltip: true },
        { label: "c给我", prop: "c", showOverflowTooltip: true },
        { label: "d如何", prop: "d", showOverflowTooltip: true },
        { label: "数字", prop: "num", showOverflowTooltip: true }
        // { label: "e", prop: "e", showOverflowTooltip: true },
        // { label: "f", prop: "f", showOverflowTooltip: true },
        // { width: "100", label: "操作", prop: "desp", slotName: "handle" }
      ],
      list: [],
      excelData: {}
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
  created() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      const item = {
        name: `张三${i + 1}`,
        id: uuid(),
        aaaaa: `VR额GV${uuid()}`,
        bbbbb: `VR额GV${uuid()}`,
        c: `VR额GV${uuid()}`,
        d: `VR额GV${uuid()}`,
        num: parseInt(Math.random() * 10000)
        // e: `VR额GV${uuid()}`,
        // f: `VR额GV${uuid()}`
      };
      arr.push(item);
    }
    this.list = arr;
  },
  beforeMount() {},
  mounted() {},
  methods: {
    changeData() {
      const list = this.list;
      const tableColumnData = [].concat(this.tableColumnData);
      const header = tableColumnData.filter((item) => {
        if (item.width) {
          item.width = item.width.replace("px", "");
        }
        return !item.type;
      });
      const enumT = {
        number: "n",
        string: "g"
      };
      let celldata = [];
      for (let i = 0; i < header.length; i++) {
        celldata.push({
          r: 0,
          c: i,
          v: {
            m: header[i]["label"],
            v: header[i]["label"],
            ct: {
              fa: "General",
              t: enumT[typeof header[i]["label"]]
            }
          }
        });
      }
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        let index = 0;
        for (const key in item) {
          celldata.push({
            r: i + 1,
            c: index,
            v: {
              m: item[key],
              v: item[key],
              ct: {
                fa: "General",
                t: typeof item[key]
              }
            }
          });
          index = index + 1;
        }
      }
      const data = {
        name: "Sheet1",
        config: {
          merge: {}
        },
        chart: [],
        color: "", //工作表颜色
        index: 0, //工作表索引
        status: 1, //激活状态
        order: 0, //工作表的下标
        hide: 0, //是否隐藏
        row: this.list.length + 1, //行数
        column: header.length, //列数
        defaultRowHeight: 19, //自定义行高
        defaultColWidth: 73, //自定义列宽
        celldata
      };
      this.excelData = data;
      this.$nextTick(() => {
        this.$refs.LuckysheetComp.init();
      });
    }
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
