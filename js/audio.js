// const background_sound = new Audio('');
// const walking_sound = new Audio('audio/walking.mp3');
// const death_sound = new Audio('audio/gameLost.mp3');
// const hurt_sound = new Audio('audio/characterHurt.mp3');
// const jump_sound = new Audio('audio/characterJump.mp3');
// const chicken_sound = new Audio('audio/chickenHit.mp3');
// const coin_sound = new Audio('audio/coinCollected.mp3');
// const snore_sound = new Audio('audio/characterSnore.mp3');


let audios = [
    {
        audioName: "backgroundSound",
        src: "audio/background.mp3",
        loop: true,
        volume: 0.4,
        audioElement: null,  // Neues Feld für das Audio-Element hinzufügen
        isPlaying: false
    },
    {
        audioName: "walkingSound",
        src: "audio/walking.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "deathSound",
        src: "audio/gameLost.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "hurtSound",
        src: "audio/characterHurt.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "jumpSound",
        src: "audio/characterJump.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "snoreSound",
        src: "audio/characterSnore.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "coinSound",
        src: "audio/coinCollected.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "bottleSmashed",
        src: "audio/bottleSmashed.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "bottleCollected",
        src: "audio/bottleCollected.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "endboss",
        src: "audio/endboss.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "chickenHit",
        src: "audio/chickenHit.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "gameLost",
        src: "audio/gameLost.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    },
    {
        audioName: "gameWon",
        src: "audio/gameWon.mp3",
        loop: false,
        volume: 0.4,
        audioElement: null,
        isPlaying: false
    }

];


function playAudio(audioName) {
    const audio = audios.find(a => a.audioName === audioName);

    if (audio && !audio.isPlaying) {
        if (!audio.audioElement || audio.audioElement.paused) {
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


function toggleMusic() {
    const backgroundAudio = audios.find(a => a.audioName === "backgroundSound");

    if (backgroundAudio) {
        if (!backgroundAudio.isPlaying) {
            setIsPlayingToTrue();
            allAudiosPaused();
        } else {
            setIsPlayingToFalse();
            allAudiosPlay();
        }
    }
}

function setIsPlayingToFalse() {
    audios.forEach(audio => {
        audio.isPlaying = false;
    });
}

function setIsPlayingToTrue() {
    audios.forEach(audio => {
        audio.isPlaying = true;
    });
}

function allAudiosPaused() {
    audios.forEach(audio => {
        pauseAudio(audio.audioName);
    });
}

function allAudiosPlay() {
    audios.forEach(audio => {
        playAudio('backgroundSound');
    });
}



