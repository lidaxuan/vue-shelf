<template>
  <div class="box">
    <!-- 可供拖拽的元素 -->
    <div class="aaa">
      <div draggable="true" @dragstart="dragstart($event, item)" @dragend="dragend($event, item)" v-for="(item, index) in items" :key="index">
        <span class="item"> {{ item.moveIndex }}</span>
        <img :src="item.img" class="pic">
      </div>
    </div>

    <div class="drop-field">
      <div v-for="(item,targetIndex) in targetItems" :key="item.targetIndex" @dragover.prevent>
        <div class="empty-box" @drop="drop(item,targetIndex)">
          <img :src="item.img" class="pic" v-if="item.img !== ''">
        </div>
        {{ item.targetIndex }}
      </div>
    </div>

    <!-- 音频 -->
    <div hidden="true">
      <!--      <audio id="audioMusic" class="audio" src="../assets/tip.mp3" controls :autoplay="isPlay" hidden="true" ref="audio"></audio>-->
    </div>
    <!-- 视频 -->
    <div class="success-box" v-if="allSuccess" :class="allSuccess?'show-animate':''">
      <!--      <img src="../assets/images/success.gif" alt="">-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {moveIndex: 1, label: '兔崽子', img: 'http://inews.gtimg.com/newsapp_bt/0/13574681470/1000'},
        {moveIndex: 2, label: 'pen', img: 'https://img.zcool.cn/community/00ad315954abf1a8012193a3289eda.jpg'},
        {
          moveIndex: 0,
          label: "猴子",
          img: 'https://c-ssl.duitang.com/uploads/item/202004/05/20200405102336_iasgg.thumb.1000_0.jpeg'
        },
      ],
      currentImageUrl: '',
      targetItems: [
        {targetIndex: 0, img: ''},
        {targetIndex: 2, img: ''},
        {targetIndex: 1, img: ''},
      ],
      currentMoveIndex: '',
      targetItem: '',
      emptyIndex: '',
      isPlay: false, // 控制音频的播放
      correctNumber: 0,  // 统计正确安放的图片数量
      allSuccess: false
    };
  },
  mounted() {

  },
  methods: {
    drop(event, index) {
      console.log('drog')
      this.emptyIndex = event.targetIndex
      console.log('移到空白位置索引', this.emptyIndex)
    },
    dragstart(event, item) {
      console.log('start的索引', item.moveIndex)
      // 开始移动的时候将移动的索引值+图片的url存储下来
      this.currentMoveIndex = item.moveIndex
      this.currentImageUrl = item.img
    },
    dragend(event, item) {
      console.log('dragend', item)
      console.log('end的索引', this.currentMoveIndex)
      // 校对移动的元素和当前移入到的元素索引是否匹配
      if (this.emptyIndex === this.currentMoveIndex) {
        let index = this.targetItems.findIndex(v => v.targetIndex === this.currentMoveIndex)
        // 如果是则给图片列表中对应索引的img赋值
        this.targetItems[index].img = this.currentImageUrl
        // 同时计算成功的数量
        this.calculateNumber()
        // 如果是移动到正确的位置就产生音效
        document.getElementById('audioMusic').play()
      } else {
        console.log('不在指定位置')
      }

      if (this.correctNumber === this.items.length) {
        this.allSuccess = true
        setTimeout(() => {
          this.allSuccess = false
        }, 3000)
      }
      event.dataTransfer.clearData();
    },
    calculateNumber() {
      this.correctNumber += 1
      console.log('正确放置的元素数', this.correctNumber)

    }
  },

};
</script>

<style lang="scss" scoped>
.aaa {
  position: fixed;
  top: 100px;
  left: 300px;
}
.success-box {
  position: absolute;
  left: 500px;
  top: 0;

  img {
    opacity: 1;
  }
}

.show-animate img {
  animation: move 3s linear infinite;
}

@keyframes move {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

.box {
  display: flex;
  justify-content: center;
}

.item {
  width: 150px;
  height: 150px;
  background: rgb(241, 241, 225);
}

.drop-field {
  width: 300px;
  background: lavender;
  padding: 20px;
}

.pic {
  width: 100px;
  height: 100px;
}

.empty-box {
  width: 100px;
  height: 100px;
  background: white;
}

</style>