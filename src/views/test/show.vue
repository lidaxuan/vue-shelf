<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-07-21 18:19:56
 * @FilePath: /vue-shelf/src/views/test/show.vue
-->
<template>
  <div class="love flex flex-aic flex-ccc">
    <div class="code hmax" ref="code" v-html="htmlStr" style="font-size: 16px"></div>

    <div id="loveHeart">
      <canvas id="garden" ref="gardenCanvas"></canvas>

      <div class="words">
        <transition name="fade">
          <div v-if="showMessage" class="messages">
            liming, I love you forever
            <div v-html="timeHtmlStr"></div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="showLoveu" class="loveu">
            Love u forever and ever.<br />
            <div class="signature">- 李继玄</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import { Garden } from '@/utils/garden';
console.log(Garden);
export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  //这里存放数据
  data() {
    return {
      content:
        '<div class="comments">/**</div>' +
        '<div class="comments pl7">* 我是一个程序员,</div>' +
        '<div class="comments pl7">* 所以我写一个页面来纪念我们结婚纪念日.</div>' +
        '<div class="comments pl7">*/</div>' +
        '<div>Boy i = <span class="keyword">new</span> Boy(<span class="string">"Lijixuan"</span>);</div>' +
        '<div>Girl u = <span class="keyword">new</span> Girl(<span class="string">"Jialiming"</span>);</div>' +
        '<div><span class="comments">// 2021-10-1, 我告诉过你我爱你。</span></div>' +
        '<div>i.love(u);</div>' +
        '<div><span class="comments">// 幸运的是，你接受并从此成为我的女朋友。</span></div>' +
        '<div>u.accepted();</div>' +
        '<div><span class="comments">// 从那以后，我每天都在想你。</span></div>' +
        '<div>i.miss(u);</div>' +
        '<div><span class="comments">//照顾好你和我们的爱。</span></div>' +
        '<div>i.takeCareOf(u);</div>' +
        '<div><span class="comments">// 你说你不会那么容易嫁给我的。</span></div>' +
        '<div><span class="comments">// 所以我一直在等待，我相信你会的。</span></div>' +
        '<div><span class="keyword">boolean</span> isHesitate = <span class="keyword">true</span>;</div>' +
        '<div><span class="keyword">while</span> (isHesitate) {</div>' +
        '<div><span class="placeholder" />i.waitFor(u);</div>' +
        '<div><span class="placeholder" /><span class="comments">// 我认为这是一个重要的决定</span></div>' +
        '<div><span class="placeholder" /><span class="comments">// 你应该考虑一下。</span></div>' +
        '<div><span class="placeholder" />isHesitate = u.thinkOver();</div>' +
        '<div>}</div>' +
        '<div><span class="comments">// 在一场浪漫的婚礼之后，我们将从此过上幸福的生活。</span></div>' +
        '<div>i.marry(u);</div>' +
        '<div>i.liveHappilyWith(u);</div>',
      htmlStr: '',
      timeHtmlStr: '',
      showMessage: false,
      showLoveu: false,
      garden: ''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 对象写法
    // temObj: {
    //   handler(newVal, oldVal) {
    //   },
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {}, //生命周期 - 创建之前
  created() {
    this.typewriter();
    const together = new Date('2020-02-14 00:00:00');
    setInterval(() => {
      this.timeElapse(together);
    }, 500);
    this.startHeartAnimation();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {
    const gardenCanvas = this.$refs.gardenCanvas;
    console.log(gardenCanvas);
    let gardenCtx = gardenCanvas.getContext('2d');
    gardenCtx.globalCompositeOperation = 'lighter';
    this.garden = new Garden(gardenCtx, gardenCanvas);
    console.log(this.garden.render);
    setInterval(() => {
      this.garden.render();
    }, Garden.options.growSpeed);
  },
  //方法集合
  methods: {
    typewriter() {
      let progress = 0;
      let str = this.content.trim();
      var timer = setInterval(() => {
        var current = str.substr(progress, 1);
        if (current == '<') {
          progress = str.indexOf('>', progress) + 1;
        } else {
          progress++;
        }
        this.htmlStr = str.substring(0, progress) + (progress & 1 ? '_' : '');
        if (progress >= str.length) {
          clearInterval(timer);
        }
      }, 25);
    },
    timeElapse(date) {
      var current = Date();
      var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
      var days = Math.floor(seconds / (3600 * 24));
      seconds = seconds % (3600 * 24);
      var hours = Math.floor(seconds / 3600);
      if (hours < 10) {
        hours = '0' + hours;
      }
      seconds = seconds % 3600;
      var minutes = Math.floor(seconds / 60);
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      seconds = seconds % 60;
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      this.timeHtmlStr =
        '<span class="digit">' +
        days +
        '</span> days <span class="digit">' +
        hours +
        '</span> hours <span class="digit">' +
        minutes +
        '</span> minutes <span class="digit">' +
        seconds +
        '</span> seconds';
    },
    startHeartAnimation() {
      var angle = 10;
      var heart = new Array();
      var animationTimer = setInterval(() => {
        var bloom = this.getHeartPoint(angle);
        var draw = true;
        for (var i = 0; i < heart.length; i++) {
          var p = heart[i];
          var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
          if (distance < Garden.options.bloomRadius.max * 1.3) {
            draw = false;
            break;
          }
        }
        if (draw) {
          heart.push(bloom);
          this.garden.createRandomBloom(bloom[0], bloom[1]);
        }
        if (angle >= 30) {
          clearInterval(animationTimer);
          this.showMessages();
        } else {
          angle += 0.2;
        }
      }, 50);
    },
    getHeartPoint(angle) {
      let offsetX = 335;
      let offsetY = 257.5;
      var t = angle / Math.PI;
      var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
      var y = -20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return new Array(offsetX + x, offsetY + y);
    },
    showMessages() {
      setTimeout(() => {
        this.showMessage = true;
        setTimeout(() => {
          this.showLoveu = true;
        }, 3000);
      }, 5000);
    }
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
#app .love /deep/ {
  width: 100%;
  height: 100%;
  background: #ffffee;

  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 3s;
  }
  .fade-leave-to {
    opacity: 0;
  }
  .fade-leave-active {
    transition: opacity 3s;
  }

  #loveHeart {
    width: 670px;
    height: 625px;
    position: relative;
  }

  #garden {
    width: 670px;
    height: 625px;
  }

  #elapseClock {
    text-align: right;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .words {
    font-family: 'sans-serif';
    width: 500px;
    font-size: 24px;
    color: #666;
    position: absolute;
    top: 50px;
    left: 50px;
  }

  #elapseClock .digit {
    font-family: 'digit';
    font-size: 36px;
  }

  .loveu {
    padding: 5px;
    font-size: 22px;
    margin-top: 80px;
    margin-right: 120px;
    text-align: right;
    .signature {
      margin-top: 10px;
      font-size: 20px;
      font-style: italic;
    }
  }

  #clickSound {
    display: none;
  }

  .code {
    color: #333;
    font-family: 'Consolas', 'Monaco', 'Bitstream Vera Sans Mono', 'Courier New', 'sans-serif';
    font-size: 12px;
    .string {
      color: #2a36ff;
    }
    .keyword {
      color: #7f0055;
      font-weight: bold;
    }
    .placeholder {
      margin-left: 15px;
    }
    .pl7 {
      padding-left: 7px;
    }
    .comments {
      color: #3f7f5f;
    }
  }

  #copyright {
    margin-top: 10px;
    text-align: center;
    width: 100%;
    color: #666;
  }

  #errorMsg {
    width: 100%;
    text-align: center;
    font-size: 24px;
    position: absolute;
    top: 100px;
    left: 0px;
  }

  #copyright a {
    color: #666;
  }
}
</style>
