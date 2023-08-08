export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
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
    hello()  {
      console.log('B')
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