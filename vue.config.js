// const IgnorePlugin = require("webpack").IgnorePlugin;
console.log("----------------");
console.log(process.env.NODE_ENV, process.env.VUE_APP_MODE);
console.log("----------------");
module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  // publicPath: process.env.NODE_ENV == 'production' ? '/mapmanage' : '/',
  publicPath: "./",
  outputDir: "dist",
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://172.16.81.183:8081",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      nprogress: "NProgress",
      "element-ui": "ELEMENT",
      moment: "moment",
      "vue-loading-template": "vueLoading"
    }
    // 如果要是外链则不需要
    // plugins: [
    //     new IgnorePlugin(/^\.\/locale$/, /moment$/)
    // ]
  }
};
