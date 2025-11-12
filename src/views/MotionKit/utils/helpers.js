export function lerp(a, b, t) {
  return a + (b - a) * t
}

export function lerpStyle(frames, t) {
  if (frames.length < 2) return {}
  const total = frames.length - 1
  const index = Math.min(Math.floor(t * total), total - 1)
  const f1 = frames[index]
  const f2 = frames[index + 1]
  const localT = (t * total) - index

  const tx = lerp(f1.x || 0, f2.x || 0, localT)
  const ty = lerp(f1.y || 0, f2.y || 0, localT)
  const scale = lerp(f1.scale || 1, f2.scale || 1, localT)
  const rotate = lerp(f1.rotate || 0, f2.rotate || 0, localT)
  const opacity = lerp(
    f1.opacity == null ? 1 : f1.opacity,
    f2.opacity == null ? 1 : f2.opacity,
    localT
  )

  return {
    transform: `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rotate}deg)`,
    opacity
  }
}
