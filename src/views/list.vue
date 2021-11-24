<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-18 19:40:04
 * @FilePath: /vue-shelf/src/views/list.vue
-->
<template>
  <div class="">
    {{ list.length }}
    ++++{{ window.asdasdasdasdasdasd }}====
    <pre style="" font="12"> {{ obj }} </pre>
    <el-input v-model="asdasdasdasd"></el-input>
    <ul class="p20">
      <template v-for="(item, index) in list">
        <li v-if="!item.isDelete" :key="index" class="flex flex-aic mb10" style="background: pink">
          <div class="w100" font="20">{{ obj[index] + 1 }}:</div>
          -- {{ get() }}--
          {{ index + 1 }}
          <el-switch v-model="item.isDelete" @change="switchChang(index + 1)" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
          <div class="m10">{{ item.isDelete }}</div>
          <div>{{ item.content }}</div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
window.asdasdasdasdasdasd = 0;
let asd = window;
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      window: asd,
      list: [],
      indexChange: 0,
      obj: {},
      asdasdasdasd: 0,
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.getList();
  },
  beforeMount() {},
  mounted() {},
  methods: {
    getList() {
      this.obj = {};
      let arr = [];
      for (let i = 0; i < 10; i++) {
        this.obj[i] = i;
        arr.push({
          id: i,
          isDelete: false,
          child: [{ i }],
          content: `据近期消息，高通将会在两周之后正式推出新一代旗舰移动平台——骁龙8 gen1。虽然近段时间关于首发机型的具体厂商还有争议，但是基本可以肯定会在小米和摩托罗拉两家诞生，而这其中的小米12无疑是最受关注。`,
        });
      }
      this.list = arr;
    },
    switchChang(index) {
      let list = this.list;
      this.obj[index] = this.obj[index - 1];
      for (let i = index; i < list.length; i++) {
        this.obj[i + 1] = this.obj[i + 1] - 1;
      }
    },
    get() {
      this.asdasdasdasd += 1;
      console.log(this.asdasdasdasd);
      return this.asdasdasdasd;
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