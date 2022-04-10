'use strict'
const path = require('path')

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json','.ts'],
        alias: {
            '@': path.resolve('src'),
            // 根据项目所需 可以在这里定义任意个别名
        }
    }
}