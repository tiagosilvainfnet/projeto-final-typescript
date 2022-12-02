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
Object.defineProperty(exports, "__esModule", { value: true });
exports._get = exports._post = void 0;
const _get = (endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/${endpoint}`, {
        method: 'GET'
    });
    const result = yield response.json();
    return result;
});
exports._get = _get;
const _post = (endpoint, data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        body: data
    });
    const result = yield response.json();
    return result;
});
exports._post = _post;
