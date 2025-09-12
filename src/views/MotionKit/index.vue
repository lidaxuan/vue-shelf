<template>
  <div id="app" style="display:flex;height:100vh;">
    <CanvasArea ref="canvas" :elements="elements" @select-element="onSelectElement" style="flex:1;"/>
    <ControlPanel
        :selectedElement="selectedElement"
        @export-json="exportJson"
        @import-json="importJson"
        @export-html="exportHtml"
        style="width:350px;height:100%;"
    />
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel.vue';
import CanvasArea from './components/CanvasArea.vue';

export default {
  name: 'App',
  components: { ControlPanel, CanvasArea },
  data() {
    return {
      elements: [
        {
          innerText: 'Hello',
          transform: { x:50, y:50, z:0, rotateX:0, rotateY:0, rotateZ:0, scaleX:1, scaleY:1, scaleZ:1, skewX:0, skewY:0, transformOrigin:'50% 50%' },
          style: { color:'#000', background:'#f00', gradientType:'', gradient:'', border:'', borderRadius:'0', boxShadow:'', filter:'', opacity:1, fontSize:'16px', fontFamily:'Arial', textAlign:'center' },
          animation: [ { duration:1000, delay:0, easing:'linear', keyframes:[] } ]
        }
      ],
      selectedElement: null
    }
  },
  methods:{
    onSelectElement(el){ this.selectedElement = el; },
    exportJson(){
      const data = JSON.stringify(this.elements,null,2);
      console.log('导出JSON:',data);
      alert('JSON导出到控制台');
    },
    importJson(json){
      try{
        this.elements = JSON.parse(json);
        alert('导入成功');
      }catch(e){
        alert('JSON格式错误');
      }
    },
    exportHtml(){
      let html = '';
      this.elements.forEach(el=>{
        html+=`<div style="position:absolute; left:${el.transform.x}px; top:${el.transform.y}px; color:${el.style.color}; background:${el.style.background}; width:100px;height:100px;">${el.innerText}</div>\n`;
      });
      console.log('导出HTML:',html);
      alert('HTML导出到控制台');
    }
  }
}
</script>

<style>
body,html,#app{margin:0;padding:0;height:100%;font-family:Arial;}
</style>
