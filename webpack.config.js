var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  entry: ['regenerator-runtime/runtime', './client.js'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: "client.min.js"
  },
  plugins: debug ? [
      new ExtractTextPlugin('public/styles.css')
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin('public/styles.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.styles\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ],
};
