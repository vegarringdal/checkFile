import { extractFileData } from './extractFileData';
import { generateTable, createSqlite, importData } from './dbUtils';
import * as Excel from 'exceljs';
import { consoleLog, readFile, consoleError } from './utils';
import * as path from 'path';


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

    // excel helper
    const createSheet = async (sheetName: string, sqlfile: string, workbook: Excel.stream.xlsx.WorkbookWriter) => {

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



            worksheet.commit();
            consoleLog('green', 'worksheet created:' + sheetName);
        } catch (err) {
            consoleError(err);
        }

    };

    await createSheet('Status', './sql/status_be.sql', workbook);
    await createSheet('A & B missing cable type', './sql/code_AB_BE_missingtype.sql', workbook);
    await createSheet('A & B cable summary', './sql/cabletypes_BE.sql', workbook);
    await createSheet('All errors', './sql/report_cables.sql', workbook);

    try {
        await workbook.commit();
    } catch (err) {
        consoleError(err);
    }

    consoleLog('green', 'workbook updated');
    process.exit();

};

run();
