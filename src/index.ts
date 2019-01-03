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
        filename: './streamed-workbook.xlsx',
        useStyles: true
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);



    await queryAndCreateSheet(
        'Status',
        './sql/status.sql',
        workbook,
        knex,
        (worksheet: Excel.Worksheet) => {
            let rowValue = 'St';
            let toggle = false;
            worksheet.eachRow(function (row, _rowNumber) {

                // toggle
                let rowValueTemp = row.values[1];
                if (rowValueTemp) {
                    rowValueTemp = rowValueTemp.substring(0, 2);
                }
                if (rowValue !== rowValueTemp) {
                    toggle = toggle ? false : true;
                }
                rowValue = rowValueTemp;


                row.eachCell({ includeEmpty: true }, function (cell, _colNumber) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                    if (toggle) {
                        cell.fill = <any>{
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FFe6e6e6' }
                        };
                    }
                });

            });
        });

    /*
    // not needed
    await queryAndCreateSheet(
        'A & B missing cable type',
        './sql/missingtype.sql',
        workbook,
        knex,
        (worksheet: Excel.Worksheet) => {
            worksheet.eachRow(function (row, _rowNumber) {
                row.eachCell({ includeEmpty: true }, function (cell, _colNumber) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            });
        }); */



    await queryAndCreateSheet(
        'A & B cable summary',
        './sql/cabletypes.sql',
        workbook,
        knex,
        (worksheet: Excel.Worksheet) => {
            worksheet.eachRow(function (row, _rowNumber) {
                row.eachCell({ includeEmpty: true }, function (cell, _colNumber) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            });
        });



    await queryAndCreateSheet(
        'Cable Details',
        './sql/report_cables.sql',
        workbook,
        knex,
        (worksheet: Excel.Worksheet) => {
            worksheet.eachRow(function (row, _rowNumber) {
                row.eachCell({ includeEmpty: true }, function (cell, _colNumber) {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                    if (cell.value && (cell.value as any).indexOf('[todo]') !== -1) {
                        cell.fill = <any>{
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'FF0000' }
                        };
                    }

                });
            });
        });

    try {
        await workbook.commit();
    } catch (err) {
        consoleError(err);
    }

    consoleLog('green', 'workbook updated');
    process.exit();

};

run();
