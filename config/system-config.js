// 获取当前电脑的临时下载目录
const downloadDirectory = `${process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"]}/.template`;
// 获取当前 package.json 的版本号
const version = require("../package.json").version;

module.exports = {
	downloadDirectory,
	version
}