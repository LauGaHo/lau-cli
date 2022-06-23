#!/usr/bin/env node
// 导入第三方依赖
const path = require("path");
const program = require("commander");

// 导入自定义文件依赖
const { version, downloadDirectory } = require("../config/system-config");
const { actionsMap } = require("../config/actions-map");

program
	// 定义当前版本
	.version(version)
	// 定义使用指令
	.usage("<command> [options]");

// 遍历 actions-map.js 文件并定义各种 command，这里为：lau-cli create、lau-cli init
Reflect.ownKeys(actionsMap).forEach((action) => {
	program
		// 配置命令的名字
		.command(action)
		// 命令的别名
		.alias(actionsMap[action].alias)
		// 命令对应的描述
		.description(actionsMap[action].description)
		// 脚手架命令击中的回调函数
		.action(() => {
			// 访问不到对应的命令，就打印找不到命令
			if (action === '*') {
				console.log(actionsMap[action].description);
			}
			// 反之则打印对应的命令
			else {
				// 动态加载命令对应的 JS 文件并传入对应参数来执行相应的 JS 文件
				require(path.resolve(__dirname, `../lib/${action}`))(...process.argv.slice(3));
			}
		});
});

// 监听用户的 help 事件并打印相应的例子
program.on('--help', () => {
	console.log('\nExamples:');
	Reflect.ownKeys(actionsMap).forEach((action) => {
		actionsMap[action].examples.forEach((example) => {
			console.log(example);
		});
	});
});

// 解析命令行参数
program.parse(process.argv);

