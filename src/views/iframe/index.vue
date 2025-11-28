<template>
  <div  style="width: 100%;height: 100%">
  <IframeComp></IframeComp>
  </div>
</template>

<script>
import IframeComp from "./page.vue";
export default {
  name:'', // Pascal命名
  mixins: [],
  components: {IframeComp},
  props: {},
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
