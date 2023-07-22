import knex, { Knex } from 'knex';

interface KnexConnection {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

export function connectDB(connection: KnexConnection): Knex {
    const conn = {
        client: 'postgresql',
        connection,
        pool: {
            min: 2,
            max: 10
        }
    };
    return knex(conn);
}
