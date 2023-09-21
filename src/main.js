/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/main.js
 */
import Vue from "vue";
import App from "./App.vue";
// import loading from './views/testLoading/loading'
// import loading from '@lijixuan/loading';
import { store } from './store';

// import { createPinia, PiniaVuePlugin } from 'pinia'
// Vue.use(PiniaVuePlugin)
// const pinia = createPinia()

// import VueDraggableResizable from 'vue-draggable-resizable'

// import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

// Vue.component('VueDraggableResizable', VueDraggableResizable)


// loading.initMask({
//   text: '我是李大玄',
//   fullscreen: true,
//   // background: 'yellow',
//   customClass: '',
//   color: 'red'
// })
// window.loading = loading;

// import hljs from "highlight.js";
// import "highlight.js/styles/atelier-cave-dark.css";

// Vue.directive("highlight", function (el) {
//   let blocks = el.querySelectorAll("pre code");
//   blocks.forEach((block) => {
//     hljs.highlightBlock(block);
//   });
// });

// import './directives/waves.css';
// import 'swiper/dist/js/swiper.min';
import "./assets/styles/index.scss";
// import 'swiper/dist/css/swiper.min.css';
import "./assets/styles/base/index.scss";

Vue.config.productionTip = false;

import elementUi from 'element-ui';
import IconFont from './components/IconFont';
// import Directives from '@lijixuan/vue-customdirectives';
import Directives from './directives';

Vue.use(IconFont);
Vue.use(elementUi, { size: 'small' });
Vue.use(Directives);


// import Table from "./components/table";

// Vue.component('Table', Table)
import './element-variables.scss';

// import draggable from './utils/a';

// Vue.directive('draggable', draggable)

// import { robotServer, eachbotFlowAdminWeb } from './service';
import { viewBase } from './service';

// Vue.prototype.$HttpRobot = robotServer; //机器人serve
// Vue.prototype.$HttpFlowAdmin = eachbotFlowAdminWeb; //标签 serve
// import structDemoClient from './dao/axios/structDemoClient';
// import viewBase from './dao/axios/viewBase';

// Vue.prototype.$structDemoClient = structDemoClient; //标签 serve
Vue.prototype.$viewBase = viewBase; //标签 serve


import router from "./router";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app-base");