"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Settings_1 = __importDefault(require("../Settings"));
const __1 = __importDefault(require(".."));
let C2SRecieved_Login = {
    event: 'c2sr_login',
    callback: (socket, args) => {
        let sid = Number(args[0]);
        if (!Settings_1.default.UseAuthentication) {
            socket.emit('greenlight');
            return "";
        }
        // ID recieved, load into memory so we know it's the same user logging in.
        __1.default.push(sid);
        // We'll confirm that we want to take user to the login page.
        socket.emit('s2ca_login', 'assets/tools/Login.html', Settings_1.default.LoginMessage);
        return "User " + sid + " requested login!";
    }
};
exports.default = C2SRecieved_Login;
//# sourceMappingURL=C2SRecieved_Login.js.map