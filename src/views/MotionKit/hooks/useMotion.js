// src/hooks/useMotion.js
// Returns a controller object: { play, pause, stop, seek, timeline }
// Uses core/timeline.js

import Timeline from '../core/timeline.js';
import { parseTransform, interpolateTransform, applyStyleObject } from '../utils/helpers.js';

/**
 * opts:
 *  - target: HTMLElement
 *  - keyframes: array or null
 *  - from: object or null
 *  - to: object or null
 *  - duration, delay, loop, easing
 *  - onStart, onUpdate, onComplete
 */
export default function useMotion(opts) {
  opts = opts || {};
  var target = opts.target || null;
  var keyframes = opts.keyframes || null;
  var from = opts.from || null;
  var to = opts.to || null;
  var duration = typeof opts.duration === 'number' ? opts.duration : 1000;
  var delay = typeof opts.delay === 'number' ? opts.delay : 0;
  var loop = !!opts.loop;
  var easing = opts.easing || 'linear';
  var onStart = typeof opts.onStart === 'function' ? opts.onStart : function () {};
  var onUpdate = typeof opts.onUpdate === 'function' ? opts.onUpdate : function () {};
  var onComplete = typeof opts.onComplete === 'function' ? opts.onComplete : function () {};

  var timeline = new Timeline({
    keyframes: keyframes,
    from: from,
    to: to,
    duration: duration,
    delay: delay,
    loop: loop,
    easing: easing,
    onStart: function () {
      onStart();
    },
    onUpdate: function (state, progress) {
      // state may contain transform spec: { transform: { from, to, t } }
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
      applyStyleObject(target, applied);
      onUpdate(applied, progress);
    },
    onComplete: function () {
      onComplete();
    }
  });

  return {
    play: function () { timeline.play(); },
    pause: function () { timeline.pause(); },
    stop: function (reset) { timeline.stop(reset !== false); },
    seek: function (p) { timeline.seek(p); },
    timeline: timeline,
    duration: duration
  };
}
