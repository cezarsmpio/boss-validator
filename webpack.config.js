const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    'boss.core': path.join(__dirname, 'src/js/boss.core.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/boss.min.js',
    library: 'Boss',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    inline: true,
    progress: true,
    colors: true,
    open: true,
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
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
