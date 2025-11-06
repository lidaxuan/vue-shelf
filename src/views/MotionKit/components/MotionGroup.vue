<template>
  <div class="motion-group">
    <div v-for="(cfg, i) in motions" :key="i" class="motion-group-item" ref="items">
      <slot :index="i"></slot>
    </div>
  </div>
</template>

<script>
import useMotion from '../hooks/useMotion.js';
import presets from '../presets/index.js';
import { parseKeyframes } from '../utils/helpers.js';

export default {
  name: 'MotionGroup',
  props: {
    motions: { type: Array, required: true }, // each item: config object or preset name
    mode: { type: String, default: 'sequence' } // 'sequence' or 'parallel'
  },
  data: function () {
    return {
      controllers: []
    };
  },
  mounted: function () {
    var itemEls = this.$refs.items || [];
    // create controllers for each motion, but do not auto-play
    for (var i = 0; i < this.motions.length; i++) {
      var cfg = this.motions[i];
      var resolved = cfg;
      if (typeof cfg === 'string') {
        var p = presets[cfg];
        if (p) resolved = p;
      } else if (cfg && cfg.preset && typeof cfg.preset === 'string') {
        var p2 = presets[cfg.preset];
        if (p2) resolved = Object.assign({}, p2, cfg);
      }
      var opts = {
        target: itemEls[i],
        keyframes: resolved && resolved.keyframes ? resolved.keyframes : null,
        from: resolved && resolved.from ? resolved.from : null,
        to: resolved && resolved.to ? resolved.to : null,
        duration: (resolved && resolved.duration) ? resolved.duration : 800,
        delay: (resolved && resolved.delay) ? resolved.delay : 0,
        loop: !!(resolved && resolved.loop),
        easing: (resolved && resolved.easing) ? resolved.easing : 'linear',
        onStart: function () {},
        onUpdate: function () {},
        onComplete: function () {}
      };
      var controller = useMotion(opts);
      this.controllers.push(controller);
    }
  },
  methods: {
    play: function () {
      if (this.mode === 'parallel') {
        for (var i = 0; i < this.controllers.length; i++) {
          var c = this.controllers[i];
          if (c && c.play) c.play();
        }
      } else {
        this._playSequence(0);
      }
    },
    _playSequence: function (idx) {
      var self = this;
      if (idx >= this.controllers.length) return;
      var cur = this.controllers[idx];
      // temporarily override onComplete
      if (!cur || !cur.timeline) {
        // fallback: just play and continue after duration
        if (cur && cur.play) {
          cur.play();
          setTimeout(function () { self._playSequence(idx + 1); }, (cur.duration || 800));
        } else {
          self._playSequence(idx + 1);
        }
        return;
      }
      // attach a one-time onComplete handler
      var origComplete = cur.timeline.onComplete;
      cur.timeline.onComplete = function () {
        try { if (typeof origComplete === 'function') origComplete(); } catch (e) {}
        // restore
        cur.timeline.onComplete = origComplete;
        self._playSequence(idx + 1);
      };
      if (cur && cur.play) cur.play();
    },
    pause: function () {
      for (var i = 0; i < this.controllers.length; i++) {
        var c = this.controllers[i];
        if (c && c.pause) c.pause();
      }
    },
    stop: function () {
      for (var j = 0; j < this.controllers.length; j++) {
        var c2 = this.controllers[j];
        if (c2 && c2.stop) c2.stop(true);
      }
    }
  },
  beforeDestroy: function () {
    for (var k = 0; k < this.controllers.length; k++) {
      var c3 = this.controllers[k];
      if (c3 && c3.stop) c3.stop(true);
    }
    this.controllers = [];
  }
};
</script>

<style scoped lang="scss">
.motion-group {
  display: flex;
  gap: 10px;
}
.motion-group-item {
  display: inline-block;
}
</style>
