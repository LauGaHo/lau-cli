const ora = require("ora");

/**
 * 使用 ora 库对目标异步函数进行封装
 * @param fn 目标函数
 * @param message 异步执行时显示的信息提示
 * @returns {function(...[*]): Promise<*>}
 */
function wrapFetchAddLoading(fn, message) {
	return async function (...args) {
		// 利用 ora 库构建 spinner
		const spinner = ora(message);
		// 开始 loading
		spinner.start();
		// 执行传入的目标函数
		const result = await fn(...args);
		// 结束 loading
		spinner.succeed();
		// 返回函数执行完的结果
		return result;
	};
}

module.exports = {
	wrapFetchAddLoading
}