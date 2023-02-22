import { Socket } from "socket.io"
import C2SEvent from "./C2SEvent";
import Settings from "../Settings"
import * as crypto from "crypto";

let C2SData_Login: C2SEvent = {
    event: 'c2sd_login',
    callback: (socket: Socket, args: Array<string>) => {
        let password: string = args[0];
        let sid: string = "";
        console.log('Recieved password request!')
        if (password == Settings.Password) {
            console.log('Password is valid!')
            // Congratulations, now let's assign a session id.
            sid = crypto.randomBytes(8).toString('hex');
            console.log('Adding ' + sid + " to session ids")
            socket.emit('s2cs_login', sid, "../../")
            return 'ValidateSession:' + sid;
        }
        return "";
    }
}

export default C2SData_Login;