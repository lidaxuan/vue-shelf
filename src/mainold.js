/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/main.js
 */
import Vue from "vue";
import App from "./App.vue";
import { store } from './store';

function loadScript(url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement("Script");
    script.type = "text/javascript";

    script.onload = resolve;
    script.onerror = reject;
    script.src = url;
    //把新建的<Script>添加到<head>里比添加到<body>里更保险。
    document.getElementsByTagName("head")[0].appendChild(script);
  });
}

import "./assets/styles/index.scss";
import "./assets/styles/base/index.scss";

Vue.config.productionTip = false;

import elementUi from 'element-ui';
import IconFont from './components/IconFont';
import Directives from './directives';

Vue.use(IconFont);
Vue.use(elementUi, { size: 'small' });
Vue.use(Directives);


// import Table from "./components/table";

// Vue.component('Table', Table)
import './element-variables.scss';



// import draggable from './utils/a';

// Vue.directive('draggable', draggable)

import { robotServer, eachbotFlowAdminWeb } from './service';
import { viewBase } from './service';

Vue.prototype.$HttpRobot = robotServer; //机器人serve
// Vue.prototype.$HttpFlowAdmin = eachbotFlowAdminWeb; //标签 serve
// import structDemoClient from './dao/axios/structDemoClient';
// import viewBase from './dao/axios/viewBase';

// Vue.prototype.$structDemoClient = structDemoClient; //标签 serve
Vue.prototype.$viewBase = viewBase; //标签 serve


import router from "./router";
loadScript("https://statics.easyliao.com/web/vue/project/plat/platBase.js").then(() => {
  //要进行的操作
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app-base");
});



function loadJS(src) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}

function loadCSS(href) {
  return new Promise(function (resolve, reject) {
    var link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    link.onload = resolve;
    link.onerror = reject;
    document.getElementsByTagName('head')[0].appendChild(link);
  });
}

window.addEventListener('error', function (event) {
  if (window.location.protocol == "https:") {
    return;
  }
  var element = event.target;
  if (element.tagName === "SCRIPT" && element.src.indexOf('http://') !== -1) {
    var src = element.src.replace('http://', 'https://');
    loadJS(src).then(function () {
      console.log("Loaded script: " + src);
    }).catch(function () {
      console.log("Failed to load script: " + src);
    });
  } else if (element.tagName === "LINK" && element.href.indexOf('http://') !== -1) {
    var href = element.href.replace('http://', 'https://');
    loadCSS(href).then(function () {
      console.log("Loaded style sheet: " + href);
    }).catch(function () {
      console.log("Failed to load style sheet: " + href);
    });
  }
});
