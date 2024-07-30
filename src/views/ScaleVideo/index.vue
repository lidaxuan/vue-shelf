<template>
  <div class="outer" ref="outer" @click="toggleSize">
    {{originalPosition}} {{originalSize}}
    <div class="inner" ref="inner" :style="innerStyles"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      originalPosition: null,
      originalSize: null,
      innerStyles: null
    };
  },
  computed: {

  },
  methods: {
    innerStyles() {

    },
    toggleSize() {
      this.expanded = !this.expanded;

      if (!this.expanded) {
        // 如果未展开，使用原始的位置和大小
        this.innerStyles = {
          width: this.originalSize.width + 'px',
          height: this.originalSize.height + 'px',
          top: this.originalPosition.top + 'px',
          left: this.originalPosition.left + 'px',
          transition: 'width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease'
        };
      } else {
        // 如果展开，充满父级容器
        this.innerStyles =  {
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          transition: 'width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease'
        };
      }
    },
    saveOriginalPosition() {
      // 获取并保存内部元素的原始位置和大小
      const inner = this.$refs.inner;
      const rect = inner.getBoundingClientRect();
      this.originalPosition = {
        top: rect.top,
        left: rect.left
      };
      this.originalSize = {
        width: rect.width,
        height: rect.height
      };
    }
  },
  mounted() {
    // 在组件挂载后保存内部元素的初始位置和大小
    this.saveOriginalPosition();
  }
};
</script>

<style>
.outer {
  width: 600px;
  height: 600px;
  position: relative;
  border: 1px solid #ccc;
  background: #000;
}

.inner {
  width: 200px;
  height: 100px;
  position: absolute;
  /*background-color: #f0f0f0;*/
  bottom: 100px;
  left: 200px;
  background: pink;
}
</style>
