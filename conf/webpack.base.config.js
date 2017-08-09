import Config from 'webpack-config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default new Config().merge({
  entry: './client/index.js',
  output: {
    path: __dirname + '/../server/public',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'url-loader?file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./bundle.css', {
      allChunks: true
    })
  ]
});