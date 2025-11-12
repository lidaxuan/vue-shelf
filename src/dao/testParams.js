import {sanitizePayload} from "./sanitizer";

// 1️⃣ 基础测试：简单输入（纯文本 + XSS 字符）
const testCase_basic = {
  username: 'normalUser',
  bio: '<script>alert("xss")</script>',
  comment: '<div onclick="alert(1)">点击我</div>'
};

// 2️⃣ HTML 安全字段测试（允许部分字段保留 HTML）
const testCase_htmlAllow = {
  title: '<b>粗体标题</b>',
  desc: '<i onclick="alert(1)">带事件的标签</i>',
  content: '<p>段落内容<script>alert(2)</script></p>',
  footer: '<a href="javascript:alert(3)">点我</a>'
};

// 3️⃣ 深层嵌套对象
const testCase_nested = {
  user: {
    name: 'Tom<script>alert(1)</script>',
    profile: {
      desc: '<img src="https://www.baidu.com" onerror=alert(2)>',
      links: [
        '<iframe src="evil.com"></iframe>',
        '<b>正常加粗</b>'
      ]
    }
  },
  token: 'abc123'
};

// 4️⃣ 数组场景（模拟批量提交）
const testCase_array = [
  {id: 1, content: '<svg onload=alert(1)></svg>'},
  {id: 2, content: '<p>安全内容</p>'},
  {id: 3, content: '<div onmouseover="alert(3)">hover测试</div>'}
];

// 5️⃣ 较复杂混合场景（常见于实际请求）
const testCase_mixed = {
  name: 'User<iframe src="evil.com"></iframe>',
  desc: '<b>bold</b><script>alert(1)</script>',
  list: [
    {text: '<img src=x onerror=alert(1)>'},
    {text: '纯文本'},
  ],
  meta: {
    safe: true,
    tags: ['<svg onload=alert(9)>', 'vue', '<div onclick=alert(10)>X</div>']
  }
};

// `个人--18我是机器人内容118我是机器人内容118我是机器人内人内容2[拇指向上][红心][怒火中烧][冷脸][晕]<img height="68" src="https://webcall-oss.easyliao.com/1/2025/10/27/59f2f1e0d36c4be0913374b2aba2a191.jpg"><img height="68" src="https://webcall-oss.easyliao.com/1/2025/10/27/eab604bd75634a159eb95b715e9fd412.png">容118我是机器人内容118我是机器[心碎][飞吻]`
const params = {
  "chatId": "795707351905599545",
  "message": "个人--18我是机器人内容118我是机器人内容118我是机器人内人内容2[拇指向上][红心][怒火中烧][冷脸][晕]<img height=\"68\" src=\"https://webcall-oss.easyliao.com/1/2025/10/27/59f2f1e0d36c4be0913374b2aba2a191.jpg\"><img height=\"68\" src=\"https://webcall-oss.easyliao.com/1/2025/10/27/eab604bd75634a159eb95b715e9fd412.png\">容118我是机器人内容118我是机器[心碎][飞吻]<iframe src='www.baidu.com'></iframe><a href='www.baidu.com'>链接</a>",
  "type": "RECORD_RECORD",
  "exts": {"SYS_BODY_JSON": "{}"}
}

const client = {
  "ext.autojoinchat" : "0",
  "ext.delayTime" : "40",
  "extBodyJson" : "{\n   \"autojoinchat\" : \"0\",\n   \"delayTime\" : \"40\"\n}\n",
  "message" : "<p>机器人自我介绍asdasdasd<img height=\"18\" src=\"http://test-prd18.easyliao.net/el-client-view/qt5/v1.0.0/html/images/emotion/37.png\"><img height=\"18\" src=\"http://test-prd18.easyliao.net/el-client-view/qt5/v1.0.0/html/images/emotion/38.png\"></p>"
}

const test9 = {
  "enabled": 0,
  "chatCreateEnable": 0,
  "chatCreateCommonReply": {
    "sendTimes": 1,
    "visitorInputStopSend": null,
    "contents": [
      {
        "sec": 0,
        "content": "<iframe src=\"www.baodu.com\" frameborder=\"0\"></iframe>&lt;p&gt;asd<span style=\"font-family: 黑体;\">asd</span> as<strong>dasdfreaqgryiikgymjdu7yu 阿斯达</strong></p><p><strong>阿尔特刚问过好</strong>儿童观<span style=\"font-size: 13px;\">儿童钙hertghrew</span>thwrjr7<span style=\"font-size: 22px;\">tuik 高危儿t6i</span>7ujtegh<span style=\"color: rgb(54, 88, 226);\">67ukrdsrtgbtyhjku</span>9itd通过<span style=\"background-color: rgb(225, 60, 57);\">后建议UK规划</span>局<em>可</em>退{keyword}</p>"
      }
    ]
  },
  "chatCreateKeywordReply": {
    "sendTimes": 1,
    "visitorInputStopSend": null,
    "contents": [
      {
        "sec": 0,
        "content": "11<audio src=\"www.baodu.com\"></audio>22"
      }
    ]
  },
  "userTimeoutEnable": 0,
  "userTimeoutReply": {
    "sendTimes": 1,
    "visitorInputStopSend": null,
    "contents": [
      {
        "sec": 0,
        "content": ""
      }
    ]
  },
  "visitorTimeoutEnable": 0,
  "visitorTimeoutReply": {
    "sendTimes": 1,
    "visitorInputStopSend": null,
    "contents": [
      {
        "sec": 0,
        "content": ""
      }
    ]
  },
  "visitorInputStopSend": 0,
  "chatEndEnable": 0,
  "chatEndReply": {
    "sendTimes": 1,
    "visitorInputStopSend": null,
    "contents": [
      {
        "sec": 0,
        "content": ""
      }
    ]
  },
  "userId": "dev-ljx1",
  "createUserId": "dev-ljx1",
  "createTime": 1762938688211,
  "updateUserId": "dev-ljx1",
  "updateTime": 1762938688203
}

setTimeout(() => {
  document.getElementById("box").innerHTML = testCase_basic.comment
}, 1000)

// console.log('✅ 测试1 basic', JSON.parse(JSON.stringify(sanitizePayload(testCase_basic))));
// console.log('✅ 测试2 htmlAllow',JSON.parse(JSON.stringify(sanitizePayload(testCase_htmlAllow, ['title', 'content']))) );
// console.log('✅ 测试3 nested',JSON.parse(JSON.stringify(sanitizePayload(testCase_nested))) );
// console.log('✅ 测试4 array',JSON.parse(JSON.stringify(sanitizePayload(testCase_array))) );
// console.log('✅ 测试5 mixed',JSON.parse(JSON.stringify(sanitizePayload(testCase_mixed))) );
// console.log('✅ 测试6 params',JSON.parse(JSON.stringify(sanitizePayload(params, ['']))) );
// console.log('✅ 测试7 空', sanitizePayload("", ['']));
// console.log('✅ 测试8 client', sanitizePayload(client));
console.log('✅ 测试9 test9', sanitizePayload(test9));


// axios.interceptors.request.use(config => {
//   const originalData = config.data
//   const originalParams = config.params
//
//   if (config.data) {
//     config.data = sanitizePayload(config.data, /* 可传额外允许列表 */ []);
//     debugSanitizeDiff(originalData, config.data);
//   }
//   if (config.params) {
//     config.params = sanitizePayload(config.params, []);
//     debugSanitizeDiff(originalParams, config.params);
//   }
//   return config;
// });
