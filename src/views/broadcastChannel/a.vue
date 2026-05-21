<template>
  <div class="">

  </div>
</template>

<script>
import {createChanel} from "@/views/broadcastChannel/channel";


export default {
  name:'', // Pascal命名
  mixins: [],
  components: {},
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
    click(){
      createChanel("music").postMessage("hello world")
    }
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
