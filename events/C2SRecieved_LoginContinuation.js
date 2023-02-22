const settings = require('../Settings')
const loginList = require('../index')

module.exports = {
    event: 'c2sr_login_cont',
    callback: (socket, args, loginList) => {
        sid = args[0] 
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