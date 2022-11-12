<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2022-10-26 15:46:39
 * @FilePath: /vue-shelf/src/views/test/drageDemo.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2022-10-27 10:57:43
-->

<template>
  <div tag="div" class="container">
    {{ bg }}1
    {{ forbiddenChildePointerEvents }}
    <div class="flex flex-aic">
      @dragover.prevent="handleDragOver($event, item)"
      <div
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :style="{ background: item.color, width: '80px', height: '80px' }"
        draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragleave="leave"
        @dragover.prevent="over"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)"
      >
    
    </div>
    </div>

    <div class="big-box flex" key="11" @dragover.prevent="over" @dragleave="leave" style="color: #fff" :class="{ 'forbidden-childe-pointer-events': forbiddenChildePointerEvents }">
      父级
      <div class="box box1">子级</div>
      <div class="box box2">子级</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Toolbar",
  data() {
    return {
      items: [
        { key: 1, color: "#ffebcc" },
        { key: 2, color: "#ffb86c" },
        { key: 3, color: "#f01b2d" }
      ],

      dragging: null,
      bg: ""
    };
  },
  methods: {
    handleDragStart(e, item) {
      this.dragging = item;
    },
    handleDragEnd(e, item) {
      this.dragging = null;
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      console.log("e, item)", e, item);
      e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
      // if (item === this.dragging) {
      //   return;
      // }
      // const newItems = [...this.items];
      // console.log(newItems);
      // const src = newItems.indexOf(this.dragging);
      // const dst = newItems.indexOf(item);

      // newItems.splice(dst, 0, ...newItems.splice(src, 1));

      // this.items = newItems;
    },
    color16() {
      //十六进制颜色随机
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
      return color;
    },
    over() {
      this.bg = this.color16();
      console.log("移动中");

      this.forbiddenChildePointerEvents = true;
    },
    leave() {
      this.bg = "";
      console.log("离开了");
      this.forbiddenChildePointerEvents = false;
    }
  }
};
</script>

<style scoped>
.big-box {
  width: 400px;
  height: 400px;
  background: #000;
}
.box {
  width: 200px;
  height: 200px;
  font-size: 30px;
  color: #fff;
}
.box1 {
  background: blue;
}
.box2 {
  background: red;
}
.container {
  width: 100%;
  height: 100%;
  /* position: absolute; */
  left: 0;
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  padding: 0;
}
.item {
  margin-right: 10px;
  transition: all linear 0.3s;
  width: 400px;
  height: 400px;
}
.forbidden-childe-pointer-events * {
  pointer-events: none;
}
</style>
