'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _dev = require('./dev');

var _dev2 = _interopRequireDefault(_dev);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//项目打包

// 命令列表
// 项目初始化
let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目',
    usages: ['kincy-demo-cli create ProjectName', 'kdc create ProjectName'],
    alias: 'c'
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: ['kincy-demo-cli init', 'kdc init'],
    alias: 'i'
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: ['kincy-demo-cli dev', 'kdc dev'],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: 3000
    }],
    alias: 'd'
  },
  //打包
  build: {
    description: '服务端项目打包',
    usages: ['kincy-demo-cli build', 'kdc build'],
    options: [{
      flags: '-u --username <port>',
      description: 'github用户名',
      defaultValue: ''
    }, {
      flags: '-t --token <port>',
      description: 'github创建的token',
      defaultValue: ''
    }],
    alias: 'b'
  }

  // 注册命令
}; // 项目启动
// 项目创建
// 入口文件

Object.keys(actionMap).forEach(action => {
  // 添加命令选项
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(option => {
      let obj = actionMap[action].options[option];
      _commander2.default.option(obj.flags, obj.description, obj.defaultValue);
    });
  }

  // 注册命令
  _commander2.default.command(action) // 命令
  .description(actionMap[action].description) // 描述
  .alias(actionMap[action].alias) // 别名
  .action(() => {
    // 逻辑
    // 不同的命令执行不同的逻辑
    switch (action) {
      case 'create':
        (0, _create2.default)(...process.argv.slice(3));
        break;
      case 'init':
        (0, _init2.default)(_commander2.default.username, _commander2.default.token);
        break;
      case 'dev':
        (0, _dev2.default)(_commander2.default.port);
        break;
      case 'build':
        (0, _build2.default)();
        break;
    }
  });
});

// 项目版本
_commander2.default.version(require('../package.json').version, '-v --version').parse(process.argv);

/**
 * kincy-demo-cli 命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp();
}