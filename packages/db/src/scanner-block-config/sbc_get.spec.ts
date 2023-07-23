import {expect} from 'chai';
import { Knex, ScannerBlockConfig, connectDB } from '..';
import { getTestDBKnexConnection } from '../utils';
import { scannerBlockConfigTableName } from '../constants';
import { getScannerConfig } from './get';
import { createScannerBlockConfig } from './insert';


describe('Test get in scanner_block_config', () => { 
    let knex: Knex;
    let scanner_block_config: ScannerBlockConfig
    before(async () => {
        knex = connectDB(getTestDBKnexConnection());
        scanner_block_config = {
            scannerId: 'new-scanner',
            currentBlockHeight: 24,
            startBlockHeight: 24
        }
        await createScannerBlockConfig(knex, scanner_block_config);
    });

    after( async () => {
        await knex(scannerBlockConfigTableName).del();
    })

    it('test get is working', async () => {
        const scannerBlockConfig = await getScannerConfig(knex, scanner_block_config.scannerId);
        expect(scannerBlockConfig?.currentBlockHeight).to.equal(scanner_block_config.currentBlockHeight.toString());
    });

    it('test get when scannerId is not present in db', async () => {
        const scannerBlockConfig = await getScannerConfig(knex, 'random-scanner');
        expect(scannerBlockConfig).to.undefined;
    })
})