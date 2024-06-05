<template>
  <div class="game-container">
<!--    {{mines}}-->
<!--    {{openStatus}}-->
<!--    {{markStatus}}-->
    <div class="mine-sweeper-container" @contextmenu.prevent>
      <div v-for="i in height" :key="i" class="mine-sweeper-row">
        <div v-for="j in width" :key="j"
             class="mine-sweeper-item" :class="{'is-open':openStatus[(i - 1) * width + j - 1]}"
             @click.left="handleLeftClick(i-1,j-1)"
             @click.right="handleRightClick(i-1,j-1)"
        >
          <span v-if="markStatus[(i-1)*width+(j-1)] === 1" class="iconfont">🚩</span>
          <span v-else-if="markStatus[(i-1)*width+(j-1)] === 2" class="iconfont">?</span>
          <template v-else-if="openStatus[(i-1)*width+(j-1)]">
            <span v-if="mines[(i-1)*width+(j-1)]" class="iconfont">💣</span>
            <span v-else-if="neighbourMineCount[(i-1)*width+(j-1)]>0">
              {{ neighbourMineCount[(i - 1) * width + (j - 1)] }}
            </span>
          </template>
        </div>
      </div>
    </div>

    <div class="panel-container">
      <div>{{ selectedMineCount }} / {{ mineCount }}</div>
      <button class="mine-sweeper-button" @click="reStart">重开一局</button>
    </div>
  </div>
</template>

<script>
function shuffle(mines, start) {
  for (let i = start; i < mines.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const tmp = mines[randomIndex];
    mines[randomIndex] = mines[i];
    mines[i] = tmp;
  }
}

export default {
  props: {
    width: {
      type: Number,
      required: true,
      default: () => 8
    },
    height: {
      type: Number,
      required: true,
      default: () => 8
    },
    mineCount: {
      type: Number,
      required: true,
      default: () => 10
    },
  },
  data() {
    return {
      isEnd: false,
      mines: [],
      openStatus: [],
      markStatus: [],
      selectedMineCount: 0,
    };
  },
  computed: {
    neighbourMineCount() {
      const result = new Array(this.width * this.height).fill(0);
      for (let i = 0; i < result.length; i++) {
        if (!this.mines[i]) {
          continue;
        }
        const y = i % this.width;
        const x = (i - y) / this.width;
        for (let j = -1; j < 2; j++) {
          const newX = x + j;
          if (newX < 0 || newX === this.height) {
            continue;
          }
          for (let k = -1; k < 2; k++) {
            const newY = y + k;
            if (newY < 0 || newY === this.width) {
              continue;
            }
            result[newX * this.width + newY]++;
          }
        }
      }
      return result;
    },
  },
  created() {
    this.reStart();
  },
  watch: {
    selectedMineCount() {
      if (this.selectedMineCount === this.mineCount) {
        const match = this.mines.every((isMine, index) => {
          if ((isMine && this.markStatus[index] === 1) || (!isMine && this.markStatus[index] !== 1)) {
            return true;
          }
          return false;
        });
        if (match) {
          this.$nextTick(() => {
            alert('win');
          });
          this.isEnd = true;
        }
      }
    },
  },
  methods: {
    reStart() {
      this.init(this.width, this.height, this.mineCount);
    },
    init(width, height, mineCount) {
      this.isEnd = false;
      const total = width * height;
      const mines = new Array(total).fill(0);
      for (let i = 0; i < mineCount; i++) {
        mines[i] = 1;
      }
      shuffle(mines, mineCount);
      this.mines = mines;
      this.openStatus = new Array(total).fill(0);
      this.markStatus = new Array(total).fill(0);
      this.selectedMineCount = 0;
    },
    handleLeftClick(x, y) {
      if (this.isEnd) {
        return;
      }
      const index = x * this.width + y;
      if (this.openStatus[index] === 1 || this.markStatus[index] === 1) {
        return;
      }

      if (this.mines[index]) {
        this.openStatus.splice(index, 1, 1);
        this.isEnd = true;
        this.$nextTick(() => {
          alert('mine');
        });
        return;
      }
      if (this.neighbourMineCount[index] > 0) {
        this.openStatus.splice(index, 1, 1);
        return;
      }
      this.floodfill(x, y);
    },
    floodfill(x, y) {
      if (x < 0 || y < 0 || x === this.height || y === this.width) {
        return;
      }
      const index = x * this.width + y;
      if (this.openStatus[index] === 1) {
        return;
      }
      this.openStatus.splice(index, 1, 1);
      if (this.neighbourMineCount[index] > 0) {
        return;
      }
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          this.floodfill(x + i, y + j);
        }
      }
    },
    handleRightClick(x, y) {
      if (this.isEnd) {
        return;
      }
      const index = x * this.width + y;
      if (this.openStatus[index] === 1) {
        return;
      }
      this.markStatus.splice(index, 1, (this.markStatus[index] + 1) % 3);
      if (this.markStatus[index] === 1) {
        this.selectedMineCount++;
      } else if (this.markStatus[index] === 2) {
        this.selectedMineCount--;
      }
    }
  }
};
</script>

<style scoped>
.mine-sweeper-container {
  overflow: hidden;
  width: fit-content;
  background-color: #f2f1f0;
  margin-bottom: 20px;
}

.mine-sweeper-row {
  display: flex;
}

.mine-sweeper-item {
  width: 23px;
  height: 23px;
  margin: 2px;
  line-height: 23px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  background-color: #babdb6;
  cursor: pointer;
}

.mine-sweeper-item.is-open {
  background-color: #dededc;
}

.panel-container {
  width: 180px;
  display: flex;
}
</style>
