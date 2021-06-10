// const pages = require('./config/pages.js');
const path = require('path');

function resove(dir) {
	return path.join(__dirname, '..', './src/pages', dir);
}

//获取入口的js和获取需要添加指定的文件名

function assetsPath(dir) {
	// return path.posix.join('static', dir);
	return path.posix.join('static', dir)
}
// getPageGenerate();
// console.log(assetsPath('css/style.css'))
module.exports = {
	assetsPath
}
