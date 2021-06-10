const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const common = require('./webpack.base.config.js');
const webpack = require('webpack');
const path = require('path');
const portfinder = require('portfinder');
const HtmlWebpackPlugin = require('html-webpack-plugin');  
const { assetsPath } = require('./utils.js');

function resove(dir) {
	return path.join(__dirname, '..', dir);
}

const devWebpackConfig = merge(common, {
	mode: 'development',
	output: {
		filename: assetsPath('js/[name].js'),
		publicPath: '/'
	},
	devServer: {
		// contentBase: path.join(__dirname, '..', './dist/'),
		contentBase: false,
		historyApiFallback: false,
		hot: true,
		quiet: true,
		// 出现错误时，在浏览器中显示全屏覆盖层
		overlay: {
			warnings: false, errors: true
		},
		host: '0.0.0.0',
		port: 3000,
		open: false
	},
	module: {
		rules: [
		    //   {
		    //     test: /\.js$/,
		    //     loader: 'eslint-loader',
		    //     enforce: "pre",
		    //     include: [path.join(__dirname, '..', 'src')], // 指定检查的目录
		    //     options: {                                 // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
		    //         formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
		    //     }
		    // },
		    // {
		    //     test: /\.(c|sc)ss$/,
		    //     use: [
		    //       'style-loader',
		    //       'css-loader',
		    //       "sass-loader"
		    //     ]

		    // },
		]
	},
	plugins: [
        new HtmlWebpackPlugin({
            template: resove('public/index.html'),
            filename: resove('dist/index.html'),
        }),
	    //启用热替换模块(Hot Module Replacement)，也被称为 HMR。
	    new webpack.HotModuleReplacementPlugin()
	]
})

module.exports = new Promise((reslove, reject) => {
	portfinder.basePort = '3000';
	portfinder.getPort((err, port) => {
		if(err) {

		} else {
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
		        compilationSuccessInfo: {
		          messages: [`您的应用运行成功: http://localhost:3000`],
		        }
		    }))
		}


		reslove(devWebpackConfig);
	})
})
