export const Easings = {
  linear(t) { return t },
  easeOutCubic(t) { return (--t) * t * t + 1 },
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }
}

export function getEasing(name) {
  return Easings[name] || Easings.linear
}
