import { ConnectionOptions } from 'bullmq';

export const connection: ConnectionOptions = {
    host: process.env['REDIS_HOST'] || '127.0.0.1',
    port: +(process.env['REDIS_PORT'] || 6379)
};

export const concurrency = +(process.env['CONCURRENT_WORKERS'] || 8);
