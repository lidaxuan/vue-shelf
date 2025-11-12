// hooks/useMotion.js
import Timeline from '../core/timeline';

export function useMotion(el, keyframes, options = {}) {
  const { duration = 1000, easing = 'linear', delay = 0 } = options;
  const timeline = new Timeline();
  timeline.add({ el, keyframes, duration, easing, delay });
  return timeline;
}
