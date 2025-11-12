<template>
  <div class="motion-box" :style="motionStyle" ref="motionRef">
    <slot />
  </div>
</template>

<script>
import Timeline from '../core/timeline'
import { getEasing } from '../utils/easing'
import { lerpStyle } from '../utils/helpers'
import presets from '../presets/index'

export default {
  name: 'Motion',
  props: {
    preset: String,
    duration: { type: Number, default: 1000 },
    easing: { type: String, default: 'easeOutCubic' },
    autoPlay: { type: Boolean, default: true }
  },
  data() {
    return {
      styleObj: {},
      timeline: null
    }
  },
  computed: {
    motionStyle() {
      return this.styleObj
    }
  },
  mounted() {
    const presetObj = presets[this.preset] || {}
    const keyframes = presetObj.keyframes || []
    const easeFn = getEasing(this.easing)

    this.timeline = new Timeline({
      duration: this.duration,
      easing: easeFn,
      onUpdate: (ratio) => {
        this.styleObj = lerpStyle(keyframes, ratio)
      }
    })

    if (this.autoPlay) this.timeline.play()
  },
  methods: {
    play() {
      if (this.timeline) this.timeline.play()
    }
  }
}
</script>

<style scoped>
.motion-box {
  display: inline-block;
  margin: 10px;
  width: 120px;
  height: 120px;
  background: #4f46e5;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
