<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-16 10:24:00
 * @FilePath: /vue-shelf/src/views/focus.vue
-->
<template>
  <div class="p20">
    1
    <!-- <div class="w100 h100" style="background: pink" @click="handleFullScreen"></div> -->
    <!-- <input type="text" class="h100 w300"  v-focus placeholder="nihao"> -->
    <br />
    <!-- <el-input placeholder="123123" v-focus></el-input> -->

    <!-- <div v-focus>
      sad
      <div>123123</div>
    </div> -->

    <!-- <div>
      <template v-for="item in 10">
        <el-input :placeholder="`asdd${item}`" :key="item" v-focus></el-input>
      </template>
    </div> -->
    <!-- <div v-focus>
      <template v-for="item in 10">
        <el-input :placeholder="`asdd${item}`" :key="item" ></el-input>
      </template>
    </div> -->
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      fullscreen: false,
    };
  },
  methods: {
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
};
</script>
