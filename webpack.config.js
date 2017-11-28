/**
 * good webpack info: https://blog.madewithlove.be/post/webpack-your-bags/
 */

var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.yaml$/,
                include: path.resolve('data'),
                loader: 'yaml',
            }
        ]
    },
}
