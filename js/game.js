let canvas;
let world;
let keyboard;
let isMuted = false;
let intervalsIds = [];
let i = 1;
world;


function init() {
    keyboard = new Keyboard();
    startGame();
    changeStyle();
    rotateMessage();
}


function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function changeStyle() {
    document.getElementById('startscreen').classList.add('dNone');
    document.getElementById('playBtn').classList.add('dNone');
    document.getElementById('soundOnOff').classList.remove('dNone');
    document.getElementById('playBtnMobile').classList.remove('dNone');
}

function characterIsDeadScreen() {
    document.getElementById('gameOverScreen').classList.remove('dNone');
    document.getElementById('backToStart').classList.remove('dNone');
    // this.finishGame = true;
}

function characterWinScreen() {
    document.getElementById('gameOverScreen').classList.remove('dNone');
    document.getElementById('backToStart').classList.remove('dNone');
    stopCharacterAnimation();
    // loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
}

function stopCharacterAnimation() {
    world.character.stopCharacterInterval();
    // world.cloud.stopCloudsInterval();
  }


function backToStart() {
    location.reload();
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

function infoAboutPlay() {
    document.getElementById('infoAboutPlayContainer').classList.remove('dNone');
    // document.getElementById('cross').
}

function closeInfoContainer() {
    document.getElementById('infoAboutPlayContainer').classList.add('dNone');
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



function rotateMessage() {
    window.addEventListener("orientationchange", function() {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById("rotateMessageContainer").style.display = "block";
        } else {
            document.getElementById("rotateMessageContainer").style.display = "none";
        }
    });
}
