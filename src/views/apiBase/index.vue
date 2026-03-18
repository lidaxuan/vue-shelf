<template>
  <div class="" style="width: 100%;height: 100%;background: pink">
    <button @click="copyFn(html)">复制</button>
    <div v-html="bbbbb">

    </div>
  </div>
</template>

<script>
import { xssSanitizePayload} from "@/dao/sanitizer";
// &lt;iframe srcdoc="<script>alert('iframe XSS')<\/script>"&gt;&lt;/iframe&gt;
import {str} from "./xss";
export default {
  name:'',  // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      html: str,
      aaaa: {
        content: ''
// <!--<p style="text-align: right;">香<span style="font-family: 仿宋;">港</span><span style="font-family: 楷体;">警方展开调查</span><span style="font-size: 29px; font-family: 楷体;">，</span><span style="font-size: 29px; font-family: 仿宋;">发现</span><span style="font-size: 29px;">建筑物外</span>墙<a href="https://www.baidu.com/" target="_blank">有保护网、</a>防水帆布、<span style="color: rgb(235, 144, 58);">塑料布，疑未符合</span>防火<strong>标准，另有一座</strong>未<em>波及的大厦每</em>层电梯大<u>堂窗外都有发泡</u>胶包封，易燃且可能加速{keyword}火势蔓延，不排除发泡胶是迅速蔓<img src="http://kcall-test-oss.oss-cn-beijing.aliyuncs.com/clint-webcall-api/fileupload/2025/11/27/408f0b6f74fb47daaacbeb907b2ef737.png" alt="" data-href="" style="">延的原因。警方发现一工程公司负责安装上述相关材料，相信该工程公司负责人严重疏忽，</p>-->`
      },
      bbbbb: {}
    };
  },
  computed: {},
  watch: {
  },
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {
    /**
     * 通用复制方法
     * @param {string} value 要复制的文本
     * @param {Object} options 额外配置
     * @param {boolean} options.keepLineBreak 是否保留换行（默认 true）
     * @param {Function} options.onSuccess 复制成功回调
     * @param {Function} options.onError 复制失败回调
     */


    // this.bbbbb = xssSanitizePayload(`<!--<a href="vbscript:alert('vbscript XSS')nnnnnnnnnnnnnnnnnnnn">vbscript 链接</a>-->`);
    // this.bbbbb = xssSanitizePayload(`<!--<a href="https://www.baidu.com" target="_blank">李大玄3</a>-->`);
    // this.bbbbb = xssSanitizePayload(str);
    this.bbbbb = window.ELBaseUtils.xssSanitizePayload(str);
    //
    console.log(123321, this.bbbbb)
    // console.log(JSON.parse(this.bbbbb))
  },
  methods: {
    copyFn(value, {
      keepLineBreak = true,
      onSuccess = () => {},
      onError = () => {}
    } = {}) {
      try {
        // 创建元素（textarea 支持换行，input 只能单行）
        const el = keepLineBreak ? document.createElement("textarea") : document.createElement("input");

        // 设置文本，去掉换行时替换为一个空格
        el.value = keepLineBreak ? value : value.replace(/\n/g, ' ');

        // 防止页面滚动闪动
        el.style.position = "fixed";
        el.style.top = "-9999px";
        el.style.left = "-9999px";
        el.style.opacity = "0";

        document.body.appendChild(el);
        el.select();
        el.setSelectionRange(0, el.value.length); // 移动端兼容

        const success = document.execCommand("copy");

        document.body.removeChild(el);

        if (success) {
          onSuccess();
        } else {
          throw new Error("复制命令返回 false");
        }
      } catch (err) {
        console.error("复制失败:", err);
        onError(err);
      }
    }
  }
};
</script>
<style lang='scss' scoped>

</style>
