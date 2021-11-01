<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-17 14:45:00
 * @FilePath: /vue-shelf/src/views/tableasd.vue
-->
<template>
  <div class="p20">
    {{ visibleData }}
    <!-- <Table class="tableComStyle" key="1" :tableConfig="tableConfig" :lazy="true" :height="300" :data="list" :tableColumnData="tableColumnData" ref="table">
      <template #handle="scope">
        <el-button type="text" @click="addAiUserTimeoutBtn(scope.row)">修改</el-button>
        <el-button type="text" @click="delTableItemBtn(scope.row)">删除</el-button>
      </template>
    </Table> -->

    <br />

    <Table class="tableComStyle" key="2" :tableConfig="tableConfig" :height="400" :data="list" :tableColumnData="tableColumnData" ref="table">
      <template #handle="scope">
        <el-button type="text" @click="addAiUserTimeoutBtn(scope.row)">修改</el-button>
        <el-button type="text" @click="delTableItemBtn(scope.row)">删除</el-button>
      </template>
    </Table>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Table from '@/components/table';
import loadmore from '@/mixins/loadmore.js';

let list = [];
for (let i = 0; i < 100; i++) {
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
    };
  },
  computed: {
    contentHeight() {
      return this.list.length * this.itemHeight + 'px';
    },
  },
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
  methods: {},
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