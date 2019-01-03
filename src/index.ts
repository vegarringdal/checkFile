import { extractFileData } from './extractFileData';
import { generateTable, createSqlite, importData, queryAndCreateSheet } from './dbUtils';
import * as Excel from 'exceljs';
import { consoleLog, consoleError } from './utils';



// excel helper


const run = async () => {

    const tablename = 'tags';
    const knex = createSqlite('./mydb.sqlite');

    await generateTable(knex, tablename);

    const data = await extractFileData('./data.csv');
    await importData(knex, tablename, data);

    const options = {
        filename: './streamed-workbook.xlsx'
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);

    await queryAndCreateSheet(
        'Status',
        './sql/status.sql',
        workbook,
        knex);

    await queryAndCreateSheet(
        'A & B missing cable type',
        './sql/missingtype.sql',
        workbook,
        knex);

    await queryAndCreateSheet(
        'A & B cable summary',
        './sql/cabletypes.sql',
        workbook,
        knex);

    await queryAndCreateSheet(
        'All errors',
        './sql/report_cables.sql',
        workbook,
        knex);

    try {
        await workbook.commit();
    } catch (err) {
        consoleError(err);
    }

    consoleLog('green', 'workbook updated');
    process.exit();

};

run();
