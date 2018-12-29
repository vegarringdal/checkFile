import { readFile, consoleLog } from './utils';
import { columnSetup } from './columnSetup';
import * as path from 'path';
import * as papa from 'papaparse';



export const extractFileData = (filePath: string): Promise<any[]> => {
    // generate data we need
    return new Promise((resolve) => {

        readFile(path.resolve(filePath)).then((fileData: string) => {

            const result = papa.parse(fileData);
            const fileLines = result.data;
            if (fileLines.length === 0) {
                consoleLog('error', `rows found:${fileLines.length}`);
            }


            let headerColumns = fileLines[0];
            headerColumns = headerColumns;
            headerColumns.forEach((column: any, i: number) => {
                columnSetup.forEach((obj) => {
                    if (obj.file === column) {
                        obj.rowColumn = i;
                    }
                });
            });


            const importData: any[] = [];
            for (let u = 1; u < fileLines.length; u++) {
                const data: any = {};
                let columnsRow = fileLines[u];
                columnsRow = columnsRow;
                columnSetup.forEach((obj) => {
                    if (obj.rowColumn > -1 && columnsRow) {
                        data[obj.db] = columnsRow[obj.rowColumn] === '' ? null : columnsRow[obj.rowColumn];

                    }
                });
                importData.push(data);
            }


            resolve(importData);

        });
    });
};
