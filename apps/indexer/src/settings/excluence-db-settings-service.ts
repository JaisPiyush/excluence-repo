import { SettingsServiceInterface } from 'flow-scanner-lib/src/settings/settings-service';
import { Knex } from 'knex';
import {
    ScannerBlockConfig,
    createScannerBlockConfig,
    getScannerConfig,
    updateCurrentBlockHeight
} from '@excluence-repo/db';

export class ExcluenceDBSettingsService implements SettingsServiceInterface {
    constructor(
        private readonly knex: Knex,
        private readonly scannerId: string
    ) {}

    initScannerConfig = async (startBlockHeight: number = 0) => {
        const scannerBlockConfig = await getScannerConfig(
            this.knex,
            this.scannerId
        );
        if (scannerBlockConfig) return undefined;
        const scanner_block_config_data: ScannerBlockConfig = {
            scannerId: this.scannerId,
            currentBlockHeight: BigInt(startBlockHeight),
            startBlockHeight: BigInt(startBlockHeight)
        };
        await createScannerBlockConfig(this.knex, scanner_block_config_data);
    };

    getProcessedBlockHeight = async (): Promise<number | undefined> => {
        const scannerBlockConfig = await getScannerConfig(
            this.knex,
            this.scannerId
        );
        if (!scannerBlockConfig) return undefined;
        return Number(scannerBlockConfig.currentBlockHeight);
    };

    setProcessedBlockHeight = async (blockHeight: number) => {
        await updateCurrentBlockHeight(this.knex, {
            scannerId: this.scannerId,
            currentBlockHeight: BigInt(blockHeight)
        });
    };

    destroy = async () => {};
}
