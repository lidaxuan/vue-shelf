<!--
 * @Description:
 * @Author: lidaxuan
 * @Date: 2025-12-06 16:14:20
 * @FilePath: src/views/saiyoudemo/quickFilter.vue
 * @LastEditors: lijixuan
 * @LastEditTime: 2025-12-06 16:14:20
-->
<template>
  <div class="quick-filter-item">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ config.label }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in config.props.options" :command="item.value">{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="value-box">{{selectValue.label}}</div>
  </div>
</template>

<script>

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectValue: {}
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
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    handleCommand(command) {
      console.log(command)
      const options = structuredClone(this.config.props.options);
      const item = options.find(item  => item.value == command);
      console.log(item);
      this.selectValue = item;
      this.$emit("setValue", this.config.key, command)
    }
  }
};
</script>
<style lang='scss' scoped>
.quick-filter-item {
  min-width: 180px;
  display: flex;
}
</style>
