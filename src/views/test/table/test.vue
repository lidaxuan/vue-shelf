<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-02-15 09:26:54
 * @FilePath: /vue-shelf/src/views/test/table/test.vue
-->
<template>
  <div class="mainbox wmax hmax  flex-ccc flex-aic">
    <div class="btn-small  w100 h100" style="background: pink"></div>
    <i class="icon iconfont icon-wenzhangguanli"></i>
    <i class="icon iconfont icon-changwenzhang-xinjianwenzhang"></i>
    {{ flag }}
    <div class="box w100 h100"></div>
    <div class="w700 box">
      <el-table id="alarmTable" height="300" :data="tableData" border stripe class="timeline-table">
        <el-table-column prop="NO" type="index" label="序号" width="70" align="center"></el-table-column>
        <el-table-column prop="a" label="1"></el-table-column>
        <el-table-column prop="b" label="2"></el-table-column>
        <el-table-column prop="c" label="3"></el-table-column>
        <el-table-column prop="d" label="4"></el-table-column>
        <el-table-column prop="e" label="5"></el-table-column>
        <el-table-column prop="f" label="6"></el-table-column>
      </el-table>
    </div>
    <div v-for="item in 100" :key="item">
      <img src="@/assets/bg.jpg" width="100" alt="" />

    </div>
    <div class="loader"></div>

    <link rel="stylesheet" href="./b.scss">
    <link rel="stylesheet" href="~@/views/test/table/b.scss">
    <link rel="stylesheet" href="https://statics.easyliao.com/web/public/css/login.css">
    <!-- <link rel="stylesheet" href="./a.css" /> -->
    <link v-if="flag" rel="stylesheet" href="//at.alicdn.com/t/font_2964213_r0bdd0q5qa.css" />
    <!-- 
    <link :href="href" /> -->
  </div>
</template>

<script>
export default {
  name: 'test',
  components: {
    Pagination: () => import('./pagination.vue')
  },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      isFixedFoot: true,
      isFixedHead: null,
      emptyData: [],
      flag: true,
      href: ''
    };
  },
  mounted() {
    let list = [];
    for (let i = 0; i < 100; i++) {
      list.push({
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        4: 5,
        f: 6
      });
    }
    this.tableData = list;
    // window.addEventListener('scroll', this.handleScroll, true);
    // setTimeout(() => {
    //   this.flag = false;
    // }, 2000);
    this.href = `./a.css`;
  },
  // 页面销毁前
  beforeDestroy() {
    // window.removeEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    placeholderVisible() {
      console.log(document.getElementById('placeholder'));
      let rect = document.getElementById('placeholder').getBoundingClientRect();
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      console.log('判断', rect.bottom, window.innerHeight);
      if (rect.bottom <= viewHeight) {
        console.log('元素出现');
        this.isFixedFoot = false;
      } else {
        console.log('元素消失');
        this.isFixedFoot = true;
      }
    },
    handleScroll() {
      console.log(document.getElementById('table'));
      let offsetTop = document.getElementById('alarmTable').getBoundingClientRect().top;
      if (offsetTop < 100) {
        console.log('固定');
        this.isFixedHead = true;
      } else {
        console.log('移除固定');
        this.isFixedHead = false;
      }
      this.placeholderVisible();
    },
    loadTable() {
      // 获取数据加载表格
    },
    pageChange(val) {
      //分页
      this.page.currentPage = val;
      this.loadTable();
    },
    pageChangeSize(val) {
      //分页
      this.page.pageSize = val;
      this.global.pageSize = val;
      this.loadTable();
    }
  }
};
</script>


<style lang="scss" scoped>
.mainbox {
  width: calc(100% - 10px);
  overflow: auto;
  .table-head {
    position: fixed;
    top: 100px;
    z-index: 1;
    width: calc(100% - 216px);

    /deep/ .el-table__header {
      background-color: rgba(26, 64, 139, 0.9);
    }

    /deep/ .el-table__row,
    /deep/ .el-table__empty-block {
      display: none;
    }
  }

  .placeholder {
    min-height: 100px;
  }
}
</style>
