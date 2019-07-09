import * as client from 'knex';
import * as Excel from 'exceljs';
export declare const createSqlite: (filename: string) => client<any, any[]>;
export declare const importData: (knex: client<any, any[]>, tablename: string, data: any[]) => Promise<unknown>;
export declare const generateTable: (knex: client<any, any[]>, tablename: string) => Promise<unknown>;
export declare const queryDBAndCreateExcelSheet: (sheetName: string, sqlfile: string, workbook: Excel.stream.xlsx.WorkbookWriter, knex: client<any, any[]>, setStyle: Function) => Promise<void>;
