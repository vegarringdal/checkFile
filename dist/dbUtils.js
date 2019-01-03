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
var columnSetup_1 = require("./columnSetup");
var utils_1 = require("./utils");
var client = require("knex");
var path = require("path");
exports.createSqlite = function (filename) {
    var knex = client({
        client: 'sqlite3',
        connection: {
            filename: filename
        },
        useNullAsDefault: true
    });
    return knex;
};
exports.importData = function (knex, tablename, data) {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, knex.transaction(function (tr) {
                            return knex
                                .batchInsert(tablename, data, 20)
                                .transacting(tr);
                        })];
                case 1:
                    _a.sent();
                    utils_1.consoleLog('green', 'data imported:' + tablename);
                    resolve();
                    return [3, 3];
                case 2:
                    err_1 = _a.sent();
                    utils_1.consoleLog('red', 'error importing data to:' + err_1);
                    reject();
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
};
exports.generateTable = function (knex, tablename) {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var exists, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4, knex.schema.hasTable(tablename)];
                case 1:
                    exists = _a.sent();
                    if (!!exists) return [3, 3];
                    return [4, knex.schema.createTable(tablename, function (table) {
                            columnSetup_1.columnSetup.forEach(function (obj) {
                                table.text(obj.db);
                            });
                        })];
                case 2:
                    _a.sent();
                    utils_1.consoleLog('green', 'table created:' + tablename);
                    resolve();
                    return [3, 5];
                case 3: return [4, knex(tablename).truncate()];
                case 4:
                    _a.sent();
                    utils_1.consoleLog('green', 'table cleared:' + tablename);
                    resolve();
                    _a.label = 5;
                case 5: return [3, 7];
                case 6:
                    err_2 = _a.sent();
                    reject(err_2);
                    return [3, 7];
                case 7: return [2];
            }
        });
    }); });
};
exports.queryAndCreateSheet = function (sheetName, sqlfile, workbook, knex, setStyle) { return __awaiter(_this, void 0, void 0, function () {
    var worksheet_1, sqltext, result, columns, k, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                worksheet_1 = workbook.addWorksheet(sheetName, {
                    views: [
                        { state: 'frozen', ySplit: 1 }
                    ]
                });
                return [4, utils_1.readFile((path.resolve(sqlfile)))];
            case 1:
                sqltext = _a.sent();
                return [4, knex.raw(sqltext)];
            case 2:
                result = _a.sent();
                columns = [];
                for (k in result[0]) {
                    if (result[0] && result[0][k] !== undefined) {
                        columns.push({
                            header: k,
                            key: k,
                            width: 10,
                            style: {
                                font: { name: 'Calibri Light' }
                            }
                        });
                    }
                }
                worksheet_1.columns = columns;
                result.forEach(function (element) {
                    worksheet_1.addRow(element);
                });
                worksheet_1.autoFilter = {
                    from: {
                        row: 1,
                        column: 1
                    },
                    to: {
                        row: result.length,
                        column: columns.length
                    }
                };
                worksheet_1.getRow(1).font = { bold: true };
                setStyle(worksheet_1);
                return [4, worksheet_1.commit()];
            case 3:
                _a.sent();
                utils_1.consoleLog('green', 'worksheet created:' + sheetName);
                return [3, 5];
            case 4:
                err_3 = _a.sent();
                utils_1.consoleError(err_3);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
//# sourceMappingURL=dbUtils.js.map