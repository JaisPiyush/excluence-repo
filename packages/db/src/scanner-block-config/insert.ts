import {Knex} from 'knex';
import { ScannerBlockConfig } from '../types';
import { scannerBlockConfigTableName } from '../constants';

export async function createScannerBlockConfig(knex: Knex, config: ScannerBlockConfig) {
    return await knex(scannerBlockConfigTableName).insert(config);
}