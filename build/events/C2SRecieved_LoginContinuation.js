"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
let C2SRecieved_LoginContinuation = {
    event: 'c2sr_login_cont',
    callback: (socket, args) => {
        let sid = Number(args[0]);
        if (index_1.default.includes(sid)) {
            // Indeed it is the same user logging in.
            index_1.default.splice(index_1.default.indexOf(sid), 1);
            // Hello
            socket.emit('hiuser');
            return "User " + sid + " is continuing login";
        }
        return "No continue login";
    }
};
exports.default = C2SRecieved_LoginContinuation;
//# sourceMappingURL=C2SRecieved_LoginContinuation.js.map