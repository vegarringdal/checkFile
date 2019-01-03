Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var columnSetup_1 = require("./columnSetup");
var path = require("path");
var papa = require("papaparse");
exports.extractFileData = function (filePath) {
    return new Promise(function (resolve) {
        utils_1.readFile(path.resolve(filePath)).then(function (fileData) {
            if (fileData.charCodeAt(0) === 0xFEFF) {
                fileData = fileData.substr(1);
            }
            var result = papa.parse(fileData);
            var fileLines = result.data;
            if (fileLines.length === 0) {
                utils_1.consoleLog('error', "rows found:" + fileLines.length);
            }
            var headerColumns = fileLines[0];
            headerColumns = headerColumns;
            headerColumns.forEach(function (column, i) {
                columnSetup_1.columnSetup.forEach(function (obj) {
                    if (obj.file === column) {
                        obj.rowColumn = i;
                    }
                });
            });
            var importData = [];
            var _loop_1 = function (u) {
                var data = {};
                var columnsRow = fileLines[u];
                columnsRow = columnsRow;
                columnSetup_1.columnSetup.forEach(function (obj) {
                    if (obj.rowColumn > -1 && columnsRow) {
                        data[obj.db] = columnsRow[obj.rowColumn] === '' ? null : columnsRow[obj.rowColumn];
                    }
                });
                importData.push(data);
            };
            for (var u = 1; u < fileLines.length; u++) {
                _loop_1(u);
            }
            resolve(importData);
        });
    });
};
//# sourceMappingURL=extractFileData.js.map