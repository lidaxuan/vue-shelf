<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-17 14:45:00
 * @FilePath: /vue-shelf/src/views/tableasd.vue
-->
<template>
  <div class="p20">
    <el-color-picker v-model="fill"></el-color-picker>
    <div class="w100 h100 box">
      <svg t="1636452182629" class="icon item1" viewBox="0 0 1083 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8840" width="150" height="150"><path d="M81.014154 1024H342.843077a81.014154 81.014154 0 0 0 61.400615-28.16l75.303385-87.473231a81.014154 81.014154 0 0 1 61.400615-28.16h461.13477A81.014154 81.014154 0 0 0 1083.076923 799.172923V81.014154A81.014154 81.014154 0 0 0 1002.062769 0H81.014154A81.014154 81.014154 0 0 0 0 81.014154v861.971692A81.014154 81.014154 0 0 0 81.014154 1024z" :fill="fill" p-id="8841"></path></svg>
      <svg t="1636452153989" class="icon item2" viewBox="0 0 1289 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8698" width="200" height="200"><path d="M104.030815 0h306.024296c27.154963 0 53.210074 10.619259 72.647111 29.582222l86.755556 84.650667c19.437037 18.962963 45.511111 29.582222 72.647111 29.582222h543.345778A104.030815 104.030815 0 0 1 1289.481481 247.808v672.142222A104.030815 104.030815 0 0 1 1185.450667 1024H104.030815A104.030815 104.030815 0 0 1 0 919.969185V104.030815A104.030815 104.030815 0 0 1 104.030815 0z" :fill="fill" p-id="8699"></path></svg>
    </div>
    <!-- <Table class="tableComStyle" key="1" :tableConfig="tableConfig" :lazy="true" :height="300" :data="list" :tableColumnData="tableColumnData" ref="table">
      <template #handle="scope">
        <el-button type="text" @click="addAiUserTimeoutBtn(scope.row)">修改</el-button>
        <el-button type="text" @click="delTableItemBtn(scope.row)">删除</el-button>
      </template>
    </Table> -->
  <!-- {{selectList}}
    <Table
      class="tableComStyle"
      key="2"
      :row-class-name="tableRowClassName"
      :tableConfig="tableConfig"
      :height="400"
      :data="list"
      :tableColumnData="tableColumnData"
      ref="table"
      @selection-change="handleSelectionChange"
    >
      <template #adasddas="scope">
        <el-button type="text" @click="addAiUserTimeoutBtn(scope.row)">修改</el-button>
        <el-button type="text" @click="delTableItemBtn(scope.row)">删除</el-button>
      </template>
      <template #handle="scope">
        <el-button type="text" @click="addAiUserTimeoutBtn(scope.row)">修改</el-button>
        <el-button type="text" @click="delTableItemBtn(scope.row)">删除</el-button>
      </template>
    </Table> -->
    <!-- <ul>
      <li v-for="item in 100" :key="item" class="mb10" style="background: pink">
        {{ item }}念书打包速度V领;vknjcNSDNv 你死定了女女是 老奶奶年历史的VOIIONJ OHU看见大V接口呢fkjnKJN n njk;加拿大你
        {{ heighttop }}
      </li>
    </ul> -->
    <!-- 向下 负数 向上 正数 -->
    <br />

    <!-- <div class="footer-box" v-scroll :style="`transition: transform 500ms ease 0s; transform: translate(-50%, ${heighttop}px)`"/> -->
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Table from '@/components/table';
import loadmore from '@/mixins/loadmore.js';

let list = [];
for (let i = 0; i < 10; i++) {
  list.push({
    id: i + 1,
    name: `苍天有井名为空${i}`,
  });
}
export default {
  name: '', // Pascal命名
  mixins: [loadmore],
  components: {
    Table,
  },
  data() {
    return {
      fill: 'pink',
      list: list,
      tableColumnData: [
        { width: '70px', label: '排序号', prop: '', type: 'index', fixed: 'left' }, //  fixed: 'left'
        { width: '70px', label: '排序号', prop: '', type: 'selection' },
        {
          label: '动作',
          prop: '',
          width: '150',
          children: [
            {
              label: '省市区',
              align: 'center',
              prop: '',
              children: [
                { label: '地址', align: 'center', prop: 'name', minWidth: '300' },
                { label: '省份', align: 'center', prop: 'id', minWidth: '150' },
                { label: '市区', align: 'center', prop: 'name', minWidth: '150' },
                { width: '100', label: '操作', prop: 'desp', slotName: 'adasddas' },
              ],
            },
            { label: '名称', align: 'center', prop: 'name', minWidth: '180' },
          ],
        },
        { label: '动作', prop: 'id', width: '150' },
        { label: '动作', prop: 'name', width: '150' },
        { label: '动作', prop: 'name', width: '150' },
        { label: '动作', prop: 'name', width: '150' },
        { label: '动作', prop: 'name', width: '150' },
        { label: '动作', prop: 'name', width: '150' },
        { label: 'ID', prop: 'id', showOverflowTooltip: true },
        { label: 'ID', prop: 'id', showOverflowTooltip: true },
        { label: 'ID', prop: 'id', showOverflowTooltip: true },
        { label: 'ID', prop: 'id', showOverflowTooltip: true },
        { label: 'ID', prop: 'id', showOverflowTooltip: true },
        { label: 'ID', prop: 'id', showOverflowTooltip: true },
        { width: '100', label: '操作', prop: 'desp', slotName: 'handle', fixed: 'right' },
      ],
      visibleData: [],

      tableConfig: {
        itemHeight: 53, // 每一行高度

        saveDATA: [], // 请求回来的所有数据
        // 多级表头配置
        headData: [],
        start: 0,
        end: 30, // 3倍的pageList
        starts: 0, // 备份[保持与上一样]
        ends: 30, // 备份[保持与上一样]
        pageNum: 10, // 当前一屏显示多少填多少，根据elConfig.maxHeight和dConfig.itemHeight以及你自定义td样式的设置来的
        timeOut: 400, // 延迟
      },
      i: '',
      heighttop: 0,
      selectList: [],
    };
  },
  computed: {
    contentHeight() {
      return this.list.length * this.itemHeight + 'px';
    },
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.toggleSelection([this.list[1]]);
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.log(row, rowIndex);
      for (let i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].id == row.id) {
          return 'asdasdasd'
        }
      }

    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // -------------
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    // 页面滚动距顶部距离
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let scroll = scrollTop - this.i;
      this.i = scrollTop;
      if (scrollTop === 0) {
        return;
      }

      // 鼠标向上滚动
      if (scroll < 0) {
        // console.log('向上');
        this.heighttop = 70;
      } else {
        // console.log('向下');
        this.heighttop = 0;
        // 鼠标向下滚动
      }
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
.box {
  position: relative;
  .item1 {
    position: absolute;
    z-index: 4;
    top: -10px;
    left: 25px;
  }
  .item2 {
    position: absolute;
    z-index: 3;
  }
}
//@import url(); 引入公共css类
// ::v-deep .el-table__row td:nth-child(2) {
//   color: pink;
//   background: #000;
// }
::v-deep .asdasdasd {
  background: greenyellow;
}
// ::v-deep .el-table__row {
//   label.is-checked {
//     &::after {
//       content: '';
//       display: flex;
//       position: absolute;
//       width: 100%;
//       height: 100%;
//       background: pink;
//       z-index: 999999;
//     }
//     &:root {
//       background: #000;
//     }
//     background: #000;
//     position: relative;
//   }
// }
.footer-box {
  width: 700px;
  height: 50px;
  background: #000;
  // transition: transform 500ms ease 0s;
  // transform: translateY(0px, -50%);
  position: fixed;
  bottom: 0;
  left: 50%;
  // transform: translate(-50%, -50%);
}
</style>