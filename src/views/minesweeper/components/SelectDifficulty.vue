<template>
  <div class="select-difficulty-section">
    <div class="flex flex-aic " style="width: 460px; flex-wrap: wrap">
      <div v-for="item in list" class="select-difficulty-item" @click="$emit('showGame',item.x,item.y, item.mine)">
        <div>{{ item.x }} x {{ item.y }}</div>
        <div>{{ item.mine }} 个雷</div>
      </div>
      <div class="select-difficulty-item">
        <div class="form-group">
          <div class="form-label">宽度</div>
          <el-input-number v-model="width" :max="50" :min="1"></el-input-number>
        </div>
        <div class="form-group">
          <div class="form-label">高度</div>
          <el-input-number v-model="height" :max="50" :min="1"></el-input-number>
        </div>
        <div class="form-group">
          <div class="form-label">雷数</div>
          <el-input-number v-model="mineCount" :max="width*height" :min="1"></el-input-number>
        </div>
        <div class="form-group">
          <div class="form-label"></div>
          <el-button type="primary" class="mine-sweeper-button" @click="$emit('showGame',width,height,mineCount)">
            玩游戏
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SelectDifficulty',
  components: {},
  data() {
    return {
      list: [{x: 8, y: 8, mine: 10}, {x: 16, y: 16, mine: 40}, {x: 30, y: 16, mine: 99}],
      width: 30,
      height: 16,
      mineCount: 99,
    };
  },
};
</script>

<style lang="scss" scoped>
.select-difficulty-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.select-difficulty-item {
  width: 200px;
  height: 200px;
  margin: 15px;
  border: 2px solid #666;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  .form-label {
    width: 60px;
  }
}
</style>
