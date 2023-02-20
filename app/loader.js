var socket = io();
var pages = [];
var keys = document.getElementById('keys');

_sounds.forEach(page => { pages.push(page) })
loadPage(0)

const allKeypress = document.getElementsByClassName('keypress');
for (let i = 0; i < allKeypress.length; i++) {
    allKeypress[i].onclick = (ev) => {
        console.log('key press')
        socket.emit('kp', allKeypress[i].getAttribute('data-key'))
    }
}

socket.on('indaclub', function () {
    document.getElementById('loading').style.display = "none"
})

function loadPage(pageNumber) {
    const myNode = document.getElementById("keys");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    pages[pageNumber].forEach(sound => {
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
        if(sound.icon) {
            btn.style.backgroundImage = "url('icons/"+sound.icon+"')"
        }
        btn.innerText = sound.name;
        keys.appendChild(btn)
    })
    if (pages[pageNumber + 1]) {
        if (pageNumber == 0) {
            let np = document.createElement('button');
            np.onclick = () => { loadPage(pageNumber + 1) };
            np.innerText = "Next Page";
            keys.appendChild(np);
        }
    }
    if (pages[pageNumber - 1]) {
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
    susdeck.className="button"
    susdeck.style.backgroundImage="url('icons/susdeck.png')"
    keys.appendChild(reloadbtn);
    keys.appendChild(sbtn);
    keys.appendChild(susdeck);
    
}

(function(){
    var oldLog = console.log;
    console.log = function (message) {
        document.getElementById('console').innerText+=message+"\n"
        oldLog.apply(console, arguments);
    };
})();