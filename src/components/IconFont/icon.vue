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
        <svg aria-hidden="true"  :fill="color" class="svg">
          <use :xlink:href="`#${type}`"></use>
        </svg>
      </template>
    </i>
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
    this.color = this.fill;
    this.$refs.IconFont.onmouseover =  () => {
      this.color = this.active;
    };
    this.$refs.IconFont.onmouseout =  () => {
      this.color = this.fill;
    };
  },
  methods: {
    onClick($event) {
      this.$emit('click', $event);
    },
  },
};
</script>

<style lang="scss" scoped>
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
    fill: attr(data-fill) !important;
  }
  // & > svg:hover {
  //   fill: attr(data-hover-color) !important;
  // }
}
</style>
