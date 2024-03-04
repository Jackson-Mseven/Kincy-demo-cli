// 对话内容
let promptList = [
  // 模板
  {
    type: 'list',
    name: 'frame',
    message: 'please choose this project template',
    choices: ['vue', 'react']
  },
  // 描述
  {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description: '
  },
  // 作者
  {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name: '
  }
];

module.exports = {
  promptList
}