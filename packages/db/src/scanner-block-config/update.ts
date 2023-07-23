import { Knex } from 'knex';
import { ScannerBlockConfig } from '../types';
import { scannerBlockConfigTableName } from '../constants';

export async function updateCurrentBlockHeight(
    knex: Knex,
    data: Omit<ScannerBlockConfig, 'startBlockHeight'>
) {
    await knex(scannerBlockConfigTableName)
        .where({ scannerId: data.scannerId })
        .update({
            currentBlockHeight: data.currentBlockHeight
        });
}
