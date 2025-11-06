<template>
  <div class="container">
    <h2>MotionKit Demo</h2>

    <section>
      <h3>Preset fadeIn</h3>
      <Motion ref="m1" :config="'fadeIn'">
        <div class="box red">Fade In</div>
      </Motion>
      <div class="controls"><button @click="play('m1')">Play</button><button @click="pause('m1')">Pause</button><button @click="stop('m1')">Stop</button></div>
    </section>

    <section>
      <h3>Preset slideUp</h3>
      <Motion ref="m2" :config="'slideUp'">
        <div class="box blue">Slide Up</div>
      </Motion>
      <div class="controls"><button @click="play('m2')">Play</button><button @click="pause('m2')">Pause</button><button @click="stop('m2')">Stop</button></div>
    </section>

    <section>
      <h3>Group (sequence)</h3>
      <MotionGroup ref="group" :motions="groupMotions" mode="sequence">
        <template v-slot="{ index }">
          <div class="box" :class="index === 0 ? 'green' : 'yellow'">Group {{ index + 1 }}</div>
        </template>
      </MotionGroup>
      <div class="controls"><button @click="playGroup">Play Group</button><button @click="pauseGroup">Pause Group</button><button @click="stopGroup">Stop Group</button></div>
    </section>
  </div>
</template>

<script>
import Motion from './components/Motion.vue';
import MotionGroup from './components/MotionGroup.vue';
import presets from './presets/index.js';

export default {
  name: 'MotionDemo',
  components: { Motion, MotionGroup },
  data: function () {
    return {
      groupMotions: [
        presets.slideUp,
        presets.fadeIn
      ]
    };
  },
  methods: {
    play(refName) {
      var c = this.$refs[refName];
      if (c && c.play) c.play();
    },
    pause(refName) {
      var c = this.$refs[refName];
      if (c && c.pause) c.pause();
    },
    stop(refName) {
      var c = this.$refs[refName];
      if (c && c.stop) c.stop();
    },
    playGroup() {
      var g = this.$refs.group;
      if (g && g.play) g.play();
    },
    pauseGroup() {
      var g2 = this.$refs.group;
      if (g2 && g2.pause) g2.pause();
    },
    stopGroup() {
      var g3 = this.$refs.group;
      if (g3 && g3.stop) g3.stop();
    }
  }
};
</script>

<style scoped>
.container { padding: 24px; font-family: Arial, sans-serif; }
.section { margin-bottom: 20px; }
.box { width: 160px; height: 80px; line-height: 80px; color: #fff; margin: 12px auto; border-radius: 8px; text-align: center; }
.red { background: #ef4444; }
.blue { background: #3b82f6; }
.green { background: #10b981; }
.yellow { background: #f59e0b; }
.controls { display:flex; gap:8px; justify-content:center; margin-top:8px; }
button { padding:6px 10px; border-radius:6px; border:none; background:#374151; color:#fff; cursor:pointer; }
</style>
