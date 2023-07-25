/* eslint-disable @typescript-eslint/no-unused-vars */
import { Knex } from 'knex';

export class BaseQueryBuilder<T, R = Knex.Raw> {
    constructor(public readonly query: T) {
        this.onInit();
    }

    build(knex: Knex): R {
        this._beforeBuild(knex);
        return this._build(knex);
    }

    /**
     * Hook called just before building the query
     * Primarily used for preparing the states of the builder
     * @param knex - Knex
     */
    protected _beforeBuild(knex: Knex) {}

    /**
     * Main query building goes here.
     * @param knex - Knex
     */
    protected _build(knex: Knex): R {
        throw new Error('Method not implemented');
    }

    /**
     * Called within the constructor after query setup
     * Validate the properties provided and throw Validation Error
     * **Warning** : Use only for validations and do not update state as it will
     * reset during constructor call from child.
     * For updating states before build use `beforeBuild` hook
     */
    protected onInit(): void {}
}
