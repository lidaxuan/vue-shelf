<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-04-27 17:09:44
 * @FilePath: /vue-shelf/src/components/IconFont/icon.vue
-->
<template>
  <div>
    <i class="icon-font" ref="IconFont" :style="`font-size:${size - 0}px`" @click="onClick">
      <template v-if="type">
        <svg aria-hidden="true" :fill="color" :alt="active" class="svg">
          <use :xlink:href="`#${type}`"></use>
        </svg>
      </template>
    </i>
    <!-- <span :style="`font-size:${size - 0}px`" :class="type" class="icon-font iconfont icon-baojingliebiao classicon"></span> -->
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
    size: {
      type: Number | String,
      default() {
        return 26;
      },
    },
    fill: {
      type: String,
      default() {
        return '#ffffff';
      },
    },
    active: {
      type: String,
    },
  },
  data() {
    return {
      color: '',
    };
  },
  mounted() {
    
  },
  methods: {
    onClick($event) {
      this.$emit('click', $event);
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  width: 40px;
  height: 40px;
}
.icon-font {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  & > svg {
    width: 1em;
    height: 1em;
    margin: 0;
    padding: 0;
    fill: attr(title) !important;
    fill: attr(alt) !important;
    stroke: red;
    & > use {
      stroke: red;
    }
  }
  & > svg:hover {
    fill: attr(data-hover-color) !important;
  }
}
</style>
