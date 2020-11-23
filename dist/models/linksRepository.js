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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linkModel_1 = __importDefault(require("./linkModel"));
function findByCode(code) {
    // linkModel = table in database
    return linkModel_1.default.findOne({ where: { code } });
}
function add(link) {
    // ILinkModel = linkModel do TS + link do db (unificação de type)
    return linkModel_1.default.create(link);
}
function hit(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = yield findByCode(code);
        if (!link)
            return null;
        //  '!' means that I take responsibility for use a property that can return null.
        // Because I know that this will not happen
        link.hits++;
        yield link.save();
        return link;
    });
}
exports.default = {
    findByCode,
    add,
    hit
};
