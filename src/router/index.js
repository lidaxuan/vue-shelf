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
    // component: () => import(/* webpackChunkName: "about" */ "../views/Luckysheet/index.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "../views/test/dropdownDemo.vue"), // optimization // testSelect fontClass
    // component: () => import(/* webpackChunkName: "about" */ "@/views/configJson/index"), // optimization // testSelect fontClass
    component: () => import(/* webpackChunkName: "about" */ "../views/study/index.vue"), // optimization // testSelect fontClass
  },
  {
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
  routes: routes.concat(AppRoutes)
});

setTimeout(() => {
  console.log();
  AppRoutes = router.addRoute(handleRoutes.getRoutes(['about', 'home', 'configWorkType']))
  
}, 300);

export default router;