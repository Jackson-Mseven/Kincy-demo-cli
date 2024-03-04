// 项目创建文件

import symbol from 'log-symbols';
import chalk from 'chalk';
import ora from 'ora';

import {
  notExistFold,
  prompt,
  downloadTemplate,
  updateJsonFile
} from './util';

let create = async (ProjectName) => {
  // 项目名为空，直接报错
  if (ProjectName === undefined) {
    console.error(symbol.error, chalk.red('创建项目的时候，请输入项目名'));
  }
  // 传入项目名
  else {
    // 如果文件名存在则继续执行，否则退出
    notExistFold(ProjectName).then(() => {
      // 用户交互
      prompt().then((answer) => {
        // 目前只建了一个vue的模板，所以只能先跳过react
        if (answer.frame === 'react') {
          console.warn(symbol.warning, chalk.yellow('react模板还在路上，莫急莫急~'));
          process.exit(1);
        }

        // 下载模板
        const loading = ora('模板下载中...');
        loading.start('模板下载中...');
        let API = '';
        switch (answer.frame) {
          case 'vue':
            API = 'direct:https://github.com/For-Article/vue-temlate.git';
            break;
          case 'react':
            API = 'direct:https://github.com/LuoYangYY/react-template.git';
            break;
        }
        downloadTemplate(ProjectName, API)
          .then(() => {
            loading.succeed('模板下载完成');

            // 下载完成后,根据用户输入更新配置文件
            const fileName = `${ProjectName}/package.json`;
            answer.name = ProjectName;
            updateJsonFile(fileName, answer)
              .then(() => {
                console.log(symbol.success, chalk.green('配置文件更新完的。'));
              })
          })
          .catch(() => {
            loading.fail('模板下载失败');
          })
      })
    });
  }
};

module.exports = create;