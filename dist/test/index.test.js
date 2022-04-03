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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var helper_1 = require("./helper");
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, helper_1.deleteFile)();
        return [2];
    });
}); });
var sampleDataInput = {
    "id": "cd53f0a3-8bd8-415b-8cd1-df63223a583e",
    "organization": "NOV",
    "products": [
        "back end masters",
        "cold pizza"
    ],
    "marketValue": "90%",
    "address": "sangotedo",
    "ceo": "cn",
    "country": "nigeria",
    "noOfEmployees": 2,
    "employees": [
        "james bond",
        "jackie chan"
    ]
};
var sampleDataMatcher = {
    "marketValue": "90%",
    "address": "sangotedo",
    "ceo": "cn",
    "country": "nigeria"
};
var updateuserSample = {
    "marketValue": "20%",
    "address": "lagos",
    "ceo": "chika nwobi",
};
describe('GET API TESTS', function () {
    test('checks for errors if database.json file does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, supertest_1.default)(app_1.default).get('/users')];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(400);
                    expect(res.body).toEqual({ msg: 'Cannot get all users' });
                    return [2];
            }
        });
    }); });
    test('check if database.json file contains data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, supertest_1.default)(app_1.default).post('/users').send(sampleDataInput)];
                case 1:
                    _a.sent();
                    return [4, (0, supertest_1.default)(app_1.default).get('/users')];
                case 2:
                    res = _a.sent();
                    expect(res.statusCode).toBe(200);
                    expect(res.body).toMatchObject([sampleDataMatcher]);
                    return [2];
            }
        });
    }); });
    test("GET /users/:id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var postReq, getReq;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, supertest_1.default)(app_1.default).post('/users').send(sampleDataInput)];
                case 1:
                    postReq = _a.sent();
                    return [4, (0, supertest_1.default)(app_1.default).get("/users/" + postReq.body[0].id)];
                case 2:
                    getReq = _a.sent();
                    expect(postReq.statusCode).toBe(201);
                    expect(getReq.statusCode).toBe(200);
                    expect(getReq.body.id).toEqual(postReq.body[0].id);
                    return [2];
            }
        });
    }); });
});
describe('POST API TESTS', function () {
    test('it creates users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, supertest_1.default)(app_1.default).post('/users').send(sampleDataInput)];
                case 1:
                    res = _a.sent();
                    expect(res.statusCode).toBe(201);
                    expect(res.body).toMatchObject([sampleDataMatcher]);
                    return [2];
            }
        });
    }); });
});
describe('PUT API TESTS', function () {
    test('it updates users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postReq, getReq, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, supertest_1.default)(app_1.default).post('/users').send(sampleDataInput)];
                case 1:
                    postReq = _a.sent();
                    return [4, (0, supertest_1.default)(app_1.default).get('/users/' + postReq.body[0]['id'])];
                case 2:
                    getReq = _a.sent();
                    return [4, (0, supertest_1.default)(app_1.default).put('/users/' + getReq.body['id']).send({ updateuserSample: updateuserSample })];
                case 3:
                    updated = _a.sent();
                    expect(updated.statusCode).toBe(200);
                    return [2];
            }
        });
    }); });
});
describe('delete by user by id', function () {
    test('it deletes a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postReq, getReq, deleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, supertest_1.default)(app_1.default).post('/users').send(sampleDataInput)];
                case 1:
                    postReq = _a.sent();
                    return [4, (0, supertest_1.default)(app_1.default).get('/users/' + postReq.body[0]['id'])];
                case 2:
                    getReq = _a.sent();
                    return [4, (0, supertest_1.default)(app_1.default).delete('/users/' + getReq.body['id'])];
                case 3:
                    deleted = _a.sent();
                    expect(deleted.statusCode).toBe(200);
                    return [2];
            }
        });
    }); });
});
