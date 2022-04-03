"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller_1 = require("../controller/controller");
var userValidation_1 = __importDefault(require("../validation/userValidation"));
var express_validator_1 = require("express-validator");
router.get("/", controller_1.getUsers);
router.get("/:id", controller_1.getUserById);
router.post("/", (0, express_validator_1.checkSchema)(userValidation_1.default), controller_1.createUser);
router.put("/:id", controller_1.updateUser);
router.delete("/:id", controller_1.deleteUser);
exports.default = router;
