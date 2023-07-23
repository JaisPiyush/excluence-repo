import { Knex } from '@excluence-repo/db';

export const connection: Pick<Knex.Config, 'connection'> = {
    connection: {
        host: process.env['PG_HOST'],
        port: Number(process.env['PG_PORT'] || 5432),
        database: process.env['POSTGRES_DB'],
        user: process.env['POSTGRES_USER'],
        password: process.env['POSTGRES_PASSWORD']
    }
};
