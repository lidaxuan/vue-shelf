/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/router/index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);



const routes = [
  {
    path: "/",
    name: "", // ImplementationComponent
    // component: () => import(/* webpackChunkName: "about" */ "../views/showComponents/showResize.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "@/views/test/scrollXY"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "@/views/test/timeSelect/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/dropdownDemo.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "@/views/configJson/index"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/study/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/pannellum.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/About.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/table/test.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/dxw.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/abcde/App.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/testResize.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/drageDemo.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/testLoading/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/testswiper.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/swiper.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/Luckysheet/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/study/test.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/study/drag.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/Luckysheet/tableChange.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/MultipleRenderingComponents/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/dragResize/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/testCompUpdata/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/testMixins"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/testStore/testStore"), // optimization // testSelect fontClass
    component: () => import(/* webpackChunkName: "about" */ "../views/cssFilter/index.vue"), // optimization // testSelect fontClass
  },
  {
    path: "/sheet",
    name: "showdigitroll",
    component: () => import(/* webpackChunkName: "about" */ "../views/Luckysheet/index"), // optimization // testSelect fontClass
  }, {
    path: "/showdigitroll",
    name: "showdigitroll",
    component: () => import(/* webpackChunkName: "about" */ "../views/showComponents/showResize.vue"), // optimization // testSelect fontClass
  },
  {
    path: "/optimization",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/optimization"),
  },
  {
    path: "/testSelect",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/testSelect"),
  },
  {
    path: "/deconstruction",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/deconstruction"),
  },
  {
    path: "/dataWorkType",
    component: () => import(/* webpackChunkName: "about" */ "../views/test/testSelect"),
  },
];
let AppRoutes = [];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: routes.concat(AppRoutes),
  mode: 'hash'
});


export default router;