"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
var uuid_1 = require("uuid");
var utils_1 = require("../utils/utils");
var express_validator_1 = require("express-validator");
var fs_1 = require("fs");
function getUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var getAllUsers, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, (0, utils_1.readUserDataBase)()];
                case 1:
                    getAllUsers = _a.sent();
                    res.status(200).json(getAllUsers);
                    return [3, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(400).json({ msg: 'Cannot get all users' });
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
exports.getUsers = getUsers;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, (0, utils_1.userId)(req.params.id)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        res.status(404).json({ msg: "No member with the id of ".concat(req.params.id) });
                    }
                    else {
                        res.status(200).json(user);
                    }
                    return [3, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
exports.getUserById = getUserById;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2, errors, data, newUser, users, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    return [4, fs_1.promises.access(utils_1.database)];
                case 2:
                    _a.sent();
                    return [3, 5];
                case 3:
                    err_2 = _a.sent();
                    return [4, (0, utils_1.writeDataToFile)(utils_1.database, [])];
                case 4:
                    _a.sent();
                    return [3, 5];
                case 5:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        return [2, res.status(400).json({
                                success: false,
                                errors: errors.array(),
                            })];
                    }
                    data = req.body;
                    newUser = {
                        id: (0, uuid_1.v4)(),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        organization: data.organization,
                        products: data.products,
                        marketValue: data.marketValue,
                        address: data.address,
                        ceo: data.ceo,
                        country: data.country,
                        noOfEmployees: data.noOfEmployees,
                        employees: data.employees,
                    };
                    return [4, (0, utils_1.readUserDataBase)()];
                case 6:
                    users = _a.sent();
                    users.push(newUser);
                    (0, utils_1.writeDataToFile)(utils_1.database, users);
                    return [2, res.status(201).json(users)];
                case 7:
                    error_2 = _a.sent();
                    return [2, res.status(400).json({ msg: "Please include valid details" })];
                case 8: return [2];
            }
        });
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, body, organization, products, marketValue, address, ceo, country, noOfEmployees, employees, usersData, updUser, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4, (0, utils_1.userId)(req.params.id)];
                case 1:
                    user = _a.sent();
                    if (!!user) return [3, 2];
                    res.status(400).json({ message: "User Not Found" });
                    return [3, 4];
                case 2:
                    body = req.body;
                    organization = body.organization, products = body.products, marketValue = body.marketValue, address = body.address, ceo = body.ceo, country = body.country, noOfEmployees = body.noOfEmployees, employees = body.employees;
                    usersData = {
                        createdAt: user.createdAt,
                        updatedAt: new Date().toISOString(),
                        organization: organization || user.organization,
                        products: products || user.products,
                        marketValue: marketValue || user.marketValue,
                        address: address || user.address,
                        ceo: ceo || user.ceo,
                        country: country || user.country,
                        noOfEmployees: noOfEmployees || user.noOfEmployees,
                        employees: employees || user.employees,
                    };
                    return [4, (0, utils_1.update)(req.params.id, usersData)];
                case 3:
                    updUser = _a.sent();
                    res.status(200).json(updUser);
                    _a.label = 4;
                case 4: return [3, 6];
                case 5:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, users, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4, (0, utils_1.userId)(req.params.id)];
                case 1:
                    user = _a.sent();
                    if (!!user) return [3, 2];
                    res.status(401).json({ msg: "No user with the id of ".concat(req.params.id) });
                    return [3, 4];
                case 2: return [4, (0, utils_1.remove)(req.params.id)];
                case 3:
                    users = _a.sent();
                    res.status(200).json({
                        message: "User with ".concat(req.params.id, " has been removed"),
                        users: users,
                    });
                    _a.label = 4;
                case 4: return [3, 6];
                case 5:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
exports.deleteUser = deleteUser;
