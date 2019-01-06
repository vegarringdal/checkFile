Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
exports.renameFolder = function (oldPath, newPath) {
    return new Promise(function (resolve, reject) {
        fs.rename(path.resolve(oldPath), path.resolve(newPath), function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.readFile = function (file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.resolve(file), 'UTF8', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.writeFile = function (file, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.resolve(file), data, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.checkAndRemoveExcelFile = function (file) {
    return new Promise(function (resolve, reject) {
        fs.access(path.resolve(file), fs.constants.F_OK, function (err) {
            if (err) {
                resolve();
            }
            else {
                fs.unlink(path.resolve(file), function (err) {
                    if (err) {
                        reject();
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
};
exports.print = function (color, comment, error) {
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
        console.error('\x1b[31m', comment + '\x1b[37m');
    }
    else {
        console.log(color, comment + '\x1b[37m');
    }
};
exports.consoleLog = function (color, comment) {
    exports.print(color, comment, false);
};
exports.consoleError = function (comment) {
    exports.print('red', comment, true);
};
//# sourceMappingURL=utils.js.map