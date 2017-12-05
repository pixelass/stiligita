const path = require('path')

module.exports = {
  entry: './app/index.js',
  output: {

    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
    library: 'MyLibrary',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    historyApiFallback: true,
    hot: false
  }
}
