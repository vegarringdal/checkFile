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
        consoleLog('green', 'removing old excel report: ' + excelFilename);
        await checkAndRemoveExcelFile(excelFilename);
    } catch (e) {
        consoleError('close excel file, cant remove file: ' + excelFilename);
        process.exit(0);
    }


    /**
     * create sqlite database and generate table
     */
    const tablename = 'tags';
    const sqlliteFile = './mydb2.sqlite';
    consoleLog('green', 'creating/using sqllite: ' + sqlliteFile);
    const knex = createSqlite(sqlliteFile);
    await generateTable(knex, tablename);



    /**
     * extract csv data and dump into database
     */
    const csvfile = './data.csv';
    consoleLog('green', 'reading csv file: ' + csvfile);
    const data = await extractFileData(csvfile);
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
            let rowValue = '';
            let toggle = true;
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
                            fgColor: { argb: 'FFA9A9A9' }
                        };
                    }
                });

            });
        });



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
        'A & B cable summary w-disc',
        './sql/cabletypes_disc.sql',
        workbook,
        knex,
        (worksheet: Excel.Worksheet) => {

            let rowValue = '';
            let toggle = true;
            worksheet.eachRow(function (row, _rowNumber) {

                // toggle
                let rowValueTemp = row.values[3];
                if (rowValueTemp) {
                    rowValueTemp = rowValueTemp;
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
                            fgColor: { argb: 'FFA9A9A9' }
                        };
                    }
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

    consoleLog('green', 'workbook updated!');
    process.exit();

};

run();
