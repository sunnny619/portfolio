const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type RedisResult<T> = {
  result?: T;
  error?: string;
};

type Store = Map<string, Set<string>>;

declare global {
  // eslint-disable-next-line no-var
  var __heartStore: Store | undefined;
}

function key(slug: string) {
  return `blog:heart:${slug}`;
}

async function redis<T>(command: unknown[]) {
  if (!redisUrl || !redisToken) return null;

  const response = await fetch(redisUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis command failed: ${response.status}`);
  }

  const data = (await response.json()) as RedisResult<T>;
  if (data.error) throw new Error(data.error);
  return data.result;
}

function memoryStore() {
  globalThis.__heartStore ??= new Map();
  return globalThis.__heartStore;
}

async function memoryCount(slug: string) {
  return memoryStore().get(key(slug))?.size ?? 0;
}

export function hasHeartStore() {
  return Boolean(redisUrl && redisToken);
}

export async function getHeartState(slug: string, visitorId: string) {
  if (hasHeartStore()) {
    const [count, liked] = await Promise.all([
      redis<number>(["SCARD", key(slug)]),
      redis<number>(["SISMEMBER", key(slug), visitorId]),
    ]);

    return {
      count: count ?? 0,
      liked: liked === 1,
      configured: true,
    };
  }

  const users = memoryStore().get(key(slug));
  return {
    count: await memoryCount(slug),
    liked: users?.has(visitorId) ?? false,
    configured: false,
  };
}

export async function setHeart(slug: string, visitorId: string, liked: boolean) {
  if (hasHeartStore()) {
    await redis<number>([liked ? "SADD" : "SREM", key(slug), visitorId]);
    return getHeartState(slug, visitorId);
  }

  const store = memoryStore();
  const users = store.get(key(slug)) ?? new Set<string>();
  if (liked) users.add(visitorId);
  else users.delete(visitorId);
  store.set(key(slug), users);

  return {
    count: users.size,
    liked,
    configured: false,
  };
}
