import * as client from 'knex';
export declare const createSqlite: (filename: string) => client;
export declare const importData: (knex: client, tablename: string, data: any[]) => Promise<{}>;
export declare const generateTable: (knex: client, tablename: string) => Promise<{}>;
