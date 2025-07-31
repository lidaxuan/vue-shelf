<template>
  <div class="game">

    <svg @click="setConfig" alt="设置" t="1745995983903" class="icon configIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2761" width="48" height="48">
      <path
          d="M458.88 175.530667a106.794667 106.794667 0 0 1 103.594667 0l234.410666 130.048c16.341333 9.045333 29.866667 22.186667 39.338667 38.144 9.472 15.957333 14.421333 34.090667 14.421333 52.522666v257.066667c0 18.474667-4.949333 36.608-14.421333 52.522667-9.429333 15.957333-23.04 29.098667-39.338667 38.186666l-234.410666 130.048a106.794667 106.794667 0 0 1-103.594667 0L224.426667 743.978667c-16.298667-9.045333-29.866667-22.186667-39.338667-38.144A102.912 102.912 0 0 1 170.666667 653.354667V396.245333c0-18.432 4.992-36.565333 14.421333-52.48 9.472-15.957333 23.04-29.141333 39.338667-38.186666l234.453333-130.048z m69.077333 60.458666a35.584 35.584 0 0 0-34.56 0L258.986667 366.08a34.986667 34.986667 0 0 0-17.962667 30.208v257.066667a34.304 34.304 0 0 0 17.92 30.250666l234.453333 130.048a35.584 35.584 0 0 0 34.56 0l234.410667-130.048a34.304 34.304 0 0 0 17.92-30.208V396.245333a34.304 34.304 0 0 0-17.92-30.208l-234.453333-130.048z m-17.28 150.058667c37.333333 0 73.130667 14.634667 99.541334 40.661333 26.410667 26.026667 41.216 61.269333 41.216 98.090667 0 36.778667-14.805333 72.106667-41.216 98.133333a141.866667 141.866667 0 0 1-99.541334 40.618667 141.866667 141.866667 0 0 1-99.541333-40.661333 137.728 137.728 0 0 1-41.258667-98.133334c0-36.778667 14.848-72.064 41.258667-98.048a141.824 141.824 0 0 1 99.541333-40.661333z m0 69.376a71.296 71.296 0 0 0-49.792 20.309333 69.333333 69.333333 0 0 0-20.608 49.066667 68.522667 68.522667 0 0 0 20.608 49.066667 70.528 70.528 0 0 0 49.792 20.309333c18.645333 0 36.565333-7.338667 49.749334-20.309333 13.226667-13.013333 20.650667-30.677333 20.650666-49.066667 0-18.389333-7.424-36.053333-20.650666-49.066667a70.912 70.912 0 0 0-49.749334-20.309333z"
          p-id="2762"></path>
    </svg>

    <div class="box" v-if="visiblePage">
      <div class="top">
        <div class="title">
          砍一砍
        </div>
        <div class="btn" @click="playGame">开始游戏</div>
      </div>
      <div class="bottom">
        <div class="item">排行榜</div>
        <div class="item">消息</div>
        <div class="item" @click="role">人物角色</div>
      </div>
    </div>

    <canvas v-else id="Mycanvas" width="100%" height="100%"></canvas>

    <Config ref="Config" :visibleBack="visiblePage" @configChange="configChange" @closeConfig="closeConfig" @backPage="visiblePage = true"></Config>
  </div>
</template>

<script>
import Main from './js/main'
import Config from "./config.vue";
import AudioObj from "./js/base/audio";

export default {
  name: '',  // Pascal命名
  mixins: [],
  components: {Config},
  props: {},
  //这里存放数据
  data() {
    return {
      controller: null,
      visibleConfig: false,
      isMusic: true,
      isSoundEffects: true,
      visiblePage: true,
      bgAudio: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {
  }, //生命周期 - 挂载之前
  mounted() {
    console.clear();
    const localIsMusic = JSON.parse(localStorage.getItem("isMusic"));
    const localIsSoundEffects = JSON.parse(localStorage.getItem("isSoundEffects"));
    if (localIsMusic === null && localIsSoundEffects === null) {
      localStorage.setItem("isMusic", JSON.stringify(true));
      localStorage.setItem("isSoundEffects", true);
    } else {
      this.configChange("isMusic", localIsMusic); // 播放音乐
    }
    // setTimeout(() => {
    //   this.playGame()
    // }, 0)
  },
  //方法集合
  methods: {
    role() {
      this.$router.push("/game-role");
    },
    playGame() {
      this.visiblePage = false;
      setTimeout(() => {
        this.$nextTick(() => {
          const canvas = document.getElementById("Mycanvas");
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          const isMusic = JSON.parse(localStorage.getItem("isMusic"));
          const isSoundEffects = JSON.parse(localStorage.getItem("isSoundEffects"));
          this.controller = new Main("Mycanvas", isMusic, isSoundEffects);
        })
      }, 0)
    },
    // 关闭设置弹窗 恢复游戏
    closeConfig() {
      if (this.controller) {
        this.controller.updateGameStatus(false);
        this.controller.loop();
      }
    },
    // 打开设置弹窗,暂停游戏
    setConfig() {
      this.$refs.Config.open();
      console.log(this.controller)
      if (this.controller) {
        this.controller.updateGameStatus(true);
      }
    },
    // 更新 背景音乐 声音状态 这里的音量设置为0.6
    async configChange(key, val) {
      // 背景音乐
      if (key == "isMusic") {
        if (!this.bgAudio) {
          this.bgAudio = new AudioObj(0.6)
        }
        try {
          if (val) {
            await this.bgAudio.playAudio("bg");
          } else {
            this.bgAudio.stopAudio();
          }
        } catch (error) {
          if (error.name === "NotAllowedError") {
            document.body.addEventListener('click', async () => {
              try {
                await this.bgAudio.playAudio("bg");
              } catch (error) {
                console.error('播放失败:', error);
              }
            }, {once: true}); // 仅监听一次
          }
        }
      }
      // 点击音效
      if (key == "isSoundEffects") {
        this.controller.updateAudioStatus(key, val);
      }
    },
  }
}
</script>
<style lang='scss' scoped>
.game {
  width: 100%;
  height: 100%;

  .configIcon {
    position: fixed;
    top: 20px;
    left: 20px;
    font-size: 48px;
  }

}

.box {
  width: 100%;
  height: 100%;
  background: url("./images/crazyBg.gif") no-repeat;
  background-size: cover;
  background-position: center center; /* 居中图片 */
  .top {
    height: 70%;
    background: rgba(124, 126, 135, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 80px;
      color: #fff;
      font-family: cursive;
      margin-bottom: 140px;
    }

    .btn {
      font-size: 35px;
      background: #fff;
      width: 60%;
      height: 75px;
      border-radius: 85px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .bottom {
    height: 30%;
    background: rgba(96, 96, 102, 0.9);
    display: flex;
    justify-content: space-around;
    padding-top: 70px;

    .item {
      width: 30%;
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
  }
}

</style>
