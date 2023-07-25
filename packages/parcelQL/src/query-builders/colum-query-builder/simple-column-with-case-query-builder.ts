import { Knex } from 'knex';
import { ParcelQLValidationError } from '../../error';
import { ParcelQLCaseWhen, ParcelQLSimpleColumnWithCase } from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { SimpleColumnQueryBuilder } from './simple-column-query-builder';
import { CaseWhenQueryBuilder } from './case-when-query-builder';

export class SimpleColumnWithCaseQueryBuilder
    extends BaseQueryBuilder<ParcelQLSimpleColumnWithCase>
    implements ParcelQLSimpleColumnWithCase
{
    public readonly column: string | string[] | ParcelQLCaseWhen;
    public readonly type?: string | string[] | undefined;

    constructor(public readonly query: ParcelQLSimpleColumnWithCase) {
        super(query);
        this.column = query.column;
        this.type = query.type;
    }

    onInit(): void {
        if (
            this.query.column === undefined ||
            this.query.column === null ||
            (this.query.column as string | string[]).length === 0
        ) {
            throw new ParcelQLValidationError(
                `column value "${this.query.column}" is not valid`
            );
        }
        if (
            typeof this.query.type === 'undefined' ||
            typeof this.query.type === 'string' ||
            Array.isArray(this.query.type)
        ) {
            return;
        }
        throw new ParcelQLValidationError(
            `column typecasting to "${this.query.type}" is not valid`
        );
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        if (this.column && !(this.column as ParcelQLCaseWhen).cases) {
            // SimpleColumn
            return new SimpleColumnQueryBuilder({
                column: this.column as string | string[],
                type: this.type
            }).build(knex);
        }
        return new CaseWhenQueryBuilder(this.column as ParcelQLCaseWhen).build(
            knex
        );
    }
}
