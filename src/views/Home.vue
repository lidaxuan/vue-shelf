<!--
 * @Description: 
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/views/Home.vue
-->
<template>
  <div class="">
    <el-button @click="step = 2" class="w200 h40" type="primary">去开通</el-button>
    <el-button @click="play" class="w200 h40" type="primary">播放</el-button>

    <el-button class="w200 h40" type="primary">
      <router-link :to="{ path: '/optimization' }">/optimization</router-link>
    </el-button>
    <el-button class="w200 h40" type="primary">
      <router-link :to="{ path: '/testSelect' }">/testSelect</router-link>
    </el-button>
    <el-button class="w200 h40" type="primary">
      <router-link :to="{ path: '/deconstruction' }">/{ data = [] = await xxxxx() }}</router-link>
    </el-button>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  //import引入的组件需要注入到对象中才能使用
  //这里存放数据
  data() {
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {},
  //方法集合
  methods: {
    ready(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
    },
    play() {
      const url = 'http://wecom-dev.oss-cn-beijing.aliyuncs.com/corpSessionMsgFile/2021/5/24/7152db1f5ea34243b4ff76fa51e62b30.amr';
      let amr = new BenzAMRRecorder();
      amr.initWithUrl(url).then(function () {
        amr.play();
      });
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