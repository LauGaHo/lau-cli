const axios = require("axios");
const Inquirer = require("inquirer");
const utils = require("../utils");

/**
 * 获取仓库列表
 * @returns {Promise<any>}
 */
async function fetchRepoList() {
	// 获取当前组织中的所有仓库信息，这个仓库中存放的都是项目模板
	const { data } = await axios.get("https://api.github.com/orgs/td-cli/repos");
	return data;
}

/**
 * 根据给定的代码仓库获取该仓库的 Tag 列表
 * @param repo 仓库名字
 * @returns {Promise<void>}
 */
async function fetchTagList(repo) {
	const { data } = await axios.get(`https://api.github.com/repos/td-cli/${repo}/tags`);
	return data;
}

module.exports = async (...args) => {
	console.log('This is create.js');
	console.log(args);
	// 使用 utils.wrapFetchAddLoading 对 fetchRepoList 函数进行包装并对包装后的函数立即调用
	let repos = await utils.wrapFetchAddLoading(fetchRepoList, "fetching template ......")();
	// 将 repos 根据 name 映射获取对应的 repos
	repos = repos.map((repo) => repo.name);
	// 将 repos 结合命令行给用户选择并返回
	const { repo } = await Inquirer.prompt({
		// 获取选择后的变量名称
		name: "repo",
		// 以什么形式显示在命令行
		type: "list",
		// 提示信息
		message: "please choose a template to create project",
		// 选择的源数据
		choices: repos
	});
	// 获取对应 repo 的 tag 列表
	let tags = await utils.wrapFetchAddLoading(fetchTagList, "fetching tag ......")(repo);
	// 将 tags 中的元素映射为对应 tag.name
	tags = tags.map(tag => tag.name);
	// 将 tags 结合命令行给用户选择并返回
	const { tag } = await Inquirer.prompt({
		name: "tag",
		type: "list",
		message: "please choose a tag",
		choices: tags
	});
	console.log(tag);
};