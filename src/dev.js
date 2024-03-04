// 项目启动文件

import webpack from "webpack";
import WebpackDevServer from 'webpack-dev-server';
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = require('./webpack.config.js');

const dev = (port) => {
  // 启动项目后自动打开浏览器
  config.plugins.push(new OpenBrowserPlugin({ url: `http://localhost:${port}` }));
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    hot: true,
    historyApiFallback: true
  }).listen(port, 'localhost', err => {
    if (err) console.error(err);
  });
}

module.exports = dev;