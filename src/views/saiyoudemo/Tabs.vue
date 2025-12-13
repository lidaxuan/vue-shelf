<template>
  <div class="tabs">
    <div v-for="(item, index) in tabs" :key="index" @click="change(item)" class="item"
         :class="{active: selectTab.id == item.id}">
      {{ item.label }}
    </div>
  </div>
</template>

<script>

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      tabs: [
        {"label": "已邮寄", "id": 1},
        {"label": "未邮寄", "id": 0},
        {"label": "⽆需邮寄", "id": 2},
        {"label": "取消邮寄", "id": 3}
      ],
      selectTab: {}
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    change(item) {
      this.selectTab = structuredClone(item);
      this.$emit("input", item);
    }
  }
};
</script>
<style lang='scss' scoped>
.tabs {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border-radius: 8px;

  .item {
    margin-right: 36px;
    box-shadow: 0px 6px 11px 0px rgba(230, 230, 230, 0.01);
    cursor: pointer;
    color: rgba(26, 43, 62, 0.98);
    &.active {
      font-weight: 500;
      font-size: 16px;
      color: #1A2B3E;
    }
  }
}
</style>
