<template>
  <div class="canvas-wrapper">
    <div class="canvas-area" ref="canvasWrapper" @click="clickCanvas">
      <div v-for="(el,index) in elements" :key="index"
           :style="elementStyle(el)"
           @click.stop="selectElement(el)">
        {{ el.innerText }}
      </div>
    </div>

    <!-- Timeline -->
    <div class="timeline">
      <div class="track" v-for="(el,index) in elements" :key="index">
        <div class="track-label">{{ el.innerText || '元素' + index }}</div>
        <div class="track-bar">
          <div class="keyframe" v-for="(kf,kidx) in el.animation[0].keyframes" :key="kidx"
               :style="{left:kf.percent+'%'}"
               @mousedown.prevent="startDrag(el.animation[0],kf,$event)"></div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="playAnimation">播放</button>
      <button @click="stopAnimation">停止</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['elements'],
  data() {
    return {selectedElement: null, animating: false, timer: null, frameIndex: 0, dragInfo: null};
  },
  methods: {
    elementStyle(el) {
      const t = el.transform;
      let transformStr = `translate3d(${t.x}px,${t.y}px,${t.z || 0}px) rotateX(${t.rotateX || 0}deg) rotateY(${t.rotateY || 0}deg) rotateZ(${t.rotateZ || 0}deg) scaleX(${t.scaleX || 1}) scaleY(${t.scaleY || 1}) scaleZ(${t.scaleZ || 1}) skewX(${t.skewX || 0}deg) skewY(${t.skewY || 0}deg)`;
      const s = el.style;
      let bg = s.gradientType && s.gradient ? (s.gradientType === 'linear' ? `linear-gradient(${s.gradient})` : `radial-gradient(${s.gradient})`) : s.background || 'transparent';
      return {
        position: 'absolute',
        left: t.x + 'px',
        top: t.y + 'px',
        transform: transformStr,
        color: s.color || '#000',
        background: bg,
        border: s.border || '',
        borderRadius: s.borderRadius || '',
        boxShadow: s.boxShadow || '',
        filter: s.filter || '',
        opacity: s.opacity != null ? s.opacity : 1,
        fontSize: s.fontSize || '16px',
        fontFamily: s.fontFamily || 'Arial',
        textAlign: s.textAlign || 'left',
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      };
    },
    selectElement(el) {
      this.$emit('select-element', el);
    },
    clickCanvas() {
      this.$emit('select-element', null);
    },
    playAnimation() {
      if (this.animating) return;
      this.animating = true;
      this.timer = setInterval(() => {
        this.elements.forEach(el => {
          el.animation.forEach(track => {
            if (!track.keyframes || track.keyframes.length === 0) return;
            const len = track.keyframes.length;
            let frame = track.keyframes[this.frameIndex % len];
            el.transform = Object.assign({}, el.transform, frame.transform);
            el.style = Object.assign({}, el.style, frame.style);
          });
        });
        this.frameIndex++;
      }, 50);
    },
    stopAnimation() {
      this.animating = false;
      clearInterval(this.timer);
      this.timer = null;
      this.frameIndex = 0;
    },
    startDrag(track, kf, e) {
      this.dragInfo = {track, kf, startX: e.clientX, startPercent: kf.percent};
      document.onmousemove = this.dragMove;
      document.onmouseup = this.dragEnd;
    },
    dragMove(e) {
      if (!this.dragInfo) return;
      const delta = e.clientX - this.dragInfo.startX;
      const width = this.$refs.canvasWrapper.offsetWidth;
      let newPercent = this.dragInfo.startPercent + (delta / width) * 100;
      newPercent = Math.min(Math.max(newPercent, 0), 100);
      this.dragInfo.kf.percent = newPercent;
    },
    dragEnd() {
      document.onmousemove = null;
      document.onmouseup = null;
      this.dragInfo = null;
    }
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
};
</script>

<style scoped>
.canvas-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.canvas-area {
  flex: 1;
  position: relative;
  background: #f0f0f0;
  overflow: hidden;
}

.timeline {
  height: 100px;
  background: #eee;
  overflow-y: auto;
  padding: 5px;
}

.track {
  margin-bottom: 5px;
  position: relative;
}

.track-label {
  font-size: 12px;
  margin-bottom: 2px;
}

.track-bar {
  position: relative;
  height: 20px;
  background: #ccc;
  border-radius: 2px;
}

.keyframe {
  position: absolute;
  top: 0;
  width: 8px;
  height: 20px;
  background: #f00;
  border-radius: 2px;
  cursor: pointer;
}

.controls {
  margin: 5px;
}

.controls button {
  margin-right: 5px;
  padding: 3px 6px;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.controls button:hover {
  background: #45a049;
}
</style>
