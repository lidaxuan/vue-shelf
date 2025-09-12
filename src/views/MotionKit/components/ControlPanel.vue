<template>
  <div class="control-panel">
    <h3>元素属性</h3>
    <div v-if="selectedElement" class="panel-content">
      <section class="section">
        <h4>Transform</h4>
        <div class="row" v-for="(val,key) in selectedElement.transform" :key="key">
          <label>{{ key }}:</label>
          <input type="number" v-model.number="selectedElement.transform[key]"/>
        </div>
      </section>

      <section class="section">
        <h4>样式</h4>
        <div class="row">
          <label>文字颜色:</label>
          <input type="color" v-model="selectedElement.style.color"/>
        </div>
        <div class="row">
          <label>背景颜色:</label>
          <input type="color" v-model="bgStart"/>
          <input v-if="selectedElement.style.gradientType" type="color" v-model="bgEnd"/>
          <select v-model="selectedElement.style.gradientType">
            <option value="">无渐变</option>
            <option value="linear">线性渐变</option>
            <option value="radial">径向渐变</option>
          </select>
        </div>
        <div v-if="selectedElement.style.gradientType" class="gradient-stops">
          <div v-for="(stop,index) in gradientStops" :key="index"
               :style="{background:stop.color}" class="stop"
               @mousedown="startStopDrag(index,$event)"></div>
        </div>

        <div class="row"><label>边框:</label><input v-model="selectedElement.style.border"/></div>
        <div class="row"><label>圆角:</label><input v-model="selectedElement.style.borderRadius"/></div>
        <div class="row"><label>阴影:</label><input v-model="selectedElement.style.boxShadow"/></div>
        <div class="row"><label>滤镜:</label><input v-model="selectedElement.style.filter"/></div>
        <div class="row"><label>透明度:</label><input type="number" step="0.1" min="0" max="1" v-model.number="selectedElement.style.opacity"/></div>
      </section>

      <section class="section">
        <h4>文本</h4>
        <div class="row"><label>文字:</label><input v-model="selectedElement.innerText"/></div>
        <div class="row"><label>字体大小:</label><input v-model="selectedElement.style.fontSize"/></div>
        <div class="row"><label>字体:</label><input v-model="selectedElement.style.fontFamily"/></div>
        <div class="row"><label>对齐:</label>
          <select v-model="selectedElement.style.textAlign">
            <option>left</option>
            <option>center</option>
            <option>right</option>
          </select>
        </div>
      </section>

      <section class="section">
        <h4>动画轨道</h4>
        <div v-for="(track,index) in selectedElement.animation" :key="index" class="track">
          <div class="track-header">
            <span>轨道 {{ index + 1 }}</span>
            <button @click="addKeyframe(track)">添加关键帧</button>
          </div>
          <div class="track-params">
            <label>持续时间:<input type="number" v-model.number="track.duration"/></label>
            <label>延迟:<input type="number" v-model.number="track.delay"/></label>
            <label>缓动:
              <select v-model="track.easing">
                <option>linear</option>
                <option>ease</option>
                <option>ease-in</option>
                <option>ease-out</option>
                <option>ease-in-out</option>
              </select>
            </label>
          </div>
          <div class="keyframes">
            <span v-for="(kf,idx) in track.keyframes" :key="idx" class="kf" :style="keyframeStyle(kf)">{{ kf.percent }}%</span>
          </div>
        </div>
      </section>

      <section class="section export">
        <button @click="$emit('export-html')">导出HTML</button>
        <button @click="$emit('export-json')">导出JSON</button>
        <button @click="importPrompt">导入JSON</button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectedElement'],
  data() {
    return {
      gradientStops: [{color: '#ff0000'}, {color: '#0000ff'}], bgStart: '#ff0000', bgEnd: '#0000ff', dragIndex: null
    };
  },
  watch: {
    bgStart() {
      this.updateGradient();
    }, bgEnd() {
      this.updateGradient();
    }
  },
  methods: {
    updateGradient() {
      if (!this.selectedElement) return;
      this.selectedElement.style.gradient = `${this.bgStart},${this.bgEnd}`;
      this.selectedElement.style.gradientType = 'linear';
      this.gradientStops = [{color: this.bgStart}, {color: this.bgEnd}];
    },
    startStopDrag(index, e) {
      this.dragIndex = index;
      document.onmousemove = this.dragStopMove;
      document.onmouseup = this.dragStopEnd;
    },
    dragStopMove(e) {
      if (this.dragIndex === null) return;
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'];
      this.gradientStops[this.dragIndex].color = colors[Math.floor(Math.random() * colors.length)];
      this.bgStart = this.gradientStops[0].color;
      this.bgEnd = this.gradientStops[1].color;
      this.updateGradient();
    },
    dragStopEnd() {
      document.onmousemove = null;
      document.onmouseup = null;
      this.dragIndex = null;
    },
    addKeyframe(track) {
      if (!track.keyframes) this.$set(track, 'keyframes', []);
      const lastPercent = track.keyframes.length > 0 ? track.keyframes[track.keyframes.length - 1].percent : 0;
      track.keyframes.push({
        percent: Math.min(lastPercent + 10, 100),
        transform: {x: 0, y: 0, rotateZ: 0, scaleX: 1, scaleY: 1},
        style: {opacity: 1, color: '#000', background: '#fff', gradientType: '', gradient: ''}
      });
    },
    keyframeStyle(kf) {
      let bg = kf.style.gradientType && kf.style.gradient ? (kf.style.gradientType === 'linear' ? `linear-gradient(${kf.style.gradient})` : `radial-gradient(${kf.style.gradient})`) : kf.style.background || '#ccc';
      return {background: bg, padding: '2px 4px', border: '1px solid #999', borderRadius: '2px', fontSize: '12px', cursor: 'pointer'};
    },
    importPrompt() {
      const json = prompt('粘贴JSON');
      if (json) this.$emit('import-json', json);
    }
  }
};
</script>

<style scoped>
.control-panel {
  background: #f8f8f8;
  padding: 10px;
  font-family: Arial;
  font-size: 13px;
}

.panel-content .section {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.row {
  display: flex;
  align-items: center;
  margin: 3px 0;
}

.row label {
  width: 80px;
}

.row input, .row select {
  flex: 1;
  padding: 2px 5px;
  margin-left: 5px;
}

.gradient-stops {
  display: flex;
  gap: 5px;
  margin: 5px 0;
}

.stop {
  width: 20px;
  height: 20px;
  border: 1px solid #333;
  cursor: pointer;
}

.track {
  border: 1px solid #ccc;
  padding: 5px;
  margin: 5px 0;
  background: #fff;
  border-radius: 3px;
}

.track-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.track-params {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 5px;
}

.keyframes {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.export button {
  margin-right: 5px;
  margin-top: 5px;
  padding: 3px 8px;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.export button:hover {
  background: #45a049;
}
</style>
