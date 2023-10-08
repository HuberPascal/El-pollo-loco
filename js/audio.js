const background_sound = new Audio('');
const walking_sound = new Audio('audio/walking.mp3');
const death_sound = new Audio('audio/gameLost.mp3');
const hurt_sound = new Audio('audio/characterHurt.mp3');
const jump_sound = new Audio('audio/characterJump.mp3');
const chicken_sound = new Audio('audio/chickenHit.mp3');
const coin_sound = new Audio('audio/coinCollected.mp3');
const snore_sound = new Audio('audio/characterSnore.mp3');


let audios = [
    {
        audioName: "backgroundSound",
        src: "",
        loop: true,
        volume: 0.4,
        audioElement: null  // Neues Feld für das Audio-Element hinzufügen
    },
    {
        audioName: "walkingSound",
        src: "audio/walking.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "deathSound",
        src: "audio/gameLost.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "hurtSound",
        src: "audio/characterHurt.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "jumpSound",
        src: "audio/characterJump.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "snoreSound",
        src: "audio/characterSnore.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "coinSound",
        src: "audio/coinCollected.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "bottleSmashed",
        src: "audio/bottleSmashed.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "bottleCollected",
        src: "audio/bottleCollected.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "endboss",
        src: "audio/endboss.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    },
    {
        audioName: "chickenHit",
        src: "audio/chickenHit.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null
    }

];

function playAudio(audioName) {
    const audio = audios.find(a => a.audioName === audioName);

    if (audio) {
        if (audio.audioElement && !audio.audioElement.paused) {
            // audio.audioElement.pause();
            
        
        } else {
            // Das Audio wird nicht abgespielt, starte die Wiedergabe
            audio.audioElement = new Audio(audio.src);
            audio.audioElement.loop = audio.loop;
            audio.audioElement.volume = audio.volume;
            audio.audioElement.play();
        }
    }
}


function pauseAudio(audioName) {
    const audio = audios.find(a => a.audioName === audioName);

    if (audio && audio.audioElement) {
        audio.audioElement.pause();
    }
}
