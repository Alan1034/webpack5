const path = require('path');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // entry: {
  //   app: './src/index.js'
  // },
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    // filename: '[name].bundle.js',
    publicPath:"/",
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Custom template using Handlebars',
    //   filename: 'index.html',
    //   template: 'public/index.html'
    // })
  ]
};
