<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-04-06 14:31:30
 * @FilePath: /vue-shelf/src/views/Luckysheet/index.vue
-->
<template>
  <div class="wmax hmax">
    <el-button class="btn" @click="getData">获取表格数据</el-button>
    <div id="luckysheet" style="margin: 0px; padding: 0px; width: 100%; height: 100%; left: 0px; top: 0px"></div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import _ from "lodash";
import luckysheetDemoUtil from "./utils";
import sheetPivotTableData from "./demoData/sheetPivotTableData";

export default {
  name: "", // Pascal命名
  mixins: [],
  components: {},
  props: {
    ops: {
      default: () => {
        return {
          title: "",
          data: []
        };
      }
    },
    excelData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      optionSheet: {},
      sheetfiles: []
    };
  },
  computed: {},
  watch: {
    excelData: {
      handler(newVal, oldVal) {
        if (Object.keys(newVal).length) {
          // this.init();
        }
      },
      deep: true, // 深度
      immediate: true // 立即执行
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // var options = {
    //   container: 'luckysheet', //luckysheet为容器id
    //   title: 'LDX',
    //   lang: 'zh',
    //   logo: ''
    // };
    // luckysheet.create(options);
    this.init();
  },
  methods: {
    init() {
      let lang = luckysheetDemoUtil.language() === "zh" ? "zh" : "en";
      let isShare = luckysheetDemoUtil.getRequest().share; // '?share=1' opens the collaborative editing mode
      let gridKey = luckysheetDemoUtil.getRequest().gridKey; // workbook id for collaborative editing, or directly define here
      const optionSheet = {
        container: this.container || "luckysheet", //luckysheet为容器id
        lang: lang, //中文
        title: "李大玄", //表 头名
        loading: {
          image: () => {
            return `<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg>`;
          },
          imageClass: "loadingAnimation"
        },
        // cellRightClickConfig: {
        //   customs: [
        //     {
        //       title: "test",
        //       onClick: function (clickEvent, event, params) {
        //         console.log("function test click", clickEvent, event, params);
        //       }
        //     }
        //   ]
        // },
        index: "0", //工作表索引
        status: "1", //激活状态
        order: "0", //工作表的顺序
        hide: "0", //是否隐藏
        // column: 10, //列数
        // row: 30, //行数
        color: "red",
        showtoolbar: true, //是否显示工具栏
        showinfobar: true, //是否显示顶部信息栏
        showsheetbar: true, //是否显示底部sheet按钮 -------
        allowEdit: true, //是否允许前端编辑
        // functionButton: (function () {
        //   var temp = new YHCore().getFunctionTemplate(templateButton);
        //   return temp;
        // })(),

        frozen: [{ type: "row" }],
        //--------------------
        allowUpdate: true,
        loadUrl: "",
        updateUrl: "ws://xxxx",
        //--------------------
        // data: luckysheetDemoUtil.getFiles([]),
        cellRightClickConfig: {
          //自定义配置单元右键菜单
          copy: true, // 复制
          copyAs: true, // 复制为
          paste: true, // 粘贴
          insertRow: true, // 插入行insert row
          insertColumn: true, // 插入列insert column
          deleteRow: true, // 删除选中行的数据 delete the selected row
          deleteColumn: true, // 删除选中列的数据delete the selected column
          deleteCell: false, // delete cell
          hideRow: true, // hide the selected row and display the selected row
          hideColumn: true, // hide the selected column and display the selected column
          rowHeight: true, // 设置行高
          columnWidth: true, // 设置行宽
          clear: true, // 清空选定内容clear content
          matrix: false, //矩阵 matrix operation selection
          sort: false, // 排序sort selection
          filter: false, //筛选 filter selection
          chart: false, //图表生成 chart generation
          image: false, //插入图片 insert picture
          link: false, // 插入连接，比如网址之类insert link
          data: false, //数据校验 data verification
          cellFormat: false //设置单元格格式，锁定单元格格式，隐藏公示等 Set cell format
        },
        hook: {
          cellDragStop: function (cell, postion, sheetFile, ctx, event) {
            // console.info(cell, postion, sheetFile, ctx, event);
          },
          rowTitleCellRenderBefore: function (rowNum, postion, ctx) {
            // console.log(rowNum);
          },
          rowTitleCellRenderAfter: function (rowNum, postion, ctx) {
            // console.log(ctx);
          },
          columnTitleCellRenderBefore: function (columnAbc, postion, ctx) {
            // console.log(columnAbc);
          },
          columnTitleCellRenderAfter: function (columnAbc, postion, ctx) {
            // console.log(postion);
          },
          cellRenderBefore: function (cell, postion, sheetFile, ctx) {
            // console.log(cell,postion,sheetFile,ctx);
          },
          cellRenderAfter: function (cell, postion, sheetFile, ctx) {
            // console.log(postion);
          },
          cellMousedownBefore: function (cell, postion, sheetFile, ctx) {
            // console.log(postion);
          },
          cellMousedown: function (cell, postion, sheetFile, ctx) {
            // console.log(sheetFile);
          },
          sheetMousemove: function (cell, postion, sheetFile, moveState, ctx) {
            // console.log(cell,postion,sheetFile,moveState,ctx);
          },
          sheetMouseup: function (cell, postion, sheetFile, moveState, ctx) {
            // console.log(cell,postion,sheetFile,moveState,ctx);
          },
          cellAllRenderBefore: function (data, sheetFile, ctx) {
            // console.info(data,sheetFile,ctx)
          },
          updated: function (operate) {
            // console.info(operate)
          },
          cellUpdateBefore: function (r, c, value, isRefresh) {
            // console.info('cellUpdateBefore',r,c,value,isRefresh)
          },
          cellUpdated: function (r, c, oldValue, newValue, isRefresh) {
            // console.info('cellUpdated',r,c,oldValue, newValue, isRefresh)
          },
          sheetActivate: function (index, isPivotInitial, isNewSheet) {
            // console.info(index, isPivotInitial, isNewSheet)
          },
          rangeSelect: function (index, sheet) {
            // console.info(index, sheet)
          },
          commentInsertBefore: function (r, c) {
            // console.info(r, c)
          },
          commentInsertAfter: function (r, c, cell) {
            // console.info(r, c, cell)
          },
          commentDeleteBefore: function (r, c, cell) {
            // console.info(r, c, cell)
          },
          commentDeleteAfter: function (r, c, cell) {
            // console.info(r, c, cell)
          },
          commentUpdateBefore: function (r, c, value) {
            // console.info(r, c, value)
          },
          commentUpdateAfter: function (r, c, oldCell, newCell) {
            // console.info(r, c, oldCell, newCell)
          },
          cellEditBefore: function (range) {
            // console.info(range)
          },
          workbookCreateAfter: function (json) {
            // console.info(json)
          },
          rangePasteBefore: function (range, data) {
            // console.info('rangePasteBefore',range,data)
            // return false; //Can intercept paste
          }
        }
      };

      // this.optionSheet.loading = {
      //   image: () => {
      //     return `<svg viewBox="25 25 50 50" class="circular">
      // 		<circle cx="50" cy="50" r="20" fill="none"></circle>
      // 		</svg>`;
      //   },
      //   imageClass: "loadingAnimation"
      // };
      this.optionSheet.cellRightClickConfig = {
        customs: [
          {
            title: "test",
            onClick: function (clickEvent, event, params) {
              console.log("function test click", clickEvent, event, params);
            }
          }
        ]
      };
      const data = luckysheetDemoUtil.getFiles([]);
      optionSheet.data = data;
      // optionSheet.data = [sheetPivotTableData];
      // optionSheet.data = [this.excelData];
      luckysheet.create(optionSheet);
    },
    /**
     * 点击获取表格中的json数据，用于存放数据库
     */

    getData() {
      let sheetfiles = luckysheet.getLuckysheetfile(); //获取第一个表格的数据
      for (let i = 0; i < sheetfiles.length; i++) {
        sheetfiles[i].celldata = luckysheet.transToCellData(sheetfiles[i].data); //转换数据格式，存储表格数据，便于详情展示
      }
      this.sheetfiles = [].concat(sheetfiles);

      const luckysheetData = luckysheet.getluckysheetfile();
      console.log("luckysheetData", luckysheet.getSheetData());
      let data = luckysheet.getSheetData();
      data = data.filter((item) => {
        if (_.compact(item).length) {
          return item;
        }
      });
      console.log("data", data);
      console.log("luckysheetData", luckysheetData);
      console.log(_.compact(luckysheetData[0].data.flat(Infinity)));
      // console.log(this.ops.data);
      // this.$emit('evs', {
      //   eventName: 'getOnJson',
      //   arguments: {
      //     jsonData: this.ops.data
      //   }
      // });
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
.btn {
  position: fixed;
  z-index: 1111111;
}

@keyframes loading-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

.loadingAnimation {
  width: 3em;
  height: 3em;
  animation: loading-rotate 2s linear infinite;
}

.loadingAnimation circle {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: currentColor;
  stroke-linecap: round;
}
</style>
