import { expect } from 'chai';
import { Knex, ScannerBlockConfig, connectDB } from '..';
import { getTestDBKnexConnection } from '../utils';
import { scannerBlockConfigTableName } from '../constants';
import { createScannerBlockConfig } from './insert';
import { updateCurrentBlockHeight } from './update';
import { getScannerConfig } from './get';

describe('Test get in scanner_block_config', () => {
    let knex: Knex;
    let scanner_block_config: ScannerBlockConfig;
    before(async () => {
        knex = connectDB(getTestDBKnexConnection());
        scanner_block_config = {
            scannerId: 'new-scanner',
            currentBlockHeight: 24,
            startBlockHeight: 24
        };
        await createScannerBlockConfig(knex, scanner_block_config);
    });

    after(async () => {
        await knex(scannerBlockConfigTableName).del();
    });

    it('test update', async () => {
        await updateCurrentBlockHeight(knex, {
            scannerId: scanner_block_config.scannerId,
            currentBlockHeight:
                Number(scanner_block_config.currentBlockHeight) + 10
        });
        const scannerBlockConfig = await getScannerConfig(
            knex,
            scanner_block_config.scannerId
        );
        expect(BigInt(scannerBlockConfig?.currentBlockHeight as string)).to.eq(
            BigInt(Number(scanner_block_config.currentBlockHeight) + 10)
        );
    });
});
