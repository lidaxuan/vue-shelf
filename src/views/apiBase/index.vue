<template>
  <div class="">123123



   aaaa:
    <br>
    <div v-html="aaaa.content"></div>

    <hr>
    <hr>
    <hr>
    <hr>
    <hr>
    bbbbb:v-html
    <hr>
    <pre v-html="bbbbb.content"></pre>

    <hr>
    <hr>
    <hr>
    <hr>
    v-text
<!--    <pre v-text="bbbbb.content"></pre>-->

    <hr>
    <hr>
    <hr>
    <hr>


<!--    <div id="box"></div>-->
  </div>
</template>

<script>
import {sanitizePayload} from "@/dao/sanitizer";
// &lt;iframe srcdoc="<script>alert('iframe XSS')<\/script>"&gt;&lt;/iframe&gt;
export default {
  name:'',  // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      aaaa: {
        // html: "<script>alert(111)<" + "/script>",
        content: `
                <!-- ① forbiddenTags 攻击 -->
                <script>alert("script 标签 XSSaaaaaaaaaaaa")<\/script>
                <iframe srcdoc="<script>alert('iframe srcdoc XSSbbbbbbbbbbbbbb')<\\/script>"></iframe>
                <iframe src="data:text/html,<script>alert('data URL XSSoooooooooooooooo')<\\/script>"></iframe>.

                <object data="javascript:alert('object XSSccccccccccccc')"></object>
                <embed src="javascript:alert('embed XSSdddddddddddddddd')"></embed>

                <link rel="import" href="data:text/html,<script>alert('link XSSeeeeeeeeeeeeeeeee')<\\/script>">
                <meta http-equiv="refresh" content="0;url=javascript:alert('meta refresh XSSfffffffffffffff')">
                <base href="javascript:alert('base XSSggggggggggggg')">
                <!-- ② forbiddenAttrNames (事件监听) -->
                <img src="https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/21/ed7ff4db14e846d1aef222fdca90fb6a.jpg" onclick="alert('onclick XSShhhhhhhhhhhhhhhhh')"/>
                <img src="https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/21/ed7ff4db14e846d1aef222fdca90fb6a.jpg" onerror="alert('onerror XSSiiiiiiiiiiiiiiii')"/>
                <img src="data:text/javascript,alert('data js XSSpppppppppppppppppppppp')">

                <svg onload="alert('svg onload XSSjjjjjjjjjjjjjjj')"></svg>
                <svg>
                  <a xlink:href="javascript:alert('xlink:href XSSlllllllllllllllllll')">SVG 链接</a>
                </svg>

                <button formaction="javascript:alert('formaction XSSkkkkkkkkkkkkkkkkk')">按钮</button>

                <!-- ③ forbiddenProtocols -->
                <a href="javascript:alert('href javascript XSSmmmmmmmmmmmmmmmmmmm')">javascript 链接</a>
                <a href="vbscript:alert('vbscript XSS')nnnnnnnnnnnnnnnnnnnn">vbscript 链接</a>


                <!-- ④ style 内联攻击 -->
                <div style="background:url(javascript:alert('style 内 javascriptqqqqqqqqqqqqqqqqqqq'))">
                  style url(javascript:) XSS
                </div>
                <div style="background-image:url(vbscript:alert(11111111111111111111))">
                  style url(vbscript:) XSS
                </div>
                <div style="background:url(data:text/html,<script>alert('style data XSSrrrrrrrrrrrrrrrrrrr')<\\/script>)">
                  style url(data:) XSS
                </div>
`
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
    this.bbbbb = sanitizePayload(this.aaaa);
    console.log(this.bbbbb.content)
  },
  methods: {

  }
};
</script>
<style lang='scss' scoped>

</style>
