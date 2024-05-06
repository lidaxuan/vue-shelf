<!--
 * @Description:
 * @Author: 李大玄
 * @Date: 2024/4/23 11:33 上午
 * @FilePath: src/views/airGame/index.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2024/4/23 11:33 上午
-->
<template>
  <div>
    <div class="game-info">
      <p>生命值: {{ life }}</p>
      <p>关卡: {{ level }}</p>
    </div>
    <div class="game-map">
      <character :position="characterPosition"></character>
      <obstacle v-for="(obstacle, index) in obstacles" :key="index" :position="obstacle.position"></obstacle>
    </div>
  </div>
</template>

<script>
// import assets from "./game/assets";

// console.log(assets)
export default {
  data() {
    return {
      life: 3,
      level: 1,
      characterPosition: {x: 50, y: 50},
      obstacles: [
        {position: {x: 100, y: 100}},
        {position: {x: 200, y: 150}},
        {position: {x: 300, y: 200}}
      ]
    };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(event) {
      const key = event.key;
      let newPosition = {...this.characterPosition};
      switch (key) {
        case 'ArrowUp':
          newPosition.y -= 10;
          break;
        case 'ArrowDown':
          newPosition.y += 10;
          break;
        case 'ArrowLeft':
          newPosition.x -= 10;
          break;
        case 'ArrowRight':
          newPosition.x += 10;
          break;
      }

      // 碰撞检测
      this.checkCollision(newPosition);
    },
    checkCollision(newPosition) {
      for (const obstacle of this.obstacles) {
        if (this.isCollided(newPosition, obstacle.position)) {
          this.life--;
          if (this.life === 0) {
            alert('游戏结束！');
            // 重新开始游戏
            this.restartGame();
          } else {
            // 重置人物位置
            this.characterPosition = {x: 50, y: 50};
          }
          return;
        }
      }

      // 到达终点
      if (newPosition.x >= 400 && newPosition.y >= 250) {
        alert('恭喜通关！');
        // 进入下一关
        this.level++;
        // 重置人物位置
        this.characterPosition = {x: 50, y: 50};
        // 更新障碍物位置
        this.updateObstacles();
      } else {
        // 更新人物位置
        this.characterPosition = newPosition;
      }
    },
    isCollided(position1, position2) {
      return Math.abs(position1.x - position2.x) < 10 && Math.abs(position1.y - position2.y) < 10;
    },
    restartGame() {
      this.life = 3;
      this.level = 1;
      this.characterPosition = {x: 50, y: 50};
      this.updateObstacles();
    },
    updateObstacles() {
      // 更新障碍物位置
      this.obstacles = [
        {position: {x: Math.random() * 300, y: Math.random() * 200}},
        {position: {x: Math.random() * 300, y: Math.random() * 200}},
        {position: {x: Math.random() * 300, y: Math.random() * 200}}
      ];
    }
  },
  components: {
    'character': {
      props: ['position'],
      template: `
        <div class="character" :style="{ left: position.x + 'px', top: position.y + 'px' }"></div>`
    },
    'obstacle': {
      props: ['position'],
      template: `
        <div class="obstacle" :style="{ left: position.x + 'px', top: position.y + 'px' }"></div>`
    }
  }
};
</script>


<style scoped lang="scss">
/* styles.css */
.game-info {
  position: absolute;
  top: 10px;
  left: 10px;
}

.game-map {
  width: 400px;
  height: 300px;
  border: 2px solid black;
  position: relative;
}

.character {
  width: 20px;
  height: 20px;
  background-color: blue;
  position: absolute;
}

.obstacle {
  width: 20px;
  height: 20px;
  background-color: red;
  position: absolute;
}

</style>
