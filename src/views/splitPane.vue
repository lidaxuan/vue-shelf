<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2024/3/7 3:37 下午
 * @FilePath: src/views/splitPane.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2024/3/7 3:37 下午
-->
<template>
  <div class="components-container">
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container" />
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from '../components/split-pane';

export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style  scoped>
.components-container {
  position: relative;
  height: 100vh;
  padding: 2000px;
}

.left-container {
  background-color: #F38181;
  height: 100%;
}

.right-container {
  background-color: #FCE38A;
  height: 200px;
}

.top-container {
  background-color: #FCE38A;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95E1D3;
  height: 100%;
}
</style>
