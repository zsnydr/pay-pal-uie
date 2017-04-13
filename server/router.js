const genData = require('./genData');
const client = require('./redisClient');

module.exports = (app) => {
  app.get('/transactions', (req, res) => {
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
};
