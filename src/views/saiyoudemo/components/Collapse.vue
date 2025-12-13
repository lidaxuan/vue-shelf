<!--
 * @Description:
 * @Author: lidaxuan
 * @Date: 2025-12-13 09:55:21
 * @FilePath: src/views/saiyoudemo/Collapse.vue
 * @LastEditors: lijixuan
 * @LastEditTime: 2025-12-13 09:55:21
-->
<template>
  <div class="collapse" :style="`height: ${flag ? height : cheight}`">
    <div class="top">
      <slot name="top"></slot>

      <div class="btn-text" @click="click">
        <i class="el-icon-arrow-down icon" :class="{'is-reverse': !flag}"></i>
        {{ flag ? "收起" : "展开" }}
      </div>
    </div>
    <div class="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collapse', // Pascal命名
  mixins: [],
  components: {},
  props: {
    cheight: {
      type: [String, Number],
      default: () => 60
    },
    height: {
      type: [String, Number],
      default: () => 400
    }
  },
  computed: {},
  data() {
    return {
      flag: true
    };
  },
  watch: {},
  mounted() {
  },
  methods: {
    click() {
      this.flag = !this.flag;
    }
  }
};
</script>
<style lang='scss' scoped>
.collapse {
  transition: all 0.3s;
  overflow: hidden;
  max-height: 500px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
  }

  .btn-text {
    font-weight: 500;
    font-size: 14px;
    color: #FF8A3D;
    cursor: pointer;

    .icon {
      transition: all 0.3s;
    }

    .is-reverse {
      transform: rotate(180deg);
    }
  }
}
</style>
