import { Knex } from 'knex';
import { ParcelQLSimpleColumn } from '../schema';
import { BaseQueryBuilder } from './base-query-builder';
import { ParcelQLError, ParcelQLValidationError } from '../error';

export const supportedTypeCast = [
    // Numbers
    'integer',
    'smallint',
    'double precision',
    'decimal',
    'bigint',
    // numeric(p,s) argument
    // 'numeric',
    // Text and string
    'text',
    // Boolean
    'boolean',
    // Date and time
    'date',
    //TODO: Add interval in functions
    // Json
    'json',
    'jsonb'
];

export class SimpleColumnQueryBuilder
    extends BaseQueryBuilder<ParcelQLSimpleColumn>
    implements ParcelQLSimpleColumn
{
    public readonly column: string | string[];
    public readonly type: string | string[] | undefined;

    constructor(public readonly query: ParcelQLSimpleColumn) {
        super(query);
        this.column = query.column;
        this.type = query.type;
    }

    onInit(): void {
        if (
            this.query.column === undefined ||
            this.query.column === null ||
            this.query.column.length === 0
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

    private _buildSingleTypeCast(t: string): string {
        if (supportedTypeCast.includes(t)) {
            return `::${t}`;
        }
        throw new ParcelQLError(`Data type "${t}" is not supported.`);
    }

    private _buildTypeCast(): string {
        if (typeof this.type === 'string') {
            return this._buildSingleTypeCast(this.type);
        } else if (Array.isArray(this.type)) {
            return this.type
                .map((type) => this._buildSingleTypeCast(type))
                .join('');
        }
        throw new ParcelQLError('Invalid typecast.');
    }

    private _buildSingleColumn(col: string): [string, Knex.RawBinding[]] {
        if (typeof col === 'string') {
            return ['??', [col]];
        }
        throw new ParcelQLError(`column value must be string, sent ${col}`);
    }

    private _buildJSONExtractColumn(
        col: string[]
    ): [string, Knex.RawBinding[]] {
        if (col.length === 1) {
            return this._buildSingleColumn(col[0]);
        }
        const parameters: string[] = [];
        const expression: string[] = col
            .slice(0, col.length - 1)
            .map((c, index) => {
                parameters.push(c);
                if (index === 0) {
                    return '??';
                }
                return '?';
            });
        const query = `(${expression.join('->')}->>?)`;
        parameters.push(col[col.length - 1]);
        return [query, parameters];
    }

    build(knex: Knex<any, any[]>): Knex.Raw {
        // eslint-disable-next-line prefer-const
        let [query, params] =
            typeof this.column === 'string'
                ? this._buildSingleColumn(this.column)
                : this._buildJSONExtractColumn(this.column);
        if (this.type) {
            const type = this._buildTypeCast();
            query += type;
        }
        return knex.raw(query, params);
    }
}
