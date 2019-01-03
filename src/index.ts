import { extractFileData } from './extractFileData';
import { generateTable, createSqlite, importData, queryDBAndCreateExcelSheet } from './dbUtils';
import * as Excel from 'exceljs';
import { consoleLog, consoleError, checkAndRemoveExcelFile } from './utils';


const run = async () => {

    /**
     * Check excel file if locked
     */
    const excelFilename = './streamed-workbook.xlsx';
    try {
        await checkAndRemoveExcelFile(excelFilename);
    } catch (e) {
        consoleError('close excel file, cant remove file: ' + excelFilename);
        consoleLog('', 'Quiting!');
        process.exit(0);
    }



    /**
     * create sqlite database and generate table
     */
    const tablename = 'tags';
    const knex = createSqlite('./mydb.sqlite');
    await generateTable(knex, tablename);



    /**
     * extract csv data and dump into database
     */
    const data = await extractFileData('./data.csv');
    await importData(knex, tablename, data);



    /**
     * generate excel file and sheets
     */
    const workbook = new Excel.stream.xlsx.WorkbookWriter({
        filename: excelFilename,
        useStyles: true
    });



    await queryDBAndCreateExcelSheet(
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



    await queryDBAndCreateExcelSheet(
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



    await queryDBAndCreateExcelSheet(
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
        // need to commit/save data
        await workbook.commit();
    } catch (err) {
        consoleError(err);
    }

    consoleLog('green', 'workbook updated');
    consoleLog('', 'DONE!');
    process.exit();

};

run();
