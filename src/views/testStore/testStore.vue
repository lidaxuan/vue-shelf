<template>
  <div class="">
    testStore
    {{ count }}
    <button @click="add">+1</button>
    {{userName}}
    {{userCount}}
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
  },
  props: {},
  computed: {
    ...mapGetters(['count',  'userName',  'userCount'])},
  data() {
    return {};
  },
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {},
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    add() {
      this.$store.dispatch('actionsIncrement', Math.floor(Math.random()*1000));
    }
  },
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>