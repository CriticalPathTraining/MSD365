const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'app': './src/scripts/app.ts',
    'vendor': './src/scripts/vendor.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: './scripts/bundle.js'
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: './scripts/vendor.bundle.js'
    }),
    new UglifyJSPlugin(),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: 'index.html' },
      { from: './src/css/app.css', to: 'css/app.css' },
      { from: './src/css/img/AppIcon.png', to: 'css/img/AppIcon.png' }
    ])
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader'
    }]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'dist',
    port: 1234
  }
};