import { columnSetup } from './columnSetup';
import { consoleLog, readFile, consoleError } from './utils';
import * as client from 'knex';
import * as path from 'path';
import * as Excel from 'exceljs';

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
            consoleLog('green', 'data imported:' + tablename);
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
                consoleLog('green', 'table created:' + tablename);
                resolve();

            } else {

                await knex(tablename).truncate();
                consoleLog('green', 'table cleared:' + tablename);
                resolve();

            }
        } catch (err) {
            reject(err);
        }
    });
};



export const queryAndCreateSheet = async (sheetName: string, sqlfile: string, workbook: Excel.stream.xlsx.WorkbookWriter, knex: client) => {

    try {
        const worksheet = workbook.addWorksheet(sheetName);
        const sqltext = await readFile((path.resolve(sqlfile)));
        const result = await knex.raw(sqltext);

        // generate columns
        const columns = [];
        for (const k in result[0]) {
            if (result[0] && result[0][k] !== undefined) {
                columns.push({ header: k, key: k, width: 10 });
            }
        }
        worksheet.columns = columns;
        result.forEach((element: any) => {
            worksheet.addRow(element);
        });

        worksheet.autoFilter = {
            from: {
                row: 1,
                column: 1
            },
            to: {
                row: result.length,
                column: columns.length
            }
        };



        worksheet.commit();
        consoleLog('green', 'worksheet created:' + sheetName);
    } catch (err) {
        consoleError(err);
    }

};
