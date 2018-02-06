const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    'boss': path.join(__dirname, 'src/js/boss.core.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].min.js',
    library: 'Boss',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({ minimize: true })
  ]
}
