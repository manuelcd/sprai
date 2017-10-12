const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//var bootstrap = require('./webpack.bootstrap.config');

//var bootstrap = require('bootstrap-loader');

const env = process.env.NODE_ENV;
module.exports = {
    entry: ['./src/index.js'],

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'static')
    },
//    plugins: ,
    module: {
        rules: [
            {test: /\.css$/, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    publicPath: '/'
                })},
            {test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000'},
            {test: /\.(ttf|eot)$/, loader: 'file-loader'},
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new webpack.ProvidePlugin({$: 'jquery', jquery: 'jquery', jQuery: 'jquery'})
    ]

};
