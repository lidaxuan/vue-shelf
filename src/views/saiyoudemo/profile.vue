<template>
  <div class="">
    {{ info }}
  </div>
</template>

<script>

export default {
  name:'', // Pascal命名
  mixins: [],
  components: {},
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    };
  },
  computed: {},
  watch: {
  // temObj: {
  //   handler(newVal, oldVal) {
  //   },
  //   deep: true,
  //   immediate: true,
  // },
  // temStr(val) {
  // },
  },
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {},
  methods: {

  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {}
};
</script>
<style lang='scss' scoped>

</style>
