<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-06-27 11:34:22
 * @FilePath: /vue-shelf/src/views/ImplementationComponent/create/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-06-27 11:54:05
-->
<template>
  <div class="">
    <el-drawer title="新增" class="drawer" :visible.sync="drawer" direction="rtl">
      <el-button type="primary" class="mr20" @click="structCreate">创建页面</el-button>
      <div class="drawer__footer">
        <el-button>取 消</el-button>
        <el-button type="primary"></el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      drawer: false
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
  created() {},
  beforeMount() {},
  async mounted() {
    const res = await this.$structDemoClient.dsdFindAll();
    console.log(res);
  },
  methods: {
    async structCreate() {
      const res = await this.$structDemoClient.structCreate(config);
      console.log(res);
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
.drawer {
  // position: relative;
  &__footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: right;
    padding: 0 20px;
    box-shadow: 0px 0px 10px 0px #ccc;
  }
}
</style>
