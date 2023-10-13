let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = false;
function init() {
    startGame();
    changeStyle();
}

window.addEventListener('keydown', (e) => {

    if(e.keyCode == 39) {
        keyboard.RIGHT =  true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT =  false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
})

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function changeStyle() {
    document.getElementById('startscreen').classList.add('dNone');
    document.getElementById('playBtn').classList.add('dNone');
    document.getElementById('soundOnOff').classList.remove('dNone');
}

function characterIsDeadScreen() {
    document.getElementById('gameOverScreen').classList.remove('dNone');
    // this.finishGame = true;
}

function soundOnOff() {
    let soundOnOffImage = document.getElementById('soundOnOff');
    let soundOnOffImageSrc = soundOnOffImage.src;

    if (soundOnOffImageSrc.indexOf('img/sound-on.png') !== -1) {
        soundOnOffImage.src = 'img/sound-off.png';
    } else {
        soundOnOffImage.src = 'img/sound-on.png';
    }

    toggleMusic();
}

// function toggleMusic() {
//     const backgroundAudio = audios.find(a => a.audioName === "backgroundSound");

//     if (backgroundAudio) {
//         if (backgroundAudio.isPlaying) {
//             pauseAudio('backgroundSound');
//         } else {
//             playAudio('backgroundSound');
//         }

//         // Den Status aktualisieren
//         backgroundAudio.isPlaying = !backgroundAudio.isPlaying;
//     }
// }


function likeBtn(index) {
    let likeBtnElement = document.getElementById(`likeBtn${index}`);
    let likeBtnSrc = likeBtnElement.src;
    
    if (likeBtnSrc.indexOf('img/herz(3).png') !== -1) {
        likeBtnElement.src = 'img/herz(4).png';
        heartStates[index] = true; // Zustand auf "geliked" setzen
    } else {
        likeBtnElement.src = 'img/herz(3).png';
        heartStates[index] = false; // Zustand auf "nicht geliked" setzen
    }
    save();
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}