const client = require('./redisClient');
const redis = require('redis');
const genData = require('./genData');
const buildRedisChunks = require('./buildRedisChunks');

module.exports = (app) => {
  app.get('/transactions', (req, res) => {
    const { index, amt } = req.query;
    client.hget(`trans:${index}`, 'transactions', (err, results) => {
      if (err) console.log(`Error getting data from Redis: ${err}`); // TODO: handle error
      if (results) {
        // TODO: add logic to check if chunk needs to be updated from DB (based on createdAt)
        const data = JSON.parse(results);
        res.send(data);
      } else {
        // send data to client, then add data to redis
        const data = genData.slice(index * amt, (index + 1) * amt);
        res.send(data);
        buildRedisChunks('trans', 'transactions', genData, amt, client, redis.print);
      }
    });
  });
};
