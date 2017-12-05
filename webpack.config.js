const path = require('path')

module.exports = {
  entry: './app/index.js',
  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, 'public'),
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
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    hot: false
  }
}
