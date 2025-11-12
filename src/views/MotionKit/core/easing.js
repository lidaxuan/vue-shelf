// core/easing.js
// 一组常用 easing 函数，输入 t ∈ [0,1] 返回 eased t
const Easing = {
  linear: t => t,
  easeInCubic: t => t * t * t,
  easeOutCubic: t => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: t =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  // 你可以后续扩展更多函数
};

export default Easing;
