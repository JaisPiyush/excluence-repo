import { Knex } from 'knex';
import { flowEventsTableName } from '../src/constants';

const PG_READ_ONLY_USER = process.env['PG_READ_ONLY_USER'];
const PG_READ_ONLY_PASSWORD = process.env['PG_READ_ONLY_PASSWORD'];
const POSTGRES_DB = process.env['POSTGRES_DB'];

export async function up(knex: Knex): Promise<void> {
    if (!PG_READ_ONLY_USER && !PG_READ_ONLY_PASSWORD && !POSTGRES_DB) {
        throw new Error(
            `Username: ${PG_READ_ONLY_USER} and password: ${PG_READ_ONLY_PASSWORD} not correctly defined.`
        );
    }
    // // Create role
    // await knex.schema.raw(`CREATE ROLE read_only_access`);
    // // Grant access to schema public and table
    // await knex.schema.raw(`GRANT USAGE ON SCHEMA public TO read_only_access`);
    // await knex.schema.raw(
    //     `GRANT SELECT ON ${flowEventsTableName} TO read_only_access`
    // );
    // // Create user with password
    // await knex.schema.raw(
    //     `CREATE USER ${PG_READ_ONLY_USER} WITH PASSWORD '${PG_READ_ONLY_PASSWORD}'`
    // );
    // // Grant read access to user
    // await knex.schema.raw(`GRANT read_only_access TO ${PG_READ_ONLY_USER}`);
    // Create user
    await knex.schema.raw(
        `CREATE USER ${PG_READ_ONLY_USER} WITH PASSWORD '${PG_READ_ONLY_PASSWORD}'`
    );
    // Grant connect access to the user
    await knex.schema.raw(
        `GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO ${PG_READ_ONLY_USER}`
    );
    // Grant USAGE on schema
    await knex.schema.raw(
        `GRANT USAGE ON SCHEMA public TO ${PG_READ_ONLY_USER}`
    );
    // Grant select on table
    await knex.schema.raw(
        `GRANT SELECT ON ${flowEventsTableName} TO ${PG_READ_ONLY_USER}`
    );
}

export async function down(knex: Knex): Promise<void> {
    if (!PG_READ_ONLY_USER && !PG_READ_ONLY_PASSWORD && !POSTGRES_DB) {
        throw new Error(
            `Username: ${PG_READ_ONLY_USER} and password: ${PG_READ_ONLY_PASSWORD} not correctly defined.`
        );
    }
    await knex.schema.raw(
        `REVOKE SELECT ON ${flowEventsTableName} FROM ${PG_READ_ONLY_USER}`
    );
    await knex.schema.raw(
        `REVOKE USAGE ON SCHEMA public FROM ${PG_READ_ONLY_USER}`
    );
    await knex.schema.raw(
        `REVOKE CONNECT ON DATABASE ${POSTGRES_DB} FROM ${PG_READ_ONLY_USER}`
    );
    // Drop the user
    await knex.schema.raw(`DROP USER IF EXISTS ${PG_READ_ONLY_USER}`);

    // Drop the role
    // await knex.schema.raw(`DROP ROLE IF EXISTS read_only_access`);
}
