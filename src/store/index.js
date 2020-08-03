import Vue from "vue";
import Vuex from "vuex";
import { getUserInfo } from "@/util";

Vue.use(Vuex);
let userInfo = getUserInfo();
export default new Vuex.Store({
  state: {
    loading: false, // 是否展示loading
    loadingCount: 0, // 当发起多个请求的时候，会有用
    cancelTokenArr: [], //取消请求token数组
    username: userInfo("username") || "", // 用户名
    loginStatus: !!userInfo("token"), // 是否登录标志
    userToken: userInfo("token") || "" // token
  },
  mutations: {
    showLoading(state, newValue) {
      // isChangeRoute 表示是否是路由跳转
      if (newValue) {
        state.loadingCount++;
        state.loading = newValue;
      } else {
        state.loadingCount--;
        if (state.loadingCount <= 0) {
          state.loading = newValue;
          state.loadingCount = 0;
        }
      }
      // state.loading = newValue;
    },
    pushToken(state, payload) {
      state.cancelTokenArr.push(payload.cancelToken);
    },
    clearToken({ cancelTokenArr }) {
      cancelTokenArr.forEach(item => {
        item("路由跳转取消请求");
      });
      cancelTokenArr = [];
    },
    updateUsername(state, newValue) {
      state.username = newValue;
    },
    updateLoginStatus(state, newValue) {
      state.loginStatus = newValue;
    },
    updateUserToken(state, newValue) {
      state.userToken = newValue;
    }
  },
  actions: {
    clearUserInfo({ commit, state }) {
      return new Promise(resolve => {
        localStorage.removeItem(state.username);
        commit("updateUsername", "");
        commit("updateLoginStatus", false);
        commit("updateUserToken", "");
        resolve();
      });
    }
  }
});
