<!--
 * @Description: 组件测试
 * @Author: 李大玄
 * @Date: 2021-11-01 09:24:56
 * @FilePath: /vue-shelf/src/views/testComp.vue
-->
<template>
  <div class="" v-pin>
    <div class="w200 h200" style="background: pink" v-waves="{ duration: 10000, type: 'hit | center' }" ></div>
    <el-button type="primary" @click="concatStr">新增</el-button>
    <el-input v-model="ipt" id="ipt" v-emoji.int="callback"></el-input>

    <div class="infinite-list h300 overauto" v-tableLoadmore="tableLoadmore">
      <div v-for="(item, index) in 100">ada的发生的VBvSBUB看宝宝CB {{ index }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ipt: '',
    };
  },
  methods: {
    callback(val) {
      console.log(val);
    },
    tableLoadmore(val) {
      console.log(val);
    },
    concatStr() {
      this.insertInputTxt('ipt', '这是插入的内容');
    },
    // 插入字符串
    insertInputTxt(id, insertTxt) {
      var elInput = document.getElementById(id);
      var startPos = elInput.selectionStart;
      var endPos = elInput.selectionEnd;
      if (startPos === undefined || endPos === undefined) return;
      var txt = elInput.value;
      var result = txt.substring(0, startPos) + insertTxt + txt.substring(endPos);
      elInput.value = result;
      this.ipt = result; // 赋值
      elInput.focus();
      this.$nextTick(() => {
        elInput.selectionStart = startPos + insertTxt.length;
        elInput.selectionEnd = startPos + insertTxt.length;
      });
    },
  },
};
</script>