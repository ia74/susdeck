const ex = require('express');
const app = ex();
const http = require('http').Server(app);
const rob = require('robotjs');
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use('/', ex.static('app'))

io.on('connection', (socket) => {
  console.log('Connected to client @ '+new Date())
  setTimeout(function(){socket.emit('indaclub')},150);
  socket.on('kp', keys => {
    if(keys.includes('{')) {
      keys.split('{').forEach(key => {
        if(key == '') return;
        key = key.split('}')[0];
        rob.keyToggle(key, "down")
        setTimeout(function () {rob.keyToggle(key, "up")}, 150)
      })
    } else {
      rob.keyTap(keys)
    }
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
