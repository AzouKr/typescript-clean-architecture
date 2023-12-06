import { createClient } from 'redis';

export async function createRedisClient() {
    const client = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

    return client;
}
