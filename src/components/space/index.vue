<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-01-07 10:44:16
 * @FilePath: /vue-shelf/src/components/space/index.vue
-->
<template>
  <div
    class="ldx-space"
    :style="{
      'align-items': align ? alignMap[align] : '',
      gap: getSize() + 'px',
      'flex-direction': direction == 'vertical' ? 'column' : '',
      'flex-wrap': wrap ? 'wrap' : 'nowrap',
    }"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in $slots.default">
      <Item :node="item"></Item>
      <Item v-if="index < $slots.default.length - 1" :node="{ split: split, tag: 'span' }"></Item>
    </template>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Item from './item.vue';

const sizeMap = {
  small: 8,
  middle: 16,
  large: 24,
};
export default {
  name: 'Space', // Pascal命名
  mixins: [],
  components: {
    Item,
  },
  props: {
    align: {
      type: String,
      default: () => {},
    },
    direction: {
      type: String,
      default: () => 'horizontal',
    },
    size: {
      type: String | Number,
      default: () => 'small',
    },
    wrap: {
      type: Boolean,
      default: () => false,
    },
    split: String,
  },
  data() {
    return {
      alignMap: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        baseline: 'baseline',
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    getSize() {
      if (/^\d{1,}$/.test(Number(this.size))) {
        return this.size;
      }
      return sizeMap[this.size] || 8;
    },
  },
};
</script>
<style lang='scss' scoped>
.ldx-space {
  display: inline-flex;
}
</style>