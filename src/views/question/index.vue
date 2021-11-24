<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-11 11:36:47
 * @FilePath: /vue-shelf/src/views/question/index.vue
-->
<template>
  <div class="">
    <div class="flex flex-aic flex-ccc">
      <template v-for="(val, key) in comMap">
        <button class="w100 h50" @click="change(key)">{{key}} 问题解答</button>
      </template>
    </div>
    <component :is="active"></component>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import _ from 'lodash';

let comMap = {};
const files = require.context('./', true, /\.(vue|js)$/);
// 根据文件名组织模块对象
files.keys().map((src) => {
  const match = src.match(/\/(.+)\./);
  if (match && match.length >= 1) {
    const name = match[1];
    const moduleValue = files(src);
    if (moduleValue.default) {
      comMap[_.upperFirst(name)] = moduleValue.default;
    }
  }
});
const keys = Object.keys(comMap);
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    ...comMap,
  },
  props: {},
  data() {
    return {
      comMap,
      active: keys[0],
    };
  },
  computed: {},
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
  methods: {
    change(val) {
      this.active = _.upperFirst(val);
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