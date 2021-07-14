const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const PROXY = process.env.PROXY || "" // 端口

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // host: '0.0.0.0',
    static: path.join(__dirname, "dist"),
    // contentBase: './dist',
    port:8000,
    host: 'localhost',
    hot: true,
    open: true, //自动打开浏览器
    historyApiFallback: true, // 使用H5路由需要配置
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: PROXY === "test" ? {
        target: `http://courier.offline.yidianshihui.com/`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '/test-api'
        }
      } : {
        target: `http://localhost:8080`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  },
});