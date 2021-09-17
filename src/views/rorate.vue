<template>
  <div id="cn-wrapper" :style="{ transform: 'rotate(' + rotatePanel + 'deg)' }" class="cn-wrapper">
    <ul>
      <li @click="clickPanel(item)" v-for="(item, index) in panel" :key="index">
        <a href="#">
          <img class="li-img" :src="item.img" alt />
          <div class="li-text">{{ item.title }}</div>
        </a>
      </li>
    </ul>
  </div>
</template>
 
<script >


export default {
  data() {
    return {
      rotatePanel: 0,
    };
  },
  props: {
    panel: {
      type: Array,
      default: [
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
        { img: '@/assets/bg.jpg', title: '一月石榴石' },
      ],
    },
  },
  activated() {
    this.initPanel();
  },
  methods: {
    // 操作版
    clickPanel(item) {
      this.$emit('clickPanel', { item });
    },
    initPanel() {
      let panel = document.getElementById('cn-wrapper');
      let panelMan = new Hammer.Manager(panel);
      panelMan.add(
        new Hammer.Pan({
          threshold: 0,
        })
      );
      panelMan.on('panstart', (ev) => {
        if (ev.center.x < panel.clientWidth / 2) {
          //左边
          this.rotatePanel = this.rotatePanel - ev.angle;
        } else {
          this.rotatePanel = this.rotatePanel + ev.angle;
        }
      });
    },
  },
};
</script>
 
<style scoped>
.cn-wrapper {
  font-size: 1em;
  width: 24em;
  height: 24em;
  overflow: hidden;
  position: fixed;
  z-index: 10;
  bottom: 84px;
  margin-left: -288px;
  left: 50%;
  border-radius: 50%;
  -webkit-transform: scale(0.1);
  -ms-transform: scale(0.1);
  -moz-transform: scale(0.1);
  transform: scale(1);
  /* pointer-events: none; */
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.cn-wrapper li {
  position: absolute;
  font-size: 1.5em;
  width: 10em;
  height: 10em;
  -webkit-transform-origin: 100% 100%;
  -moz-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
  overflow: hidden;
  left: 50%;
  /* top: 50%; */
  margin-top: -2em;
  /* border: solid 1px #f2cc81; */
  margin-left: -10em;
  -webkit-transition: border 0.3s ease;
  -moz-transition: border 0.3s ease;
  transition: border 0.3s ease;
}

.cn-wrapper li a {
  display: block;
  font-size: 1.18em;
  height: 14.5em;
  width: 14.5em;
  /* position: absolute; */
  position: fixed; /* fix the "displacement" bug in webkit browsers when using tab key */
  bottom: -7.25em;
  right: -7.25em;
  border-radius: 50%;
  text-decoration: none;
  color: #fff;
  padding-top: 1em;
  text-align: center;
  -webkit-transform: skew(-60deg) rotate(-70deg) scale(1);
  -ms-transform: skew(-60deg) rotate(-70deg) scale(1);
  -moz-transform: skew(-60deg) rotate(-70deg) scale(1);
  transform: skew(-60deg) rotate(-70deg) scale(1);
  -webkit-backface-visibility: hidden;
  -webkit-transition: opacity 0.3s, color 0.3s;
  -moz-transition: opacity 0.3s, color 0.3s;
  transition: opacity 0.3s, color 0.3s;
}

/* for a central angle x, the list items must be skewed by 90-x degrees
in our case x=40deg so skew angle is 50deg
items should be rotated by x, minus (sum of angles - 180)2s (for this demo) */

.cn-wrapper li:first-child {
  transform: rotate(-10deg) skew(60deg);
}

.cn-wrapper li:nth-child(2) {
  transform: rotate(20deg) skew(60deg);
}

.cn-wrapper li:nth-child(3) {
  transform: rotate(50deg) skew(60deg);
}

.cn-wrapper li:nth-child(4) {
  transform: rotate(80deg) skew(60deg);
}

.cn-wrapper li:nth-child(5) {
  transform: rotate(110deg) skew(60deg);
}
.cn-wrapper li:nth-child(6) {
  transform: rotate(140deg) skew(60deg);
}
.cn-wrapper li:nth-child(7) {
  transform: rotate(170deg) skew(60deg);
}
.cn-wrapper li:nth-child(8) {
  transform: rotate(200deg) skew(60deg);
}
.cn-wrapper li:nth-child(9) {
  transform: rotate(230deg) skew(60deg);
}
.cn-wrapper li:nth-child(10) {
  transform: rotate(260deg) skew(60deg);
}
.cn-wrapper li:nth-child(11) {
  transform: rotate(290deg) skew(60deg);
}
.cn-wrapper li:nth-child(12) {
  transform: rotate(320deg) skew(60deg);
}

.cn-wrapper li:nth-child(odd) a {
  background-color: #a11313;
  background-color: hsla(0, 88%, 63%, 1);
}

.cn-wrapper li:nth-child(even) a {
  background-color: #a61414;
  background-color: hsla(0, 88%, 65%, 1);
}

/* active style */
.cn-wrapper li.active a {
  /* background-color: #b31515;
 background-color: hsla(0, 88%, 70%, 1); */
  background-color: rgba(135, 137, 155, 0.52);
  border: solid 0px #f2cc81;
}

/* hover style */
.cn-wrapper li:not(.active) a:hover,
.cn-wrapper li:not(.active) a:active,
.cn-wrapper li:not(.active) a:focus {
  background-color: rgba(135, 137, 155, 0.52);
  border: solid 0px #f2cc81;
}

.li-img {
  width: 50px;
  margin-bottom: 44px;
  margin-left: -30px;
}
.li-text {
  color: #f2cc81;
  font-size: 20px;
  line-height: 1.4;
  width: 76px;
  margin: 0 calc(50% - 50px);
}
</style>