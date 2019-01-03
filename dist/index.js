var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var extractFileData_1 = require("./extractFileData");
var dbUtils_1 = require("./dbUtils");
var Excel = require("exceljs");
var utils_1 = require("./utils");
var run = function () { return __awaiter(_this, void 0, void 0, function () {
    var tablename, knex, data, options, workbook, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tablename = 'tags';
                knex = dbUtils_1.createSqlite('./mydb.sqlite');
                return [4, dbUtils_1.generateTable(knex, tablename)];
            case 1:
                _a.sent();
                return [4, extractFileData_1.extractFileData('./data.csv')];
            case 2:
                data = _a.sent();
                return [4, dbUtils_1.importData(knex, tablename, data)];
            case 3:
                _a.sent();
                options = {
                    filename: './streamed-workbook.xlsx',
                    useStyles: true
                };
                workbook = new Excel.stream.xlsx.WorkbookWriter(options);
                return [4, dbUtils_1.queryAndCreateSheet('Status', './sql/status.sql', workbook, knex, function (worksheet) {
                        var rowValue = 'St';
                        var toggle = false;
                        worksheet.eachRow(function (row, _rowNumber) {
                            var rowValueTemp = row.values[1];
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
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'FFe6e6e6' }
                                    };
                                }
                            });
                        });
                    })];
            case 4:
                _a.sent();
                return [4, dbUtils_1.queryAndCreateSheet('A & B cable summary', './sql/cabletypes.sql', workbook, knex, function (worksheet) {
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
                    })];
            case 5:
                _a.sent();
                return [4, dbUtils_1.queryAndCreateSheet('Cable Details', './sql/report_cables.sql', workbook, knex, function (worksheet) {
                        worksheet.eachRow(function (row, _rowNumber) {
                            row.eachCell({ includeEmpty: true }, function (cell, _colNumber) {
                                cell.border = {
                                    top: { style: 'thin' },
                                    left: { style: 'thin' },
                                    bottom: { style: 'thin' },
                                    right: { style: 'thin' }
                                };
                                if (cell.value && cell.value.indexOf('[todo]') !== -1) {
                                    cell.fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: { argb: 'FF0000' }
                                    };
                                }
                            });
                        });
                    })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4, workbook.commit()];
            case 8:
                _a.sent();
                return [3, 10];
            case 9:
                err_1 = _a.sent();
                utils_1.consoleError(err_1);
                return [3, 10];
            case 10:
                utils_1.consoleLog('green', 'workbook updated');
                process.exit();
                return [2];
        }
    });
}); };
run();
//# sourceMappingURL=index.js.map