import { Knex } from ".";

export function getUTCTime(dateTimeString: string): Date {
    const dateTime = new Date(dateTimeString);
    const dateTimeNumber = dateTime.getTime();
    const dateTimeOffset = dateTime.getTimezoneOffset() * 60000;
    const dateTimeUTC = new Date();
    dateTimeUTC.setTime(dateTimeNumber - dateTimeOffset);

    return dateTimeUTC;
}

export function getTestDBKnexConnection(): Pick<Knex.Config, "connection"> {
    return {
        connection: {
            host: process.env['PG_HOST'],
            port: Number(process.env['PG_PORT']),
            database: process.env['POSTGRES_DB'],
            user: process.env['POSTGRES_USER'],
            password: process.env['POSTGRES_PASSWORD']
        }
    }
}
