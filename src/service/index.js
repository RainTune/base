import axios from "axios";
import toast from "show-toast";
import store from "@/store";
import router from "@/router";
let myFlag = "";
let baseURL = "/api";
if (
  process.env.NODE_ENV == "production" &&
  process.env.VUE_APP_MODE == "preProduction"
) {
  baseURL = "http://172.16.81.183:8081";
} else if (process.env.NODE_ENV == "production") {
  baseURL = "https://cbm.hdfax.com";
}
let generateKey = function(url, method, data) {
  let strData = JSON.stringify(data);
  return `${url || ""}${method || ""}${strData || ""}`;
};

const instance = axios.create({
  baseURL,
  timeout: 9000,
  withCredentials: true
});
// 请求拦截
instance.interceptors.request.use(
  function(config) {
    let requestKey = generateKey(config.url, config.method, config.data);
    if (myFlag == requestKey) {
      return Promise.reject({
        code: "CANCEL"
      });
    }
    store.commit("showLoading", true); //显示加载中
    config.cancelToken = new axios.CancelToken(function(cancel) {
      store.commit("pushToken", { cancelToken: cancel });
    });
    myFlag = requestKey;

    // 请求头添加token
    config.headers.token = store.state.userToken;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

/* 拦截返回预处理---获取数据 */
instance.interceptors.response.use(
  function(response) {
    myFlag = "";
    store.commit("showLoading", false); // 关闭loading
    const data = response.data;
    if (data.ret == 0) {
      data.success = true;
    } else if (data.ret == 1053) {
      toast(data.msg);
      store.dispatch("clearUserInfo").then(() => router.push("/login"));
    } else {
      data && toast(data.msg || "请求数据失败！！！");
    }
    return data;
  },
  function(error) {
    myFlag = "";
    store.commit("showLoading", false); // 关闭loading
    // 如果是连续发起的请求，或是由于路由跳转从而需要取消当前的请求
    if (error.code === "CANCEL") {
      return Promise.reject(error);
    }
    if (error.message.indexOf("Network") > -1) {
      toast("暂无网络！！！");
      return Promise.reject(error);
    }
    if (error.message.indexOf("timeout") > -1) {
      toast("请求超时！！！");
      return Promise.reject(error);
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
