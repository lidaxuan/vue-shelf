// core/motion-core.js
// MotionCore: 一个最小但功能完整的动画执行器，支持从样式 from -> to，数字与 transform 插值，pause/resume/stop/seek
import Easing from './easing.js';
import { clamp, now, parseNumberUnit, parseTransform, buildTransform } from './utils.js';

export default class MotionCore {
  constructor(opts = {}) {
    // opts: { el, from, to, duration(ms), delay(ms), easing, loop }
    this.el = opts.el || null;
    this.from = opts.from || {};
    this.to = opts.to || {};
    this.duration = opts.duration != null ? opts.duration : 1000;
    this.delay = opts.delay != null ? opts.delay : 0;
    this.easing = typeof opts.easing === 'string' ? (Easing[opts.easing] || Easing.linear) : (opts.easing || Easing.linear);
    this.loop = !!opts.loop;
    this.onUpdate = typeof opts.onUpdate === 'function' ? opts.onUpdate : null;
    this.onComplete = typeof opts.onComplete === 'function' ? opts.onComplete : null;

    // internals
    this._rafId = null;
    this._start = null;
    this._pausedAt = null;
    this._progress = 0;
    this._running = false;
    this._computed = this._prepare(this.from, this.to);
  }

  _prepare(from, to) {
    // build interpolation plan for each property
    const plan = {};
    const keys = new Set([...Object.keys(from || {}), ...Object.keys(to || {})]);
    keys.forEach(k => {
      if (k === 'transform') {
        const a = parseTransform(from.transform || '');
        const b = parseTransform(to.transform || '');
        plan.transform = { type: 'transform', from: a, to: b };
      } else {
        const a = parseNumberUnit(from[k]);
        const b = parseNumberUnit(to[k]);
        plan[k] = { type: 'number', from: a, to: b };
      }
    });
    return plan;
  }

  _applyStyles(styleObj) {
    if (!this.el) return;
    for (const k in styleObj) {
      if (!Object.prototype.hasOwnProperty.call(styleObj, k)) continue;
      this.el.style[k] = styleObj[k];
    }
  }

  _stepFrame(ts) {
    if (!this._start) this._start = ts;
    const elapsed = ts - this._start;
    if (elapsed < this.delay) {
      // not started
      this._progress = 0;
      this._schedule();
      return;
    }
    const t = clamp((elapsed - this.delay) / Math.max(1, this.duration), 0, 1);
    const eased = this.easing(t);
    this._progress = eased;

    // compute styles according to plan
    const styles = {};
    for (const k in this._computed) {
      const node = this._computed[k];
      if (node.type === 'number') {
        const a = node.from.n;
        const b = node.to.n;
        const unit = node.to.u || node.from.u || '';
        const val = a + (b - a) * eased;
        styles[k] = `${val}${unit}`;
      } else if (node.type === 'transform') {
        const fx = node.from.translateX || 0;
        const fy = node.from.translateY || 0;
        const tx = node.to.translateX || 0;
        const ty = node.to.translateY || 0;
        const fs = node.from.scale != null ? node.from.scale : 1;
        const ts_ = node.to.scale != null ? node.to.scale : 1;
        const fr = node.from.rotate || 0;
        const tr = node.to.rotate || 0;

        const cur = {
          translateX: fx + (tx - fx) * eased,
          translateY: fy + (ty - fy) * eased,
          scale: fs + (ts_ - fs) * eased,
          rotate: fr + (tr - fr) * eased,
        };
        styles.transform = buildTransform(cur);
      }
    }

    // apply
    this._applyStyles(styles);
    if (this.onUpdate) this.onUpdate(this._progress, styles);

    if (t >= 1) {
      if (this.loop) {
        // restart
        this._start = ts;
        this._schedule();
      } else {
        this._running = false;
        this._rafId = null;
        if (this.onComplete) this.onComplete();
      }
    } else {
      this._schedule();
    }
  }

  _schedule() {
    this._rafId = requestAnimationFrame(this._boundStep);
  }

  play() {
    if (this._running) return;
    this._running = true;
    // bind step for consistent 'this'
    if (!this._boundStep) this._boundStep = this._stepFrame.bind(this);
    if (this._pausedAt) {
      // resume: adjust start to account for paused duration
      const pausedDuration = now() - this._pausedAt;
      if (this._start) this._start += pausedDuration;
      this._pausedAt = null;
    } else {
      this._start = null;
    }
    this._schedule();
  }

  pause() {
    if (!this._running) return;
    cancelAnimationFrame(this._rafId);
    this._rafId = null;
    this._running = false;
    this._pausedAt = now();
  }

  stop(jumpToEnd = false) {
    cancelAnimationFrame(this._rafId);
    this._rafId = null;
    this._running = false;
    this._pausedAt = null;
    if (jumpToEnd) {
      // apply final styles
      const finalStyles = {};
      for (const k in this._computed) {
        const node = this._computed[k];
        if (node.type === 'number') {
          finalStyles[k] = `${node.to.n}${node.to.u || ''}`;
        } else if (node.type === 'transform') {
          finalStyles.transform = buildTransform(node.to);
        }
      }
      this._applyStyles(finalStyles);
      if (this.onUpdate) this.onUpdate(1, finalStyles);
      if (this.onComplete) this.onComplete();
    }
  }

  seek(p) {
    // p in [0,1]
    p = clamp(p);
    const eased = this.easing(p);
    const styles = {};
    for (const k in this._computed) {
      const node = this._computed[k];
      if (node.type === 'number') {
        const a = node.from.n;
        const b = node.to.n;
        const unit = node.to.u || node.from.u || '';
        const val = a + (b - a) * eased;
        styles[k] = `${val}${unit}`;
      } else if (node.type === 'transform') {
        const fx = node.from.translateX || 0;
        const fy = node.from.translateY || 0;
        const tx = node.to.translateX || 0;
        const ty = node.to.translateY || 0;
        const fs = node.from.scale != null ? node.from.scale : 1;
        const ts_ = node.to.scale != null ? node.to.scale : 1;
        const fr = node.from.rotate || 0;
        const tr = node.to.rotate || 0;

        const cur = {
          translateX: fx + (tx - fx) * eased,
          translateY: fy + (ty - fy) * eased,
          scale: fs + (ts_ - fs) * eased,
          rotate: fr + (tr - fr) * eased,
        };
        styles.transform = buildTransform(cur);
      }
    }
    this._applyStyles(styles);
    if (this.onUpdate) this.onUpdate(p, styles);
  }
}
