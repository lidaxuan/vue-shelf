`
                <!-- ① forbiddenTags 攻击 -->
                <script>alert("script 标签 XSSaaaaaaaaaaaa")<\/script>
                <iframe srcdoc="<script>alert('iframe srcdoc XSSbbbbbbbbbbbbbb')<\\/script>"></iframe>
                <iframe src="data:text/html,<script>alert('data URL XSSoooooooooooooooo')<\\/script>"></iframe>

                <object data="javascript:alert('object XSSccccccccccccc')"></object>
                <embed src="javascript:alert('embed XSSdddddddddddddddd')"></embed>

                <link rel="import" href="data:text/html,<script>alert('link XSSeeeeeeeeeeeeeeeee')<\\/script>">
                <meta http-equiv="refresh" content="0;url=javascript:alert('meta refresh XSSfffffffffffffff')">
                <base href="javascript:alert('base XSSggggggggggggg')">
                <a href="https://www.baidu.com" target="_blank">点我</a>
                <!-- ② forbiddenAttrNames (事件监听) -->
                <img src="https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/21/ed7ff4db14e846d1aef222fdca90fb6a.jpg" onclick="alert('onclick XSShhhhhhhhhhhhhhhhh')"/>
                <img src="https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/21/ed7ff4db14e846d1aef222fdca90fb6a.jpg" onerror="alert('onerror XSSiiiiiiiiiiiiiiii')"/>
                <img src="data:text/javascript,alert('data js XSSpppppppppppppppppppppp')">

                <svg t="1745996402317" class="icon configIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2096" width="48" height="48"><path d="M209.00407142 7.00678432a201.99728572 201.99728572 0 0 1 201.99728572 201.9972871v605.99185716a201.99728572 201.99728572 0 1 1-403.99457282 0V209.00407142a201.99728572 201.99728572 0 0 1 201.9972871-201.9972871z m605.99185716 0a201.99728572 201.99728572 0 0 1 201.9972871 201.9972871v605.99185716a201.99728572 201.99728572 0 1 1-403.99457282 0V209.00407142a201.99728572 201.99728572 0 0 1 201.99728572-201.9972871z" fill="#2c2c2c" p-id="2097"></path></svg>
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


export const str = ` 
<script>setTimeout(() => {alert(JSON.stringify(111))}, 1000)</script>
<br>
<a href="data:text/html,<script>alert(1)</script>">x</a>
<a href="JaVaScRiPt:alert(1)">JaVaScRiPtx</a>
<div style="width: expression(alert(1))"></div>

&lt;script&gt;alert(11111)&lt;/script&gt;

<img src="x" o<!-- -->nerror="alert(1)">

<base href="javascript:alert(1)//">
<a href="test">click</a>
1
<img src="https://kcall-test-oss.oss-cn-beijing.aliyunasdcs.com/material/1/2025/8/21/ed7ff4db14e846d1aef222fdca90fb6a.jpg" onerror="alert('onerror XSSiiiiiiiiiiiiiiii')"/>
2

<br>
<svg>
  <animate attributeName="href" from="javascript:alert(1)" to="javascript:alert(1)" />
</svg>

<br>
<svg>
  <a xlink:href="javascript:alert(1)">
    <text>click</text>
  </a>
</svg>

<br>
<iframe srcdoc="<script>alert('我看看你们有没有做防攻击')</script>"></iframe>
<br>
<a href="https://www.baidu.com" target="_blank">李大玄3</a>
<br>
<img src="https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/21/ed7ff4db14e846d1aef222fdca90fb6a.jpg" onclick="alert('李大玄4')"/>
<br>
<img src="https://kcall-test-oss.oss-cn-beijing.aliyuncs.com/material/1/2025/8/21/ed7ff4db14e846d1aef222fdca90fb6a.jpg" onerror="alert('李大玄5')"/>
<br>
<img src="x" onerror="alert(1)">
<br>
<a href="javascript:alert(1)">click</a>
<br>
<a href="JaVaScRiPt:alert(1)">x</a>
<a href="javascript : alert(1)">x</a>

<br>
<a href="javascript:alert('李大玄6')">javascript 链接</a>
<br>
<a href="vbscript:alert('李大玄7')">vbscript 链接</a>
<br>
<svg t="1745996402317" class="icon configIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2096" width="48" height="48"><path d="M209.00407142 7.00678432a201.99728572 201.99728572 0 0 1 201.99728572 201.9972871v605.99185716a201.99728572 201.99728572 0 1 1-403.99457282 0V209.00407142a201.99728572 201.99728572 0 0 1 201.9972871-201.9972871z m605.99185716 0a201.99728572 201.99728572 0 0 1 201.9972871 201.9972871v605.99185716a201.99728572 201.99728572 0 1 1-403.99457282 0V209.00407142a201.99728572 201.99728572 0 0 1 201.99728572-201.9972871z" fill="#2c2c2c" p-id="2097"></path></svg>
<br>
<svg style="width: 20px; height: 20px;background: brown" onload="alert('李大玄8')"></svg>
<br>
<svg style="width: 20px; height: 20px;background: yellow">
  <a xlink:href="javascript:alert('xlink:href XSSlllllllllllllllllll')">SVG 链接</a>
</svg>
<br>
<link rel="import" href="data:text/html,<script>alert('link XSSeeeeeeeeeeeeeeeee')<\\/script>">
<br>
<meta http-equiv="refresh" content="0;url=javascript:alert('meta refresh XSSfffffffffffffff')">
<br>
<base href="javascript:alert('base XSSggggggggggggg')">
<br>
<!-- <script> --> <script>alert(1)</script>
<br>
<p style="width: 100px;height: 100px;background: yellow">asdsad</p>
`

export const str2 = `<!-- <script> --> <script>alert(1)</script>`
export const str3 = `<script>setTimeout(() => {alert(JSON.stringify(111))}, 1000)</script>`
export const str4 = `<iframe srcdoc="<script>alert('我看看你们有没有做防攻击')</script>"></iframe>`
export const str5 = `<p style="width: 100px;height: 100px;background: yellow">asdsad</p>`
  //"{\"source\":\"C2B\",\"content\":\"<iframe srcdoc=\\\"<script>alert('李大玄2')</script>\\\"></iframe>\",\"senceType\":\"\"}"
