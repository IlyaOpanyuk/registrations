import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.babel';

const port = 8080;
const publicPath = __dirname + '/public';
const app = express();

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(publicPath));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, './index.html'));
});

app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});