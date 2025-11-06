/**
 * 缓动函数合集
 * 参考自 Robert Penner 的经典 easing 方程
 */

const Easings = {
  // 匀速
  linear: t => t,

  // 二次缓动
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // 三次缓动
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),

  // 正弦曲线缓动
  easeInSine: t => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: t => Math.sin((t * Math.PI) / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,

  // 指数缓动
  easeInExpo: t => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: t =>
    t === 0
      ? 0
      : t === 1
        ? 1
        : t < 0.5
          ? Math.pow(2, 10 * (2 * t - 1)) / 2
          : (2 - Math.pow(2, -10 * (2 * t - 1))) / 2,

  // 回弹
  easeOutBack: t => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInBack: t => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
  easeInOutBack: t => {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
  }
}

/**
 * 获取缓动函数
 * @param {string} name
 * @returns {Function}
 */
export function getEasing(name = 'linear') {
  return Easings[name] || Easings.linear
}

export default Easings
