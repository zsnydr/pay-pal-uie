const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Error from client: ${err}`);
});

client.on('ready', () => {
  console.log('Redis connection is ready');
});

module.exports = client;
