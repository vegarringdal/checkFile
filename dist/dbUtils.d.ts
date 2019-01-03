import * as client from 'knex';
import * as Excel from 'exceljs';
export declare const createSqlite: (filename: string) => client;
export declare const importData: (knex: client, tablename: string, data: any[]) => Promise<{}>;
export declare const generateTable: (knex: client, tablename: string) => Promise<{}>;
export declare const queryAndCreateSheet: (sheetName: string, sqlfile: string, workbook: Excel.stream.xlsx.WorkbookWriter, knex: client, setStyle: Function) => Promise<void>;
