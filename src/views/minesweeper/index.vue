<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2024/6/5 5:24 下午
 * @FilePath: src/views/minesweeper/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2024/6/5 5:24 下午
-->
<template>
  <div id="app">
      <SelectDifficulty class="app-section" @showGame="showGame" />
<i class="iconfont  icon-sixintong-AIkefugongzuoshijianpeizhi"></i>
<i class="iconfont  icon-doutuilogo"></i>
<i class="iconfont  icon-douyinicon"></i>
      <MineSweeper class="app-section" :key="uuid"
                   :width="width" :height="height" :mine-count="mineCount"
      />
  </div>
</template>

<script>
import SelectDifficulty from './components/SelectDifficulty';
import MineSweeper from './components/MineSweeper';

export default {
  name: 'App',
  components: {
    SelectDifficulty,
    MineSweeper,
  },
  data() {
    return {
      uuid: Math.random(),
      width: 8,
      height: 8,
      mineCount: 10,
    };
  },
  methods: {
    showGame(width, height, mineCount) {
      this.uuid = Math.random();
      this.width = width;
      this.height = height;
      this.mineCount = mineCount;
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  min-height: 100vh;
  align-items: center;
  transition: transform 1s ease;
  width: 100%;
  justify-content: space-around;
}

.app-section {
  flex: 0 0 auto;
}
</style>
