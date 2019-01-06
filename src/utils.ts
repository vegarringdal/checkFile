import * as fs from 'fs';
import * as path from 'path';
/**
 * Writes to file and returns promise
 *
 */
export const renameFolder = (oldPath: string, newPath: string) => {
    return new Promise((resolve, reject) => {
        fs.rename(path.resolve(oldPath), path.resolve(newPath), function (err: any) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export const readFile = (file: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(file), 'UTF8', (err: any, data: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const writeFile = (file: string, data: string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(file), data, function (err: any) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const checkAndRemoveExcelFile = (file: string) => {
    return new Promise((resolve, reject) => {
        fs.access(path.resolve(file), fs.constants.F_OK, (err) => {
            if (err) {
                resolve();
            } else {
                // console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
                fs.unlink(path.resolve(file), (err) => {
                    // console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
                    if (err) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            }

        });
    });
};

export const print = (color: string | undefined | null, comment: string, error?: boolean) => {
    switch (color) {
        case 'green':
            color = '\x1b[32m';
            break;
        case 'white':
            color = '\x1b[37m';
            break;
        case 'red':
            color = '\x1b[31m';
            break;
        case 'blue':
            color = '\x1b[36m';
            break;
        case 'purple':
            color = '\x1b[35m';
            break;
        default:
            color = '\x1b[37m';
    }



    if (error) {
        // Use red always
        console.error('\x1b[31m', comment + '\x1b[37m');
    } else {
        console.log(color, comment + '\x1b[37m');
    }
};

export const consoleLog = function (color: string | undefined | null, comment: string) {
    print(color, comment, false);
};

export const consoleError = function (comment: string) {
    print('red', comment, true);
};

