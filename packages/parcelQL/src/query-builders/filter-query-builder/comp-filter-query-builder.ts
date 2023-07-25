/* eslint-disable @typescript-eslint/no-unused-vars */
import { Knex } from 'knex';
import { ParcelQLError, ParcelQLValidationError } from '../../error';
import {
    ComparisonOps,
    CompFilter,
    comparisonOperators,
    ParcelQLSimpleColumn,
    ComparisonFilterColumn
} from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { SimpleColumnQueryBuilder } from '../colum-query-builder/simple-column-query-builder';
import { ColumnQueryBuilder } from '../colum-query-builder/column-query-builder';

export class CompFilterQueryBuilder extends BaseQueryBuilder<CompFilter> {
    public readonly operator: ComparisonOps;
    public readonly value?: unknown;
    public readonly rightColumn?: ComparisonFilterColumn;
    public readonly column: string | string[] | ComparisonFilterColumn;
    public readonly type?: string | string[] | undefined;
    private _colBuilder: ColumnQueryBuilder;
    private readonly rightColBuilder?: ColumnQueryBuilder;

    constructor(public readonly query: CompFilter) {
        super(query);
        this.column = query.column;
        this.type = query.type;
        const colData =
            typeof this.column === 'string' || Array.isArray(this.column)
                ? { column: this.column, type: this.type }
                : this.column;
        this._colBuilder = new ColumnQueryBuilder(colData);
        // this.type = query.type;
        this.operator = query.operator;
        if ((query as { value?: unknown }).value) {
            this.value = (query as { value: unknown }).value;
        } else if (
            (query as unknown as { rightColumn: ComparisonFilterColumn })
                .rightColumn
        ) {
            this.rightColumn = (
                query as { rightColumn: ComparisonFilterColumn }
            ).rightColumn;
            this.rightColBuilder = new ColumnQueryBuilder(this.rightColumn);
        } else {
            throw new ParcelQLError(
                `either value or rightColumn is required for comparison`
            );
        }
    }

    onInit(): void {
        if (!comparisonOperators.includes(this.query.operator)) {
            throw new ParcelQLValidationError(
                `filter operator "${this.query.operator}" is not supported.`
            );
        }
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        const column = this._colBuilder.build(knex);
        if (this.rightColBuilder) {
            return knex.raw(`?? ${this.operator} ??`, [
                column,
                this.rightColBuilder.build(knex)
            ]);
        }
        const params = Array.isArray(this.value)
            ? `${this.value.map((v) => '?').join(', ')})`
            : '?';
        let args = [column];
        args = Array.isArray(this.value)
            ? args.concat(this.value)
            : args.concat([this.value as any]);
        return knex.raw(`?? ${this.operator} ${params}`, args);
    }
}
