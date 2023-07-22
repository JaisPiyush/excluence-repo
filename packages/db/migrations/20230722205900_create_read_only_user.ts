import { Knex } from 'knex';
import { tableName } from '../src/constants';

const PG_READ_ONLY_USER = process.env['PG_READ_ONLY_USER'];
const PG_READ_ONLY_PASSWORD = process.env['PG_READ_ONLY_PASSWORD'];

export async function up(knex: Knex): Promise<void> {
    if (!PG_READ_ONLY_USER && !PG_READ_ONLY_PASSWORD) {
        throw new Error(
            `Username: ${PG_READ_ONLY_USER} and password: ${PG_READ_ONLY_PASSWORD} not correctly defined.`
        );
    }
    // Create role
    await knex.schema.raw(`CREATE ROLE read_only_access`);
    // Grant access to schema public and table
    await knex.schema.raw(`GRANT USAGE ON SCHEMA public TO read_only_access`);
    await knex.schema.raw(`GRANT SELECT ON ${tableName} TO read_only_access`);
    // Create user with password
    await knex.schema.raw(
        `CREATE USER ${PG_READ_ONLY_USER} WITH PASSWORD '${PG_READ_ONLY_PASSWORD}'`
    );
    // Grant read access to user
    await knex.schema.raw(`GRANT read_only_access TO ${PG_READ_ONLY_USER}`);
}

export async function down(knex: Knex): Promise<void> {
    if (!PG_READ_ONLY_USER && !PG_READ_ONLY_PASSWORD) {
        throw new Error(
            `Username: ${PG_READ_ONLY_USER} and password: ${PG_READ_ONLY_PASSWORD} not correctly defined.`
        );
    }
    // Drop the user
    await knex.schema.raw(`DROP USER IF EXISTS ${PG_READ_ONLY_USER}`);
    // Drop the role
    await knex.schema.raw(`DROP ROLE IF EXISTS read_only_access`);
}
