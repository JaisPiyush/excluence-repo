import { Knex } from 'knex';
import { ParcelQLValidationError } from '../../error';
import { OrderByExpr, ParcelQLOrderBy, orderByOrders } from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { SimpleColumnQueryBuilder } from '../colum-query-builder/simple-column-query-builder';

export class OrderByQueryBuilder
    extends BaseQueryBuilder<ParcelQLOrderBy>
    implements ParcelQLOrderBy
{
    public readonly expressions: OrderByExpr[];

    constructor(public readonly query: ParcelQLOrderBy) {
        super(query);
        this.expressions = query.expressions;
    }

    onInit(): void {
        this.query.expressions.forEach((expr) => {
            if (expr.order && !orderByOrders.includes(expr.order)) {
                throw new ParcelQLValidationError(
                    `order_by must be either ASC or DESC`
                );
            }
        });
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        const expressions: Knex.RawBinding[] = this.expressions.map((expr) => {
            const builder = new SimpleColumnQueryBuilder({
                column: expr.column,
                type: expr.type
            });
            return knex.raw(`?? ${expr.order || 'ASC'}`, [builder.build(knex)]);
        });
        return knex.raw(`ORDER BY ${expressions.join(', ')}`);
    }
}
