<template>
  <div class="">
    <div>
      <div class="copy-status">
        <span class="success">Copy success.</span>
        <span class="error">The browser is not supported.</span>
      </div>

      <button class="btn1">复制到内容111</button>

      <input type="text" value="复制到内容222">
      <button class="btn2">复制</button>

      <input type="text" value="剪贴内容333">
      <button class="btn3">剪贴</button>
    </div>
  </div>
</template>

<script>
var doc = window.document
var copyElem

function handleText (content) {
  if (!copyElem) {
    copyElem = doc.createElement('textarea')
    copyElem.id = '$XECopy'
    var styles = copyElem.style
    styles.width = '48px'
    styles.height = '24px'
    styles.position = 'fixed'
    styles.zIndex = '0'
    styles.left = '-500px'
    styles.top = '-500px'
    doc.body.appendChild(copyElem)
  }
  copyElem.value = content === null || content === undefined ? '' : ('' + content)
}

function copyText (content) {
  var result = false
  try {
    handleText(content)
    copyElem.select()
    copyElem.setSelectionRange(0, copyElem.value.length)
    result = doc.execCommand('copy')
    copyElem.blur()
  } catch (e) {}
  return result
}

/**
 * 复制内容到剪贴板
 * @param {String} content Text 内容
 */
function XEClipboard (content) {
  return copyText(content)
}

XEClipboard.copy = copyText


export default {
  name: '', // Pascal命名
  mixins: [],
  components: {},
  props: {},
  computed: {},
  data() {
    return {

    };
  },
  watch: {
  // temObj: {
  //   handler(newVal, oldVal) {},
  //   deep: true, // 深度
  //   immediate: true, // 立即执行
  // },
  },
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {
    var showtimeout
    function copyEvent (text) {
      clearTimeout(showtimeout)
      if (XEClipboard.copy(text)) {
        document.querySelector('.copy-status').className = 'copy-status success'
      } else {
        document.querySelector('.copy-status').className = 'copy-status error'
      }
      showtimeout = setTimeout(function () {
        document.querySelector('.copy-status').className = 'copy-status'
      }, 1500)
    }
    document.querySelector('.btn1').addEventListener('click', function (evnt) {
      copyEvent(evnt.target.innerText)
    })
    document.querySelector('.btn2').addEventListener('click', function (evnt) {
      let inpElem = evnt.target.previousElementSibling
      copyEvent(inpElem.value)
    })
    document.querySelector('.btn3').addEventListener('click', function (evnt) {
      let inpElem = evnt.target.previousElementSibling
      copyEvent(inpElem.value)
      inpElem.value = ''
    })
  },
  methods: {

  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.copy-status {
  height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
.copy-status>span {
  display: none;
}
.copy-status.success {
  color: green;
}
.copy-status.success>.success {
  display: block;
}
.copy-status.error {
  color: red;
}
.copy-status.error>.error {
  display: block;
}
</style>