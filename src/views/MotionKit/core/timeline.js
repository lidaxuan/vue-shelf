// src/core/timeline.js
// Timeline: 控制单个动画（支持 keyframes、from/to、duration、delay、loop、easing）
// 提供 API: play(), pause(), stop(), seek(progressIn0to1), onUpdate/onStart/onComplete

import { getEasing } from '../utils/easing.js';
import { now } from '../utils/helpers.js';
import { parseKeyframes } from '../utils/helpers.js';

export default class Timeline {
  /**
   * opts:
   *  - keyframes: array 或 null （格式见 parseKeyframes）
   *  - from: {prop: value}
   *  - to: {prop: value}
   *  - duration: ms
   *  - delay: ms
   *  - loop: boolean
   *  - easing: string
   */
  constructor(opts = {}) {
    this.keyframes = opts.keyframes ? parseKeyframes(opts.keyframes) : null;
    this.from = opts.from || null;
    this.to = opts.to || null;
    this.duration = typeof opts.duration === 'number' ? opts.duration : 1000;
    this.delay = typeof opts.delay === 'number' ? opts.delay : 0;
    this.loop = !!opts.loop;
    this.easingName = opts.easing || 'linear';

    this._rafId = null;
    this._startTime = null; // timestamp in ms when started
    this._pausedAt = null; // timestamp when paused
    this._progress = 0; // logical progress [0,1]
    this._playing = false;

    // callbacks
    this.onUpdate = typeof opts.onUpdate === 'function' ? opts.onUpdate : () => {};
    this.onStart = typeof opts.onStart === 'function' ? opts.onStart : () => {};
    this.onComplete = typeof opts.onComplete === 'function' ? opts.onComplete : () => {};
  }

  _getEasing() {
    return getEasing(this.easingName);
  }

  play() {
    if (this._playing) return;
    // resume from paused
    if (this._pausedAt) {
      const pausedDuration = now() - this._pausedAt;
      if (this._startTime) this._startTime += pausedDuration;
      this._pausedAt = null;
    } else {
      this._startTime = now();
      // mark start time -> include delay logic
    }
    this._playing = true;
    this.onStart();
    this._loop();
  }

  pause() {
    if (!this._playing) return;
    cancelAnimationFrame(this._rafId);
    this._rafId = null;
    this._playing = false;
    this._pausedAt = now();
  }

  stop(resetToStart = true) {
    cancelAnimationFrame(this._rafId);
    this._rafId = null;
    this._playing = false;
    this._pausedAt = null;
    if (resetToStart) {
      this._progress = 0;
      // emit update for zero state
      const state = this._resolveState(0);
      this.onUpdate(state, 0);
    }
  }

  seek(p) {
    // p in [0,1]
    const clamped = Math.max(0, Math.min(1, p));
    this._progress = clamped;
    const state = this._resolveState(clamped);
    this.onUpdate(state, clamped);
  }

  _loop() {
    if (!this._playing) return;
    if (!this._startTime) this._startTime = now();
    const cur = now();
    const elapsed = cur - this._startTime;
    if (elapsed < this.delay) {
      // not started yet
      this._rafId = requestAnimationFrame(this._loop.bind(this));
      return;
    }
    const t = Math.min((elapsed - this.delay) / Math.max(1, this.duration), 1);
    const eased = this._getEasing()(t);
    this._progress = t;
    const state = this._resolveState(eased);
    this.onUpdate(state, eased);

    if (t < 1) {
      this._rafId = requestAnimationFrame(this._loop.bind(this));
    } else {
      // completed one cycle
      if (this.loop) {
        // restart
        this._startTime = now();
        this._rafId = requestAnimationFrame(this._loop.bind(this));
      } else {
        this._playing = false;
        this._rafId = null;
        this.onComplete();
      }
    }
  }

  _resolveState(progress01) {
    // returns an object of current properties (numbers or strings for transform handled elsewhere)
    if (this.keyframes && this.keyframes.length >= 1) {
      // keyframes is an array of { t: 0..1, props: {...} }
      if (this.keyframes.length === 1) return this.keyframes[0].props;
      // find segment
      let i = 0;
      while (i < this.keyframes.length - 1 && progress01 > this.keyframes[i + 1].t) i++;
      const k0 = this.keyframes[i];
      const k1 = this.keyframes[Math.min(i + 1, this.keyframes.length - 1)];
      const localT = (progress01 - k0.t) / Math.max(1e-9, (k1.t - k0.t));
      return interpolateProps(k0.props, k1.props, localT);
    } else if (this.from && this.to) {
      return interpolateProps(this.from, this.to, progress01);
    } else {
      return {};
    }
  }
}

// helper to interpolate numeric props and pass through non-numeric strings
function interpolateProps(a = {}, b = {}, t = 0) {
  const out = {};
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  keys.forEach((k) => {
    const av = a[k];
    const bv = b[k];
    // if transform strings, keep as-is to be parsed later by helpers
    if (k === 'transform') {
      // simple approach: return string placeholders 'tf:...' with linear mix not attempted here;
      // better: return both and let caller parse/interpolate transform via helpers
      out[k] = { from: av, to: bv, t };
      return;
    }
    const an = parseFloat(av);
    const bn = parseFloat(bv);
    if (!isNaN(an) && !isNaN(bn)) {
      // preserve unit if present in string
      const unit = (String(bv).replace(String(bn), '') || '').trim();
      out[k] = (an + (bn - an) * t) + (unit || '');
    } else {
      // fallback: if equal strings -> that string; otherwise pick based on t
      out[k] = t < 0.5 ? av : bv;
    }
  });
  return out;
}

// export interpolateProps for use elsewhere if needed
export { interpolateProps };
