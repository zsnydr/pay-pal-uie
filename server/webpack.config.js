const path = require('path');

const publicDir = path.resolve(__dirname, '../public');
const distDir = path.resolve(__dirname, '../dist');

const config = {
  devtool: 'source-map',
  entry: [
    path.resolve(publicDir, 'index.jsx'),
    path.resolve(publicDir, 'styles', 'index.scss')
  ],
  output: {
    path: distDir,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['react', 'es2015'] // can add "es2015" to compile to es5
      }
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['es2015'] // can add "es2015" to compile to es5
      }
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'bootstrap-sass$': 'bootstrap-sass/assets/stylesheets/bootstrap'
    }
  }
};

module.exports = config;
