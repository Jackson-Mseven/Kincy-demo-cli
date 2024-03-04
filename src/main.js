// 入口文件

import program from 'commander';

import create from './create'; // 项目创建
import init from './init'; // 项目初始化
import dev from './dev'; // 项目启动
import build from './build'; //项目打包

// 命令列表
let actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目',
    usages: [
      'kincy-demo-cli create ProjectName',
      'kdc create ProjectName',
    ],
    alias: 'c'
  },
  // 项目初始化
  init: {
    description: '初始化项目',
    usages: [
      'kincy-demo-cli init',
      'kdc init'
    ],
    alias: 'i'
  },
  // 启动项目
  dev: {
    description: '本地启动项目',
    usages: [
      'kincy-demo-cli dev',
      'kdc dev'
    ],
    options: [
      {
        flags: '-p --port <port>',
        description: '端口',
        defaultValue: 3000
      }
    ],
    alias: 'd'
  },
  //打包
  build: {
    description: '服务端项目打包',
    usages: [
      'kincy-demo-cli build',
      'kdc build'
    ],
    options: [
      {
        flags: '-u --username <port>',
        description: 'github用户名',
        defaultValue: ''
      },
      {
        flags: '-t --token <port>',
        description: 'github创建的token',
        defaultValue: ''
      }
    ],
    alias: 'b'
  }
}

// 注册命令
Object.keys(actionMap).forEach(action => {
  // 添加命令选项
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(option => {
      let obj = actionMap[action].options[option];
      program.option(obj.flags, obj.description, obj.defaultValue);
    })
  }

  // 注册命令
  program
    .command(action) // 命令
    .description(actionMap[action].description) // 描述
    .alias(actionMap[action].alias) // 别名
    .action(() => { // 逻辑
      // 不同的命令执行不同的逻辑
      switch (action) {
        case 'create':
          create(...process.argv.slice(3));
          break;
        case 'init':
          init(program.username, program.token);
          break;
        case 'dev':
          dev(program.port);
          break;
        case 'build':
          build();
          break;
      }
    })
});

// 项目版本
program
  .version(require('../package.json').version, '-v --version')
  .parse(process.argv);

/**
 * kincy-demo-cli 命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}