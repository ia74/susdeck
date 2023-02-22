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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const httpLib = require("http");
const rob = __importStar(require("robotjs"));
const fs = __importStar(require("fs"));
const socket_io_1 = require("socket.io");
const app = express();
const http = new httpLib.Server(app);
const io = new socket_io_1.Server(http);
const port = process.env.PORT || 3000;
let loginList = [];
let sessions = [];
let events = new Map();
app.use('/', express.static('../app'));
fs.readdirSync('events').forEach(file => {
    if (file.includes('.map') || file.includes('C2SEvent'))
        return;
    file = "events/" + file;
    let query = require('./' + file);
    events.set(query.event, { event: query.event, callback: query.callback });
});
io.on('connection', (socket) => {
    console.log('Connected to client @ ' + new Date());
    setTimeout(function () { socket.emit('server_connected'); console.log("Sent user connection success message"); }, 150);
    socket.on('keypress', keys => {
        if (keys.includes('{')) {
            keys.split('{').forEach((key) => {
                if (key == '')
                    return;
                key = key.split('}')[0];
                rob.keyToggle(key, "down");
                setTimeout(function () { rob.keyToggle(key, "up"); }, 150);
            });
        }
        else {
            rob.keyTap(keys);
        }
    });
    events.forEach(event => {
        socket.on(event.event, (args) => {
            let callback = event.callback(socket, args, loginList);
            if (callback.startsWith('ValidateSession:')) {
                let person = callback.split(":")[1];
                sessions.push(person);
            }
        });
    });
    socket.on('Authenticated', (sessionID) => {
        console.log("Recieved " + sessionID, ", checking..");
        if (sessions.includes(sessionID)) {
            console.log(sessionID, "is valid!");
            socket.emit('greenlight');
        }
        else {
            console.log(sessionID, "is invalid, kicking out user..");
            socket.emit('banish');
        }
    });
});
http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
exports.default = loginList;
//# sourceMappingURL=index.js.map