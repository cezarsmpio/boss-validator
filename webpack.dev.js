const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    'boss.core': path.join(__dirname, 'src/js/boss.core.js')
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
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
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        loader: 'jshint-loader'
      }
    ],
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
    new CopyWebpackPlugin([
      {
        from: '*.html'
      }
    ])
  ]
}
