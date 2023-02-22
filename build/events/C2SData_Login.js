"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Settings_1 = __importDefault(require("../Settings"));
const crypto = __importStar(require("crypto"));
let C2SData_Login = {
    event: 'c2sd_login',
    callback: (socket, args) => {
        let password = args[0];
        let sid = "";
        console.log('Recieved password request!');
        if (password == Settings_1.default.Password) {
            console.log('Password is valid!');
            // Congratulations, now let's assign a session id.
            sid = crypto.randomBytes(8).toString('hex');
            console.log('Adding ' + sid + " to session ids");
            socket.emit('s2cs_login', sid, "../../");
            return 'ValidateSession:' + sid;
        }
        return "";
    }
};
exports.default = C2SData_Login;
//# sourceMappingURL=C2SData_Login.js.map