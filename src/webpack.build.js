const VueLoaderPlugin = require('vue-loader/lib/plugin'); //  引入vue-loader 库
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// 生产环境
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: '[name].[hash].js',
    path: process.cwd() + '/dist',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        appendTsSuffixTo: [/.vue$/]
      }
    }, {
      test: /\.(css|less)$/,
      loader: 'vue-style-loader!less-loader!css-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html', // 需要自动注入的模板的文件名称
      inject: true // 是否自动注入生成后的文件
    })
  ],
  devtool: '#eval-source-map'
}