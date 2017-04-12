const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const redis = require('redis');
const genData = require('./genData');

const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Error from client: ${err}`);
});

const app = express();
const compiler = webpack(webpackConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/dist')));

// only use dev middleware if working in development
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler));
}

app.get('/api/transactions', (req, res) => {
  const { start, end } = req.query;
  client.get('trans', (err, results) => {
    if (err) console.log('Error getting data from Redis: ', err);
    if (results) {
      let data = JSON.parse(results);
      data = data.slice(start * 20, end * 20);
      res.send(data);
    } else {
      const data = genData.slice(start * 20, end * 20);
      res.send(data);
      // now add data to redis
      const temp = JSON.stringify(genData);
      client.setex('trans', 600, temp);  // expires in 10 minutes
    }
  });
});

// wildcard route for hard refresh
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});

module.exports = app;
