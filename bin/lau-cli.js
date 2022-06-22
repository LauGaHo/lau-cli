#!/usr/bin/env node
const program = require("commander");

program
	// 定义当前版本
	.version(require("../package.json").version)
	// 定义使用指令
	.usage("<command> [options]")
	// 定义四个指令
	.command("add", "add a new template")
	.command("delete", "delete a template")
	.command("list", "list all the templates")
	.command("init", "generate a new project from a template")

// 解析命令行参数
program.parse(process.argv)

