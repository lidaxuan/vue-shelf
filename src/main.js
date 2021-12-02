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
// import directives from "./directives";
// Vue.use(directives)
import Directives from '@lijixuan/vue-customdirectives';
Vue.use(Directives)

import "./assets/styles/index.scss";
import "./assets/styles/base/index.scss";
Vue.config.productionTip = false;
import elementUi from 'element-ui';

import draggable from './utils/a';

import './element-variables.scss';

Vue.directive('draggable', draggable)

import IconFont from './components/IconFont';
Vue.use(IconFont);
import pin from './directives/pin'
Vue.use(pin)

import './directives/waves.css'

const link = document.createElement('link');
link.rel = "stylesheet"
link.href = 'http://at.alicdn.com/t/font_2481220_2xx8kuodrwk.css'

document.querySelector('head').appendChild(link);

Vue.use(elementUi);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
