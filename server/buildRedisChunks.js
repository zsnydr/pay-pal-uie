// given a key value pair, set of data, and chunk size,
// hash the data in chunks and inject into redis
// with a createdAt field
const buildRedisChunks = (key, value, dataSet, chunkSize, client, cb) => {
  let result = [];
  dataSet.forEach((item, i) => {
    result.push(item);
    if (i === dataSet.length - 1 || (i + 1) % chunkSize === 0) {
      const date = new Date();
      const id = Math.floor(i / chunkSize);
      client.hset(`${key}:${id}`, 'createdAt', JSON.stringify(date), cb);
      client.hset(`${key}:${id}`, value, JSON.stringify(result), cb);
      result = [];
    }
  });
};

module.exports = buildRedisChunks;
