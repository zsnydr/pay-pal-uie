const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');
const router = require('./router');

const app = express();
const expressRouter = express.Router();

const compiler = webpack(webpackConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/dist')));

// only use dev middleware if working in development
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler));
}

app.use('/api', expressRouter);
router(expressRouter);

// wildcard route for hard refresh
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});

module.exports = app;
