<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-09-16 16:44:39
 * @FilePath: /vue-shelf/src/views/test/selectv2.vue
-->
<template>
  <div class="list-view" :style="`height: ${height}px; width: ${width}px`" @scroll="handleScroll">
    <div class="list-view-phantom" :style="{ height: contentHeight }"></div>
    <ul ref="content" class="list-view-content">
      <li class="list-view-item" :style="`height: ${itemHeight}px`" v-for="(item, index) in visibleData" :key="index">
        <!-- <slot v-bind="{item, index}"></slot> -->
        <slot :item="item" :index="index + start" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FictitiousList',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number | String,
      default: 400,
    },
    width: {
      type: Number | String,
      default: '100%',
    },
    itemHeight: {
      type: Number | String,
      default: 30,
    },
  },
  computed: {
    contentHeight() {
      return this.data.length * this.itemHeight + 'px';
    },
  },
  mounted() {
    this.updateVisibleData();
  },
  data() {
    return {
      visibleData: [],
      timeout: null,
      start: 0,
    };
  },
  methods: {
    updateVisibleData() {
      let scrollTop = this.$el.scrollTop || 0;
      console.log('移动了');
      const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight); // 取得可见区域的可见列表项数量
      const start = Math.floor(scrollTop / this.itemHeight); // 取得可见区域的起始数据索引

      this.start = start;
      const end = start + visibleCount; // 取得可见区域的结束数据索引
      this.visibleData = this.data.slice(start, end); // 计算出可见区域对应的数据，让 Vue.js 更新
      this.$refs.content.style.webkitTransform = `translate3d(0, ${start * this.itemHeight}px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
    },
    handleScroll() {
      this.updateVisibleData()
      // if (this.timeout) {
      //   clearTimeout(this.timeout);
      //   // this.timeout = null;
      // }
      // this.timeout = setTimeout(() => this.updateVisibleData, 500);
      // this.timeout = setTimeout(this.updateVisibleData, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.list-view {
  overflow: auto;
  position: relative;
  border: 1px solid #aaa;
}
.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
.list-view-item {
  padding: 5px;
  color: #666;
  line-height: 30px;
  box-sizing: border-box;
}
</style>