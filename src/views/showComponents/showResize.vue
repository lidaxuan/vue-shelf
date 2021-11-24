<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-11-11 16:56:45
 * @FilePath: /vue-shelf/src/views/showComponents/showResize.vue
-->
<template>
  <div class="flex">
    <div class="w200 h200" style="background: blue"></div>
    <div class="flex flex-column">
      <div class="ml20">
        <ul>
          <li v-for="(val, key) in move" :key="key" class="flex flex-aic" font="20">
            {{ key }}:
            <el-switch
              style="display: block"
              v-model="move[key]"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
              active-text="开启"
              inactive-text="关闭"
            >
            </el-switch>
          </li>
        </ul>

        <div class="flex flex-aic">
          <div class="flex w50">步长:</div>
          <el-input v-model.number="speed"></el-input>
        </div>

        <el-switch
          style="display: block"
          v-model="disabled"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="false"
          :inactive-value="true"
          active-text="启用"
          inactive-text="禁用"
        >
        </el-switch>
      </div>
      <Resize
        :disabled="disabled"
        :min="{ width: 0, height: 0 }"
        :max="{ width: 0, height: 0 }"
        :speed="speed"
        :move="move"
        style="background: pink; width: 300px; height: 200px"
        class="mr20"
      >
        <p>111</p>
        <div>
          起源于西周时期的宗法制对我国社会的发展产生了深远影响，尤其是对当今家族式企业的发展影响更不可忽视。随着国内创一代的逐渐老去，当年创一代所辛苦打下来的基业面前遇到后续如何传承的问题。这其中有以严介和之子严昊为代表的子承父业，也有以美的董事长何享健之子何剑锋另起炉灶。
        </div>
      </Resize>
    </div>
    <div class="flex flex-column">
      <div class="flex">
        <pre>{{ resizeObj }}</pre>
        <div>
          <li v-for="(val, key) in resizeObj.move" :key="key" class="flex flex-aic" font="20">
            {{ key }}:
            <el-switch
              style="display: block"
              v-model="resizeObj.move[key]"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false"
              active-text="开启"
              inactive-text="关闭"
            >
            </el-switch>
          </li>

          <div class="flex flex-aic">
            <div class="flex w50">步长:</div>
            <el-input v-model.number="resizeObj.speed"></el-input>
          </div>

          <el-switch
            style="display: block"
            v-model="resizeObj.disabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="false"
            :inactive-value="true"
            active-text="启用"
            inactive-text="禁用"
          >
          </el-switch>
        </div>
      </div>
      <div :key="compKey" v-resize="resizeObj" style="background: green; width: 300px; height: 200px" class="mr20 ml30">
        起源于西周时期的宗法制对我国社会的发展产生了深远影响，尤其是对当今家族式企业的发展影响更不可忽视。随着国内创一代的逐渐老去，当年创一代所辛苦打下来的基业面前遇到后续如何传承的问题。这其中有以严介和之子严昊为代表的子承父业，也有以美的董事长何享健之子何剑锋另起炉灶。
      </div>
    </div>

    <!-- <el-button @click="onPreview">预览</el-button> -->
    <!-- <ElImageViewer v-if="showViewer" :on-close="closeViewer" :url-list="srcList" /> -->
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import Resize from '@/components/resize/index.vue';
const directionArr = ['t', 'l', 'r', 'b', 'tl', 'tr', 'bl', 'br'];
const directionObj = {};
for (let i = 0; i < directionArr.length; i++) {
  directionObj[directionArr[i]] = true;
}

import _ from 'lodash';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
export default {
  name: '', // Pascal命名
  mixins: [],
  components: {
    Resize,
    ElImageViewer,
  },
  props: {},
  data() {
    return {
      compKey: _.uniqueId(),
      resizeObj: {
        max: {
          width: 0,
          height: 0,
        },
        min: {
          width: 0,
          height: 0,
        },
        speed: 1,
        disabled: false,
        move: {
          t: true, // top
          l: true, // left
          r: false, // right
          b: true, // bottom
          tl: true, // top left
          tr: true, // top right
          bl: true, // bottom left
          br: true, // bottom right<br />}
        },
      },
      // -------------------
      disabled: false,
      speed: 1,
      move: directionObj,
      arr: [
        {
          name: '起源于西周时期的宗法制对我国社会的发展产生了深远影响，尤其是对当今家族式企业的发展影响更不可忽视。随着国内创一代的逐渐老去，当年创一代所辛苦打下来的基业面前遇到后续如何传承的问题。这其中有以严介和之子严昊为代表的子承父业，也有以美的董事长何享健之子何剑锋另起炉灶。',
        },
      ],
    };
  },
  computed: {},
  watch: {
    resizeObj: {
      handler(newVal, oldVal) {
        console.log(newVal);
        this.compKey = _.uniqueId();
      },
      deep: true, // 深度
      immediate: true, // 立即执行
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
    onPreview() {
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
    },
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>



export default {
    components: { ElImageViewer },
    data() {
     return {
      
     }
    },
    methods: {
   
    }
}