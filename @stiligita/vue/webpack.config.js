const path = require('path')

const ROOT = path.resolve(__dirname, '../../')
const DOCS = path.resolve(ROOT, 'docs')

module.exports = {
  entry: {
    vue: './examples/index.js'
  },
  output: {
    path: DOCS,
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  devServer: {
    contentBase: DOCS,
    compress: false,
    historyApiFallback: true,
    hot: false
  }
}
