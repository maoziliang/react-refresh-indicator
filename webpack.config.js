var webpack = require('webpack');
var path = require('path');

var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
    '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
    '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

module.exports = {
  target: 'web',
  entry: {
    app: [
      './lib/index.jsx'
    ]
  },
  output: {
    path: './docs/js/',
    library: 'RefreshIndicator',
    libraryTarget: 'var',
    filename: 'react-refresh-indicator.js'
  },
  externals: [
    {
      'react': 'var React',
    }
  ],
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/, 
        //exclude: /(node_modules)/, 
        loader: 'babel?optional[]=runtime'
      },
      {
        test: /\.less$/,
        loader: 'style!css!' + AUTOPREFIXER_LOADER + '!less'
      },
      {
        test: /\.gif/,
        loader: 'url?limit=5000&mimetype=image/gif'
      },
      {
        test: /\.png/,
        loader: 'url?limit=5000&mimetype=image/png'
      },
      {
        test: /\.(jpg|jpeg)/,
        loader: 'url?limit=5000&mimetype=image/jpg'
      },
      {
        test: /\.svg/,
        loader: 'url?limit=5000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
  ]
};
