'use strict';

var HtmlwebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var srcPath = path.join(ROOT_PATH, 'app');

var sassLoaders = [
  "css-loader",
  "sass-loader",
];

module.exports = {
  entry: {
    app: path.resolve(srcPath, 'main'),
    vendor: ['moment', 'pixi.js']
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js', ".scss"],
    modulesDirectories: ['node_modules', 'app']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    publicPath: '',
    filename: '[name].js',
    library: ['[name]'],
    pathInfo: true
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: false,
    contentBase: './dist'
  },
  module: {
    postLoaders: [
      {
          loader: "transform?brfs"
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
      },
      {
        test: /\.(png|jpg|json)$/,
        loader: 'file?name=[name].[ext]',
        exclude: path.join(__dirname, 'node_modules', 'pixi.js'),
      },
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css"),
    new HtmlwebpackPlugin({
      title: 'PIXI',
      inject: true,
      template: 'app/index.html'
    })
  ]
};
