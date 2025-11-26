import redis from "@/configs/redis";

export async function redisSet(key: string, value: unknown, ttl?: number) {
  const data = JSON.stringify(value);
  if (ttl) return redis.set(key, data, "EX", ttl);
  return redis.set(key, data);
}

export async function redisGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? (JSON.parse(data) as T) : null;
}

export async function redisDel(key: string) {
  return redis.del(key);
}
