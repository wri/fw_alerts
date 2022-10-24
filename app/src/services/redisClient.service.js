const Redis = require('ioredis');
const config = require("config");
const client = new Redis(config.get("redis.url"));

export default client;


