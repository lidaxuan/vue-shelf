<template>
  <div className="motion-group">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'MotionGroup',
  props: {mode: {type: String, default: 'sequence'}},
  mounted() {
    const children = this.$children.filter(c => c.$options.name === 'Motion')
    if (this.mode === 'sequence') this.playSequential(children, 0)
    else children.forEach(c => c.play())
  },
  methods: {
    playSequential(list, i) {
      if (i >= list.length) return
      const c = list[i]
      c.play()
      setTimeout(() => this.playSequential(list, i + 1), c.duration + 100)
    }
  }
}
</script>

<style scoped>
.motion-group {
  display: flex;
  justify-content: center;
}
</style>
