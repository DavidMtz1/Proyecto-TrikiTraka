const path = require('path');

//console.log(path.join(__dirname, 'public'));

module.exports = {
  entry: { main: './src/app.js' },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  performance: {
    hints: false
  },
  module:{
  rules:[{
    loader: "babel-loader",
    test: /\.js$/,
    exclude: /node_modules/
}, {
  test: /\.s?css$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
  }]
},
// devtool: 'inline-source-map',
devtool: 'cheap-module-eval-source-map',
devServer: {
  contentBase: path.join(__dirname, 'public')
}
};
