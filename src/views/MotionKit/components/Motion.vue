<template>
  <div
          class="motion"
          :class="status"
          :style="mergedStyle"
          ref="motionRef"
  >
    <slot></slot>
  </div>
</template>

<script>
import Timeline from '../core/timeline.js';
import { getEasing } from '../utils/easing.js';
import { parseTransform, interpolateTransform } from '../utils/helpers.js';
import presets from '../presets/index.js';

export default {
  name: 'Motion',
  props: {
    config: { type: [Object, String], required: true },
    autoplay: { type: Boolean, default: true }
  },
  data: function () {
    return {
      mergedStyle: {},
      keyframes: [],
      keyframePercent: [],
      timeline: null,
      status: ''
    };
  },
  mounted: function () {
    var cfg = this._resolveConfig(this.config);
    // prepare keyframes
    if (cfg && cfg.keyframes) {
      this.keyframes = cfg.keyframes; // raw form: [{ "0%": {...}}, ...] or [{...}, {...}]
      // get percent array normalized as numbers 0..1
      this.keyframePercent = this.keyframes.map(function (kf) {
        var keys = Object.keys(kf);
        if (keys && keys.length) {
          var pctKey = keys[0];
          if (String(pctKey).indexOf('%') > -1) {
            return parseInt(pctKey.replace('%', '').trim(), 10) / 100;
          }
        }
        return null;
      }).map(function (v, idx, arr) {
        if (v == null) {
          // evenly distribute if any nulls (non-percent format)
          return idx / (arr.length - 1);
        }
        return v;
      });
    }

    this.timeline = new Timeline({
      keyframes: this.keyframes,
      duration: (cfg && cfg.duration) ? cfg.duration : 1000,
      delay: (cfg && cfg.delay) ? cfg.delay : 0,
      loop: !!(cfg && cfg.loop),
      easing: (cfg && cfg.easing) ? cfg.easing : 'linear',
      onStart: (function () { this.status = 'playing'; }).bind(this),
      onUpdate: (function (state, progress) { this._applyState(state, progress); }).bind(this),
      onComplete: (function () { this.status = 'completed'; }).bind(this)
    });

    if (this.autoplay) this.play();
  },
  beforeDestroy: function () {
    if (this.timeline) this.timeline.stop(true);
  },
  methods: {
    _resolveConfig: function (cfg) {
      if (!cfg) return null;
      if (typeof cfg === 'string') {
        // preset name
        var p = presets[cfg];
        if (p) return p;
        return null;
      }
      if (cfg && cfg.preset && typeof cfg.preset === 'string') {
        var p2 = presets[cfg.preset];
        if (p2) return Object.assign({}, p2, cfg);
      }
      return cfg;
    },
    play: function () {
      if (this.timeline) this.timeline.play();
    },
    pause: function () {
      if (this.timeline) this.timeline.pause();
      this.status = 'paused';
    },
    stop: function () {
      if (this.timeline) this.timeline.stop(true);
      this.status = 'stopped';
    },
    seek: function (p) {
      if (this.timeline) this.timeline.seek(p);
    },
    _applyState: function (state, progress) {
      // state is an object where transform may be an object {from,to,t} per timeline implementation
      var applied = {};
      var keys = Object.keys(state || {});
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (k === 'transform') {
          var tfSpec = state.transform;
          if (tfSpec && typeof tfSpec === 'object' && tfSpec.from !== undefined && tfSpec.to !== undefined) {
            var a = parseTransform(tfSpec.from || '');
            var b = parseTransform(tfSpec.to || '');
            applied.transform = interpolateTransform(a, b, tfSpec.t != null ? tfSpec.t : progress);
          } else if (typeof tfSpec === 'string') {
            applied.transform = tfSpec;
          }
        } else {
          applied[k] = state[k];
        }
      }
      this.mergedStyle = applied;
      this.$emit('update', applied, progress);
    }
  }
};
</script>

<style scoped lang="scss">
.motion {
  display: inline-block;
  will-change: transform, opacity;
  transition: none;
}
.motion.playing { /* optional visual */ }
.motion.paused { opacity: 0.85; }
.motion.completed { opacity: 1; }
.motion.stopped { opacity: 0.6; }
</style>
