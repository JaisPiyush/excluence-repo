import knex, { Knex } from 'knex';

export function connectDB(connection: Pick<Knex.Config, 'connection'>): Knex {
    const conn = {
        client: 'pg',
        connection: connection.connection,
        pool: {
            min: 2,
            max: 10
        }
    };
    return knex(conn);
}
