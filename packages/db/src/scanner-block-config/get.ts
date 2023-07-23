import {Knex} from 'knex';
import { scannerBlockConfigTableName } from '../constants';
import { ScannerBlockConfig } from '../types';

export async function getScannerConfig(knex: Knex, scannerId: string) {
    const scanner = await knex.table(scannerBlockConfigTableName)
                            .where({scannerId: scannerId})
                            .first('scannerId','currentBlockHeight');
    return scanner as Pick<ScannerBlockConfig, "currentBlockHeight"> | undefined;
}