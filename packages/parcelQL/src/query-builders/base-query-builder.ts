import { Knex } from 'knex';

export class BaseQueryBuilder<T> {
    constructor(public readonly query: T) {
        this.onInit();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    build(knex: Knex): Knex.Raw {
        throw new Error('Method not implemented');
    }

    /**
     * Called within the constructor after query setup
     * Validate the properties provided and throw Validation Error
     */
    onInit(): void {}
}
