var socket = io();
var keys = document.getElementById('keys');
var keyList = [];
var loaded = false;
var loggedin = false;
var currentPage = 0;

addToHTMLlog('Waiting for server...')

socket.on('greenlight', function () {
    document.getElementById('loading').style.display = "none"
    if(localStorage.getItem('_sdpage')) {
        loadPage(localStorage.getItem('_sdpage'))
    } else {
        loadPage(0)
    }
})

socket.on('banish', function () {
    localStorage.setItem('_sdsession', '');
    window.location.reload()
})

socket.on('server_connected', function () {
    // _sdsession is session id
    addToHTMLlog("Connected! Checking for login status..")
    if (localStorage.getItem('_sdsession')) {
        socket.emit('Authenticated', localStorage.getItem('_sdsession'))
        addToHTMLlog('Success! You\'re logged in.')
        loaded = true;

    } else {
        addToHTMLlog('Not logged in, requesting login')
        loaded = true;
        localStorage.setItem('_sdsid', Math.random().toString().substring(2, 5))
        socket.emit('c2sr_login', localStorage.getItem("_sdsid"))
    }
})
socket.on('s2ca_login', function (s, c) {
    addToHTMLlog('Request received by server, let\'s log in.')
    window.location.href = s;
    localStorage.setItem('_sdl', c)
})

function addToHTMLlog(text) {
    document.getElementById('console').innerText += text + '\n';
}

let touchstartX = 0
let touchendX = 2500
    
function checkDirection() {
  if (touchendX < touchstartX) {
    // go page up
    if(Pages[currentPage+1]) {
        loadPage(currentPage+1)
    } else {
    }
  }
  if (touchendX > touchstartX) {
    // go page down
    if(Pages[currentPage-1]) {
        loadPage(currentPage-1)
    } else {
    }
  }
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})

setInterval(function () {
    // Auto refresh, you shouldn't be waiting to connect for longer than 500ms.
    if (loaded) return;
    addToHTMLlog('Connection attempt timed out. Retrying...')
    window.location.reload();
}, 500)


function loadPage(pageNumber) {
    currentPage = pageNumber;
    localStorage.setItem('_sdpage',currentPage);
    keyList = [];
    const myNode = document.getElementById("keys");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }

    Pages[pageNumber].forEach(sound => {
        keyList.push(sound);
        let btn = document.createElement('button');
        btn.className = "keypress btxt";
        if (sound.key) {
            btn.setAttribute('data-key', sound.key);
        } else {
            let txt = ''
            sound.keys.forEach(key => {
                txt += `{${key}}`
            })
            btn.setAttribute('data-key', txt);
        }
        if (sound.icon) {
            btn.style.backgroundImage = "url('icons/" + sound.icon + "')"
        }
        btn.innerText = sound.name;
        keys.appendChild(btn)
    })

    let sbtn = document.createElement('button');
    sbtn.className = "keypress";
    sbtn.setAttribute('data-key', 'f19');
    sbtn.innerText = "Stop All";
    let reloadbtn = document.createElement('button');
    reloadbtn.onclick = () => { window.location.reload() };
    reloadbtn.innerText = "Reload";
    let susdeck = document.createElement('a');
    susdeck.className = "button"
    susdeck.style.backgroundImage = "url('icons/susdeck.png')"
    keys.appendChild(reloadbtn);
    keys.appendChild(sbtn);
    keys.appendChild(susdeck);
    const allKeypress = document.getElementsByClassName('keypress');
    for (let i = 0; i < allKeypress.length; i++) {
        allKeypress[i].onclick = (ev) => {
            if (SoundOnPress) new Audio('press.mp3').play();
            socket.emit('keypress', allKeypress[i].getAttribute('data-key'))
        }
    }
}