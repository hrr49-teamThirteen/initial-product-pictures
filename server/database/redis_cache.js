const redis = require('redis');

const REDIS_PORT = 6379;
const redisClient = redis.createClient(REDIS_PORT);

redisClient.on('error', (error) => {
  console.error(error);
});

module.exports = {
  redisClient,
};
