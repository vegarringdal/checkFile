import { readFile, consoleLog } from './utils';
import { columnSetup } from './columnSetup';
import * as path from 'path';


export const extractFileData = (filePath: string): Promise<any[]> => {
    // generate data we need
    return new Promise((resolve) => {

        readFile(path.resolve(filePath)).then((fileData: string) => {

            const fileLines = fileData.split('\n');
            if (fileLines.length === 0) {
                consoleLog('error', `rows found:${fileLines.length}`);
            }


            const semiSignTest = fileLines[0].split(',');
            const semiColonSignTest = fileLines[0].split(';');
            let columnSeperator = ';';
            if (semiSignTest.length > semiColonSignTest.length) {
                columnSeperator = ',';
            }


            const headerColumns = fileLines[0].split(columnSeperator);
            headerColumns.forEach((column, i) => {
                columnSetup.forEach((obj) => {
                    if (obj.file === column) {
                        obj.rowColumn = i;
                    }
                });
            });


            const importData: any[] = [];
            for (let u = 1; u < fileLines.length; u++) {
                const data: any = {};
                const columnsRow = fileLines[u].split(columnSeperator);
                columnSetup.forEach((obj) => {
                    if (obj.rowColumn > -1) {
                        data[obj.db] = columnsRow[obj.rowColumn] === '' ? null : columnsRow[obj.rowColumn];
                    }
                });
                importData.push(data);
            }


            resolve(importData);

        });
    });
};
