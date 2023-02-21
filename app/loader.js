var socket = io();
var keys = document.getElementById('keys');
var keyList = [];
var loaded = false;
var loggedin = false;

addToHTMLlog('Waiting for server...')

const allKeypress = document.getElementsByClassName('keypress');
for (let i = 0; i < allKeypress.length; i++) {
    allKeypress[i].onclick = (ev) => {
        if (SoundOnPress) new Audio('press.mp3').play();
        socket.emit('keypress', allKeypress[i].getAttribute('data-key'))
    }
}

socket.on('greenlight', function() {
    document.getElementById('loading').style.display = "none"
    loadPage(0)
})

socket.on('banish', function() {
    localStorage.setItem('_sdsession',''); 
    window.location.reload()
})

socket.on('server_connected', function () {
    // _sdsession is session id
    addToHTMLlog("Connected! Checking for login status..")
    if(localStorage.getItem('_sdsession')) {
        socket.emit('Authenticated', localStorage.getItem('_sdsession'))
        addToHTMLlog('Success! You\'re logged in.')
        loaded = true;

    } else {
    addToHTMLlog('Not logged in, requesting login')
    loaded = true;
    localStorage.setItem('_sdsid',Math.random().toString().substring(2,5))
    socket.emit('c2sr_login',localStorage.getItem("_sdsid"))
    }
})
socket.on('s2ca_login', function (s,c) {
    addToHTMLlog('Request received by server, let\'s log in.')
    window.location.href = s;
    localStorage.setItem('_sdl',c)
})

function addToHTMLlog(text) {
    document.getElementById('console').innerText += text+'\n';
}

setInterval(function() {
    // Auto refresh, you shouldn't be waiting to connect for longer than 500ms.
    if(loaded) return;
    addToHTMLlog('Connection attempt timed out. Retrying...')
    window.location.reload();
},500)


function loadPage(pageNumber) {
    keyList = [];
    const myNode = document.getElementById("keys");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }

    Pages[pageNumber].forEach(sound => {
        keyList.push(sound);
        let btn = document.createElement('button');
        btn.className = "keypress";
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
    if (Pages[pageNumber + 1] && pageNumber == 0) {
        let np = document.createElement('button');
        np.onclick = () => { loadPage(pageNumber + 1) };
        np.innerText = "Next Page";
        keys.appendChild(np);
    }
    if (Pages[pageNumber - 1]) {
        let np = document.createElement('button');
        np.onclick = () => { loadPage(pageNumber + 1) };
        np.innerText = "Next Page";

        let Bp = document.createElement('button');
        Bp.onclick = () => { loadPage(pageNumber - 1) };
        Bp.innerText = "Back";
        keys.appendChild(Bp);
        keys.appendChild(np);
    }

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

}