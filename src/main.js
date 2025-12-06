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
import router from "./router";
import "./assets/styles/index.scss";
import "./assets/styles/base/index.scss";
import elementUi from 'element-ui';
import IconFont from './components/IconFont';
import Directives from './directives';

Vue.use(IconFont);
Vue.use(elementUi, { size: 'small' });
Vue.use(Directives);
import './element-variables.scss';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app-base")
