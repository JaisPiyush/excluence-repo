import { Knex } from "knex";

export const useKnexModuleConfig = () => ({
    client: 'pg',
    connection: {
      host: process.env['PG_HOST'] || 'localhost',
      port: Number(process.env['PG_PORT']),
      database: process.env['POSTGRES_DB'],
      user: process.env['POSTGRES_USER'],
      password: process.env['POSTGRES_PASSWORD'],
    },
    pool: {
      min: 2,
      max: 10,
    },
});


export const useKnexMemoryDBModuleConfig = (): Knex.Config => ({
    client: 'sqlite3',
    connection: ':memory',
    useNullAsDefault: true
})