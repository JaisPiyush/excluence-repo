import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import knex_connector, { Knex } from 'knex';
import { useKnexMemoryDBModuleConfig } from '../app.imports';

@Injectable()
export class KnexSqliteService implements OnModuleInit, OnModuleDestroy {
  private knex: Knex;

  onModuleInit() {
    this.knex = knex_connector(useKnexMemoryDBModuleConfig());
  }
  async onModuleDestroy() {
    await this.knex.destroy();
  }

  get(): Knex {
    return this.knex;
  }
}
