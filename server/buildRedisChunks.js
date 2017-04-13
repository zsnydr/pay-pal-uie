const buildRedisChunks = (key, dataSet, chunkSize, client, cb) => {
  let result = [];
  dataSet.forEach((item, i) => {
    result.push(item);
    if (i === dataSet.length - 1 || (i + 1) % chunkSize === 0) {
      const date = new Date();
      const id = Math.floor(i / chunkSize);
      client.hset(`${key}:${id}`, 'createdAt', JSON.stringify(date), cb);
      client.hset(`${key}:${id}`, 'transactions', JSON.stringify(result), cb);
      result = [];
    }
  });
};

module.exports = buildRedisChunks;
