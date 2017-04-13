const path = require('path');

const publicDir = path.resolve(__dirname, '../public');
const distDir = path.resolve(__dirname, '../dist');

const config = {
  devtool: 'source-map',
  entry: [
    path.resolve(publicDir, 'index.jsx'),
    path.resolve(publicDir, 'styles', 'index.css')
  ],
  output: {
    path: distDir,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

module.exports = config;
