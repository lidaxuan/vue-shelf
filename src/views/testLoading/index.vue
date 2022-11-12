<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-11-12 09:17:20
 * @FilePath: /vue-shelf/src/views/testLoading/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-11-12 18:02:06
-->
<template>
  <div class="aa">
    <!-- <Comp></Comp> -->
    <!-- <Compcopy></Compcopy> -->

    <div>
      <div v-for="item in 3" :key="item">奥术大师多反而AV方式变奥术大师多反而AV方式变奥术大师多反而AV方式变奥术大师多反而AV方式变奥术大师多反而AV方式变</div>
    </div>
    <hr />
    <!-- <pre>
      {{ query }}
    </pre> -->
    <el-button :loading="true" @click="click1($event)">按钮1</el-button>
    <el-button type="primary" @click="click2($event)">按钮2</el-button>
  </div>
</template>

<script>
import Vue from "vue";
import Comp from "./comp.vue";
import Compcopy from "./compcopy.vue";
export default {
  name: "", // Pascal命名
  mixins: [],
  components: {
    Comp,
    Compcopy
  },
  props: {},
  data() {
    return {
      query: {
        name: "zs"
      },
      context: ''
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
  beforeCreate() { },
  created() {
    // this.initPage()
  },
  beforeMount() { },
  mounted() { },
  methods: {
    async initPage() {
      loading.ploading(this);
      const res = await this.getData(this.query);
      loading.ploading(this);
      // console.log(res);
    },
    getData(query) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ...query, age: 18 });
        }, 2000);
      });
    },
    click1(event) {
      console.log("event1", event);
    },
    click2(event) {
      loading.eloading(event)
      setTimeout(() => {
        loading.eloading(event)
      }, 2000);
    }
  },
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.el-button {
  // background: pink;
}
</style>
