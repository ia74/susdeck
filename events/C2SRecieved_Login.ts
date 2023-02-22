import Settings from "../Settings"
import loginList from "..";
import C2SEvent from "./C2SEvent";
import { Socket } from "socket.io";

let C2SRecieved_Login: C2SEvent = {
  event: 'c2sr_login',
  callback: (socket: Socket, args: Array<string>) => {
    let sid: number = Number(args[0]);
    if (!Settings.UseAuthentication) { socket.emit('greenlight'); return ""; }
    // ID recieved, load into memory so we know it's the same user logging in.
    loginList.push(sid)

    // We'll confirm that we want to take user to the login page.
    socket.emit('s2ca_login', 'assets/tools/Login.html', Settings.LoginMessage)
    return "User " + sid + " requested login!"
  }
}

export default C2SRecieved_Login;