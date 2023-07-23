// Update with your config settings.

const config = {
    development: {
        client: 'pg',
        connection: {
            host: process.env['PG_HOST'] || 'localhost',
            port: process.env['PG_PORT'],
            database: process.env['POSTGRES_DB'],
            user: process.env['POSTGRES_USER'],
            password: process.env['POSTGRES_PASSWORD']
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};

console.log(config)
export default config;
