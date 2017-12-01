/**
 * good webpack info: https://blog.madewithlove.be/post/webpack-your-bags/
 */

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './lib',
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'lib/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),

        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),

        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin()
    ],
    module: {
        loaders: [
        ]
    },
}
