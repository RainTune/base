import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import NProgress from "nprogress";
import { _import } from "@/util";
Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: _import("Home"),
      meta: { title: "登录" }
    },
    {
      path: "/about",
      name: "about",
      component: _import("About"),
      meta: { title: "关于" }
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = `${to.meta.title} - 恒大财富战报管理系统`;
  }
  store.commit("clearToken"); // 取消请求
  store.commit("showLoading", false);
  // if (to.path == "/updatePassword") {
  //   return next();
  // } else if (to.path != "/login" && !store.state.loginStatus) {
  //   let redirect = to.fullPath;
  //   // 注意在这里面加入NProgress.done();原因是，当点击退出按钮的时候，通过手动在地址栏输入路由时，进度条不会消失的状况。
  //   NProgress.done();
  //   return next({
  //     path: "/login",
  //     query: {
  //       redirect
  //     }
  //   });
  // }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
