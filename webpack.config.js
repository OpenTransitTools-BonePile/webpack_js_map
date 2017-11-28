/**
 * good webpack info: https://blog.madewithlove.be/post/webpack-your-bags/
 */

var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './lib',
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: '/'
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
