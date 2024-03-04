// 工具文件

import fs from 'fs';
import symbol from 'log-symbols';
import chalk from 'chalk';
import inquirer from 'inquirer';
import downloadGit from 'download-git-repo';

import { promptList } from './variants.js'

// 文件是否存在
const notExistFold = async (name) => {
  return new Promise(resolve => {
    if (fs.existsSync(name)) {
      console.warn(symbol.error, chalk.red('文件夹名已被占用，请更换名字重新创建'));
    } else {
      resolve();
    }
  });
}

// 对话
const prompt = () => {
  return new Promise(resolve => {
    inquirer
      .prompt(promptList)
      .then(answer => {
        resolve(answer);
      })
  });
}

// 项目模板远程下载
const downloadTemplate = async (ProjectName, api) => {
  return new Promise((resolve, reject) => {
    downloadGit(api, ProjectName, { clone: true }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// 更新 JSON 配置文件
const updateJsonFile = (fileName, obj) => {
  return new Promise(resolve => {
    if (fs.existsSync(fileName)) {
      const data = fs.readFileSync(fileName).toString();
      let json = JSON.parse(data);
      Object.keys(obj).forEach(key => {
        json[key] = obj[key];
      });
      fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
      resolve();
    }
  });
}

module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
  updateJsonFile
}