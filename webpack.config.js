const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const prod = process.NODE_ENV === 'production'

module.exports = {
  entry: './app/index.js',
  output: {

    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: prod ? [
    new UglifyJSPlugin(),
    new MinifyPlugin()
  ] : [],
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    historyApiFallback: true,
    hot: false
  }
}
