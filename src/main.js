/* jshint esversion: 6 */
/*
 * @Description: 
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import './directives/waves.css';
import 'swiper/dist/js/swiper.min';
import "./assets/styles/index.scss";
import 'swiper/dist/css/swiper.min.css';
import "./assets/styles/base/index.scss";
Vue.config.productionTip = false;

import elementUi from 'element-ui';
import pin from './directives/pin';
import IconFont from './components/IconFont';
import Directives from '@lijixuan/vue-customdirectives';
Vue.use(pin);
Vue.use(IconFont);
Vue.use(elementUi);
Vue.use(Directives);


import Table from "./components/table";
Vue.component('Table', Table)
import './element-variables.scss';

import draggable from './utils/a';
Vue.directive('draggable', draggable)


import { robotServer, eachbotFlowAdminWeb } from './service';
Vue.prototype.$HttpRobot = robotServer; //机器人serve
Vue.prototype.$HttpFlowAdmin = eachbotFlowAdminWeb; //标签 serve

// const link = document.createElement('link');
// link.rel = "stylesheet"
// link.href = 'http://at.alicdn.com/t/font_2481220_2xx8kuodrwk.css'
// document.querySelector('head').appendChild(link);


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
