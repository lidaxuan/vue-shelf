export default class Timeline {
  constructor({ duration = 1000, easing = t => t, onUpdate, onComplete } = {}) {
    this.duration = duration
    this.easing = easing
    this.onUpdate = onUpdate
    this.onComplete = onComplete
    this.startTime = 0
    this.isPlaying = false
  }

  play() {
    if (this.isPlaying) return
    this.isPlaying = true
    this.startTime = performance.now()
    const tick = (now) => {
      if (!this.isPlaying) return
      const elapsed = now - this.startTime
      const t = Math.min(elapsed / this.duration, 1)
      const eased = this.easing(t)
      if (this.onUpdate) this.onUpdate(eased)
      if (t < 1) requestAnimationFrame(tick)
      else {
        this.isPlaying = false
        if (this.onComplete) this.onComplete()
      }
    }
    requestAnimationFrame(tick)
  }

  stop() { this.isPlaying = false }
}
