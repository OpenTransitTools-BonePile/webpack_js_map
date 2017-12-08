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
    resolve: {
        extensions: ['.html', '.js', '.json', '.scss', '.css'],
        alias: {
            leaflet_css: path.join(__dirname, "/node_modules/leaflet/dist/leaflet.css"),
            leaflet_marker: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-icon.png"),
            leaflet_marker_2x: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-icon-2x.png"),
            leaflet_marker_shadow: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-shadow.png")

        }
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.png$/,
                use: 'url-loader?limit=100000'
            },
            {
                test: /\.jpg$/,
                use: 'file-loader'
            }
        ]
    },
}
