const path = require('path');
const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    productionSourceMap: false,
    publicPath: process.env.VUE_APP_PUBLICPATCH,
    devServer: {
        disableHostCheck: true,
        port: 3000
    },
    chainWebpack: config => {
        config.resolve.alias.set('@src', resolve('./src'))
        config.resolve.alias.set('@js', resolve('./src/assets/js'))
        config.resolve.alias.set('@css', resolve('./src/assets/css'))
        config.resolve.alias.set('@api', resolve('./src/assets/api'))
    }
}