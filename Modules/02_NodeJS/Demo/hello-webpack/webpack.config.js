const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    'app': './src/app/app.ts',
    'vendor': './src/app/vendor.ts'
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      jquery: "jQuery",
      $: "jquery",
      d3: "d3"
    }),
    new CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.bundle.js' }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: 'index.html' },
      { from: './src/favicon.ico', to: 'favicon.ico' },
      { from: './src/data/data1.csv', to: 'data/data1.csv' },
      { from: './src/app/AppIcon.png', to: 'css/AppIcon.png' },
      { from: './src/app/app.css', to: 'css/app.css' },
      { from: 'node_modules/bootstrap/dist/css/bootstrap.css', to: "css/bootstrap.css" },
      { from: 'node_modules/font-awesome/css/font-awesome.css', to: "css/font-awesome.css" },
      { from: 'node_modules/font-awesome/fonts/fontawesome-webfont.ttf', to: "fonts/fontawesome-webfont.css" },
      { from: 'node_modules/font-awesome/fonts/fontawesome-webfont.woff', to: "fonts/fontawesome-webfont.woff" },
      { from: 'node_modules/font-awesome/fonts/fontawesome-webfont.woff2', to: "fonts/fontawesome-webfont.woff2" }
    ])
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ],
    noParse: [path.join(__dirname, 'node_modules', 'bundles')]
  },
  devServer: {
    contentBase: 'src',
    historyApiFallback: true
  },
  devtool: 'source-map'
};