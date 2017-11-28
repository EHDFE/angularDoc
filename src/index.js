const chalk = require('chalk');
console.log(chalk.red('What do you want to do?'));
console.log(chalk.green('-p'), chalk.red(' --preview  current component preview;'));
console.log(chalk.green('      '), chalk.red(' example: angulardoc -p 3001, default port is 3333'));
console.log(chalk.green('-push  '), chalk.red(' --push  current component push to the demo web;'));