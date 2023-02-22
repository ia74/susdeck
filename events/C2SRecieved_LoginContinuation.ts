import { Socket } from "socket.io"
import C2SEvent from "./C2SEvent";
import loginList from "../index"

let C2SRecieved_LoginContinuation: C2SEvent = {
    event: 'c2sr_login_cont',
    callback: (socket: Socket, args: Array<string>) => {
        let sid: number = Number(args[0]);
        if (loginList.includes(sid)) {
            // Indeed it is the same user logging in.
            loginList.splice(loginList.indexOf(sid), 1)
            // Hello
            socket.emit('hiuser')
            return "User " + sid + " is continuing login";
        }
        return "No continue login"
    }
}


export default C2SRecieved_LoginContinuation;