const ex = require('express');
const app = ex();
const http = require('http').Server(app);
const rob = require('robotjs');
const io = require('socket.io')(http);
const settings = require('./Settings')
const port = process.env.PORT || 3000;

let loginList = [];
let sessions = [];

app.use('/', ex.static('app'))

io.on('connection', (socket) => {
  console.log('Connected to client @ ' + new Date())

  setTimeout(function () { socket.emit('server_connected'); console.log("Sent user connection success message") }, 150);
  socket.on('keypress', keys => {
    if (keys.includes('{')) {
      keys.split('{').forEach(key => {
        if (key == '') return;
        key = key.split('}')[0];
        rob.keyToggle(key, "down")
        setTimeout(function () { rob.keyToggle(key, "up") }, 150)
      })
    } else {
      rob.keyTap(keys)
    }
  });

  socket.on('c2sr_login_cont', (sid) => {
    if (loginList.includes(sid)) {
      // Indeed it is the same user logging in.
      loginList.splice(loginList.indexOf(sid), 1)
      // Hello
      console.log("User " + sid + " is continuing login")
      socket.emit('hiuser')
    }
  })
  socket.on('c2sd_login', (password) => {
    console.log('Recieved password request!')
    if (password == settings.Password) {
      console.log('Password is valid!')
      // Congratulations, now let's assign a session id.
      sid = require('crypto').randomBytes(8).toString('hex');
      console.log('Adding ' + sid + " to session ids")
      sessions.push(sid)
      socket.emit('s2cs_login', sid, "../")

    }
  })
  socket.on('c2sr_login', (sid) => {
    if (!settings.UseAuthentication) { socket.emit('greenlight'); return; }
    // ID recieved, load into memory so we know it's the same user logging in.
    loginList.push(sid);
    console.log("User " + sid + " requested login!")
    // We'll confirm that we want to take user to the login page.
    socket.emit('s2ca_login', 'assets/tools/Login.html', settings.LoginMessage)
  })
  socket.on('Authenticated', (sessionID) => {
    console.log("Recieved " + sessionID, ", checking..")
    if (sessions.includes(sessionID)) {
      console.log(sessionID, "is valid!")
      socket.emit('greenlight')
    } else {
      console.log(sessionID, "is invalid, kicking out user..")
      socket.emit('banish')
    }
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
