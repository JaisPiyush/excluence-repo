import {expect} from 'chai';
import { Knex, ScannerBlockConfig, connectDB } from '..';
import { getTestDBKnexConnection } from '../utils';
import { scannerBlockConfigTableName } from '../constants';
import { createScannerBlockConfig } from './insert';

describe('Test insert in scanner_block_config', () => { 
    let knex: Knex;
    before(async () => {
        knex = connectDB(getTestDBKnexConnection());
    });

    after( async () => {
        await knex(scannerBlockConfigTableName).del();
    })

    it('test insert is working', async () => {
        const previousCount = await knex(scannerBlockConfigTableName).count('scannerId');
        expect(previousCount).not.to.undefined;
        const scanner_block_config: ScannerBlockConfig = {
            scannerId: 'new-scanner',
            currentBlockHeight: 24,
            startBlockHeight: 24
        }
        await createScannerBlockConfig(knex, scanner_block_config);
        const currentCount = await knex(scannerBlockConfigTableName).count('scannerId');
        expect(BigInt(currentCount[0]['count'])).to.equal(BigInt(previousCount[0]['count']) + BigInt(1));
    })
})