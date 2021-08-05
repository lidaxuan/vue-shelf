/* jshint esversion: 6 */
/*
 * @Description:
 * @Author: 李继玄（15201002062@163.com）
 * @Date: 2021-03-29 11:00:24
 * @FilePath: /vue-shelf/src/router/index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "about" */ "../views/icon.vue"), // optimization // testSelect
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/ed",
    name: "ed",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ed.vue"),
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
];
console.log(process.env);
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
