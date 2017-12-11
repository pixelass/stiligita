const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const prod = process.NODE_ENV === 'production'

module.exports = {
  entry: {
    react: './app/index-react.js',
    vue: './app/index-vue.js',
    dom: './app/index-dom.js'
  },
  output: {

    path: path.resolve(__dirname, 'docs'),
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
