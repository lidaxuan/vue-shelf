<!--
 * @Description: logTest
 * @Author: 李大玄
 * @Date: 2022-06-03 21:53:17
 * @FilePath: /vue-shelf/src/views/test/logTest.vue
-->
<template>
  <div class="">
    <!-- <Aaaa>
      <template #query-table="scope">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </template>
    </Aaaa> -->
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
// import Aaaa from '../../components/flowt/index.vue';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    Aaaa
  },
  props: {},
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
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
    const obj = {
      name: '李大玄',
      age: 18
    };
    console.log(Object.assign({}, obj));

    obj.arr = [];
  },
  beforeMount() {},
  mounted() {},
  methods: {},
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
