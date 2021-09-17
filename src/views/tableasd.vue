<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-17 14:45:00
 * @FilePath: /vue-shelf/src/views/tableasd.vue
-->
<template>
  <div class="p20">
    {{ visibleData }}
    <Table class="tableComStyle"  :height="400" :data="list" :tableColumnData="tableColumnData" ref="table">
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
import loadmore from '@/mixins/loadmore.js'

let list = [];
for (let i = 0; i < 300; i++) {
  list.push({
    id: i,
    name: `苍天有井名为空${i}`,
  });
}
export default {
  name: '', // Pascal命名
  mixins: [loadmore],
  components: {
    Table,
  },
  props: {
    itemHeight: {
      type: Number | String,
      default: 31,
    },
  },
  data() {
    return {
      list: list,
      tableColumnData: [
        { width: '70px', label: '排序号', prop: '', type: 'index' },
        { label: '动作', prop: 'name', width: '150' },
        { label: 'ID', prop: 'id', showOverflowTooltip: true },
        { width: '100', label: '操作', prop: 'desp', slotName: 'handle' },
      ],
      visibleData: [],
      start: 0,
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
  mounted() {
    // this.loadmore();
    this.visibleData = this.list.slice(0, 7);
    // const tableBox = this.$refs.table.$el.querySelector('.el-table tbody')
    // tableBox.style.position = 'absolute';
    // tableBox.style.top = 0;
    // tableBox.style.left = 0;

    const wrapper = this.$refs.table.$el.querySelector('.el-table .el-table__body-wrapper');
    // this.$refs.table.$el.style.position = 'relative';
    
    wrapper.appendChild(this.creatDiv());
  },
  methods: {
    creatDiv() {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.width = '1px';
      div.style.left = 0;
      div.style.top = 0;
      div.style.right = 0;
      div.style['z-index'] = -1;
      div.style.height = this.list.length * this.itemHeight + 'px';
      return div;
    },
    loadmore(scrollHeight, scrollTop = 0, clientHeight, e) {
      console.log(scrollHeight, scrollTop, clientHeight);
      // console.log('移动了');
      const visibleCount = Math.ceil(clientHeight / this.itemHeight); // 取得可见区域的可见列表项数量
      // console.log(e.querySelector('tbody').clientHeight);
      const start = Math.floor(scrollTop / this.itemHeight); // 取得可见区域的起始数据索引

      this.start = start;
      const end = start + visibleCount; // 取得可见区域的结束数据索引
      console.log(start, end);
      this.visibleData = this.list.slice(start, end); // 计算出可见区域对应的数据，让 Vue.js 更新
      this.$refs.table.$el.querySelector('.el-table .el-table__body-wrapper').style.webkitTransform = `translate3d(0, ${start * this.itemHeight}px, 0)`;
      // this.$refs.content.style.webkitTransform = `translate3d(0, ${start * this.itemHeight}px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
      // let time = null;
      // clearTimeout(time);
      // time = setTimeout(() => {
      //   this.$emit('pagingData');
      // }, timeout);
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