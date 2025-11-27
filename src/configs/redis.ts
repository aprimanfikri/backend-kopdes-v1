import { RedisClient } from "bun";
import { REDIS_URL } from "./env";

const redis = new RedisClient(REDIS_URL);

export default redis;
