import { columnSetup } from './columnSetup';
import { consoleLog } from './utils';
import * as client from 'knex';


export const createSqlite = (filename: string): client => {
    const knex = client({
        client: 'sqlite3',
        connection: {
            filename: filename
        },
        useNullAsDefault: true
    });

    return knex;
};



export const importData = (knex: client, tablename: string, data: any[]) => {
    return new Promise(async (resolve, reject) => {
        try {
            await knex.transaction((tr) => {
                return knex
                    .batchInsert(tablename, data, 20)
                    .transacting(tr);
            });
            consoleLog('yellow', 'data imported:' + tablename);
            resolve();

        } catch (err) {
            consoleLog('red', 'error importing data to:' + err);
            reject();
        }
    });
};



export const generateTable = (knex: client, tablename: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const exists = await knex.schema.hasTable(tablename);
            if (!exists) {

                await knex.schema.createTable(tablename, (table: any) => {
                    columnSetup.forEach((obj) => {
                        table.text(obj.db);
                    });
                });
                consoleLog('yellow', 'table created:' + tablename);
                resolve();

            } else {

                await knex(tablename).truncate();
                consoleLog('yellow', 'table cleared:' + tablename);
                resolve();

            }
        } catch (err) {
            reject(err);
        }
    });
};

