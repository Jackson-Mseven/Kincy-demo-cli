const VueLoaderPlugin = require('vue-loader/lib/plugin'); // 引入vue-loader库
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 开发环境
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  watch: true,
  watchOptions: {
    ignored: /node_modules/, // 忽略文件
    poll: 1000 // 轮询时间
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
    new VueLoaderPlugin(),  // vue-loader 插件加载方式
    new HtmlWebpackPlugin({
      template: './public/index.html', // 需要自动注入的模板的文件名称
      inject: true // 是否自动注入生成后的文件
    })
  ],
  devtool: 'cheap-module-eval-source-map',
}