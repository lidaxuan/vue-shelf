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

import "./assets/styles/index.scss";
import "./assets/styles/base/index.scss";
Vue.config.productionTip = false;
import elementUi from 'element-ui';

import './element-variables.scss';

Vue.use(elementUi);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
