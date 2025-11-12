<template>
  <div className="demo">
    <h2>MotionKit v2.1 动效演示</h2>
    <MotionGroup mode="sequence">
      <Motion preset="fadeIn">FadeIn</Motion>
      <Motion preset="slideUp">SlideUp</Motion>
      <Motion preset="rotateIn">RotateIn</Motion>
    </MotionGroup>
  </div>
</template>

<script>
import Motion from './components/Motion.vue'
import MotionGroup from './components/MotionGroup.vue'

export default {
  name: 'Demo',
  components: {Motion, MotionGroup}
}
</script>

<style scoped>
.demo {
  text-align: center;
  padding: 40px;
}
</style>
