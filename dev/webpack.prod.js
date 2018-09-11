const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
 module.exports = merge(common, {
  mode: 'production',
   plugins: [
     new ImageminPlugin({
       test: /\.(jpe?g|png|gif|svg)$/i,
       optipng: {
         optimizationLevel: 9
       }
     }),
     new UglifyJsPlugin({
       sourceMap: true,
       test: /\.js($|\?)/i
     })
     ]
 });