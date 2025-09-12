<template>
  <div style="width:300px;overflow:auto;height:400px;">
    <h3>元素属性</h3>
    <div v-if="selectedElement">
      <div v-for="(val,key) in selectedElement.transform" :key="key">
        <label>{{key}}:<input type="number" v-model.number="selectedElement.transform[key]"/></label>
      </div>
      <div v-for="(val,key) in selectedElement.style" :key="key">
        <label>{{key}}:<input v-model="selectedElement.style[key]"/></label>
      </div>
      <div v-for="(track,index) in selectedElement.animation" :key="index" style="border:1px dashed #ccc;margin:5px;padding:5px;">
        <div>动画轨道{{index+1}}</div>
        <label>duration:<input type="number" v-model.number="track.duration"/></label>
        <label>delay:<input type="number" v-model.number="track.delay"/></label>
        <label>easing:
          <select v-model="track.easing">
            <option>linear</option><option>ease</option><option>ease-in</option><option>ease-out</option><option>ease-in-out</option>
          </select>
        </label>
        <button @click="addKeyframe(track)">添加关键帧</button>
      </div>
      <button @click="$emit('export-html')">导出HTML</button>
      <button @click="$emit('export-json')">导出JSON</button>
      <button @click="importPrompt">导入JSON</button>
    </div>
  </div>
</template>

<script>
export default {
  props:['selectedElement'],
  methods:{
    importPrompt(){ const json=prompt('粘贴JSON'); if(json) this.$emit('import-json',json); },
    addKeyframe(track){ track.keyframes.push({percent:100,transform:{x:0,y:0},style:{opacity:1}}); }
  }
}
</script>
