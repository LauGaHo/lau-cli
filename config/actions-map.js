/**
 * command 配置文件，定义了 lau-cli 中 command
 * {
 *   create、init、* 对应各种命令的名称
 *   {
 *     alias: 命令别名
 *     description: 命令描述
 *     examples: 命令使用例子数组
 *   }
 * }
 */
const actionsMap = {
	// lau-cli create 命令
	create: {
		alias: 'c',
		description: 'create a project',
		examples: [
			'lau-cli create <project-name>'
		]
	},
	// lau-cli init 命令
	init: {
		alias: 'i',
		description: 'init a project',
		examples: [
			'lau-cli init <project-name>'
		]
	},
	// 查找不到的命令会回落到 * 中
	'*': {
		alias: '',
		description: 'command not found',
		examples: []
	}
};

// 导出命令配置对象
module.exports = {
	actionsMap
};