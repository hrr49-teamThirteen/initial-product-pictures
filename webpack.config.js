const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.jsx',
  output:
    {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './client/dist'),
    },
  module:
    {
      rules: [{
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }],
    },
};
