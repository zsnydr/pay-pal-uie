const client = require('./redisClient');
const redis = require('redis');
const genData = require('./genData');

module.exports = (app) => {
  app.get('/transactions', (req, res) => {
    const { index, amt } = req.query;
    client.hget(`trans:${index}`, 'transactions', (err, results) => {
      if (err) console.log(`Error getting data from Redis: ${err}`); // TODO: handle error
      if (results) {
        const data = JSON.parse(results);
        res.send(data);
      } else {
        const data = genData.slice(index * amt, (index + 1) * amt);
        res.send(data);
        let result = [];
        genData.forEach((tran, i) => {
          result.push(tran);
          if (i === genData.length - 1 || (i + 1) % amt === 0) {
            const date = new Date();
            const id = Math.floor(i / amt);
            client.hset(`trans:${id}`, 'createdAt', JSON.stringify(date), redis.print);
            client.hset(`trans:${id}`, 'transactions', JSON.stringify(result), redis.print);
            result = [];
          }
        });
      }
    });
  });
};
