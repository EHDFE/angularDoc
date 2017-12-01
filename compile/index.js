
var currentPath = process.cwd();
var compile = require("./compile.js");
var fs = require("fs");
var path = require('path');
var open = require('open');
var chalk = require('chalk');

var index = 0;
process.env.compileJson = path.join(process.argv[1].replace('\\bin\\angularcode',''), '/review/compile.json');
var currentFilePath = currentPath;
let setAlertError = function(name) {
	clearTimeout(name);
	return setTimeout(function() {
		console.log(chalk.red('项目中缺少abc.json配置文件'));
	}, 1000);
}
let alertError;
let dirIndex = 0;
let isExistsFn = function(currentPath) {
	alertError = setAlertError(alertError);
	fs.exists(path.join(currentPath, '/abc.json'), function(exists) {  
		let isExists = exists ? true : false;
		index++;
		if(!isExists) {
			currentPath = path.join(currentPath , '../')
			dirIndex++;
			if(dirIndex < 10) {
				isExistsFn(currentPath);
			}				
		}
		else{
			clearTimeout(alertError);
			process.env.configJson = path.join(currentPath, '/abc.json');
			let server = require('../server/index');
			server.action({
				port: process.env.PORT,
				open: false,
				reload: false
			});
			var a = open(`http://127.0.0.1:${process.env.PORT}/view/#/compile/compile`)
			var filePath = path.join(currentFilePath);
			fs.watch(filePath, function (event, filename) {
				if (filename && filename.indexOf('.js') > 0) {
				process.env.compileJsonData = JSON.stringify(new compile.ReplaceModule({
					projects: [currentFilePath],
					//branch: ['trunk'],
					type: 'angularDirective',
					jsonPath: ''
				}).jsons);
				} else {
					console.log('filename not provided');
				}
			})
			console.log(filePath + ' 被监听中...');
			console.log(chalk.green('open http://127.0.0.1:'+process.env.PORT+'/view/#/compile/compile'));
		}
	});
}
isExistsFn(currentPath);

process.env.compileJsonData = JSON.stringify(new compile.ReplaceModule({
	projects: [currentPath],
	//branch: ['trunk'],
	type: 'angularDirective',
	jsonPath: ''
}).jsons);



