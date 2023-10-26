let canvas;
let world;
let keyboard;
let isMuted = false;
let intervalsIds = [];
let i = 1;

/**
 * Preloads images asynchronously.
 * @param {Array} images - An array of BackgroundObject instances.
 * @param {Function} [callback] - An optional callback function to be executed when all images are loaded.
 */
function preloadImages(images, callback) {
    let loadedImages = 0;
    const numImages = images.length;

    images.forEach((bgObj) => {
        const img = new Image();
        img.onload = function () {
            loadedImages++;
            if (loadedImages === numImages && callback) {
                callback();
            }
        };
        img.src = bgObj.imagePath;
    });
}

/**
 * An array of background objects to preload.
 * @type {Array<BackgroundObject>}
 */
const backgroundObjects = [
    new BackgroundObject("img/5_background/layers/air.png"),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png"),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png"),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png"),

    new BackgroundObject("img/5_background/layers/air.png"),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png"),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png"),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png"),
];
/**
 * An array of statusBarBottle object to preload.
 * @type {Array<BackgroundObject>}
 */
const statusBarBottle = [
    new StatusBarBottle("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png")
]
/**
 * An array of StatusBarCoin object to preload.
 * @type {Array<BackgroundObject>}
 */
const statusBarCoin = [
    new StatusBarCoin("img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png")
]
/**
 * An array of statusBarHealth object to preload.
 * @type {Array<BackgroundObject>}
 */
const statusBarHealth = [
    new StatusBarHealth("img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png")
]

/**
 * Preload the background images.
 */
preloadImages(backgroundObjects);
preloadImages(statusBarHealth);
preloadImages(statusBarCoin);
preloadImages(statusBarBottle);

/**
 * Initializes the game.
 */
function init() {
    initLevel();
    keyboard = new Keyboard();
    startGame();
    changeStyle();
    rotateMessage();
}

/**
 * Starts the game by initializing the canvas and world.
 */
function startGame() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

/**
 * Changes the style by manipulating the visibility of HTML elements.
 */
function changeStyle() {
    document.getElementById("startscreen").classList.add("dNone");
    document.getElementById("playBtn").classList.add("dNone");
    document.getElementById("soundOnOff").classList.remove("dNone");
    document.getElementById("playBtnMobile").classList.remove("dNone");
}

/**
 * Displays the game over screen when the character is dead.
 */
function characterIsDeadScreen() {
    document.getElementById("gameOverScreen").classList.remove("dNone");
    document.getElementById("backToStart").classList.remove("dNone");
    pauseAudio("backgroundSound");
    stopIsDeadIntervals();
}

/**
 * Displays the win screen when the character wins.
 */
function characterWinScreen() {
    document.getElementById("gameOverScreen").classList.remove("dNone");
    document.getElementById("backToStart").classList.remove("dNone");
    stopWinIntervals();
}

/**
 * Stops intervals related to character death.
 */
function stopIsDeadIntervals() {
    stopAllChickenIntervals();
    stopAllCloudIntervals();
    stopAllCoinIntervals();
}

/**
 * Stops intervals related to winning the game.
 */
function stopWinIntervals() {
    stopAllChickenIntervals();
    stopAllCloudIntervals();
    stopAllCoinIntervals();
    stopCharacterAnimation();
}

/**
 * Stops the character animation interval.
 */
function stopCharacterAnimation() {
    world.character.stopCharacterInterval();
}

/**
 * Stops all intervals related to chicken enemies.
 */
function stopAllChickenIntervals() {
    level1.enemies.filter((enemie) => enemie instanceof Chicken).forEach((chicken) => chicken.stopChickenInterval());

    level1.enemies.forEach((enemie) => {
        if (enemie instanceof SmallChicken) {
            enemie.stopSmallChickenInterval();
        }
    });
}

/**
 * Stops all intervals related to cloud objects.
 */
function stopAllCloudIntervals() {
    level1.clouds.forEach((cloud) => cloud.stopCloudInterval());
}

/**
 * Stops all intervals related to coin objects.
 */
function stopAllCoinIntervals() {
    level1.coins.forEach((coin) => coin.stopCoinInterval());
}

/**
 * Reloads the page to go back to the start.
 */
function backToStart() {
    location.reload();
}

/**
 * Toggles the sound on/off and updates the corresponding image.
 */
function soundOnOff() {
    let soundOnOffImage = document.getElementById("soundOnOff");
    let soundOnOffImageSrc = soundOnOffImage.src;

    if (soundOnOffImageSrc.indexOf("img/icons/sound-on.png") !== -1) {
        soundOnOffImage.src = "img/icons/sound-off.png";
    } else {
        soundOnOffImage.src = "img/icons/sound-on.png";
    }

    toggleMusic();
}

/**
 * Displays information about playing the game.
 */
function infoAboutPlay() {
    document.getElementById("infoAboutPlayContainer").classList.remove("dNone");
}

/**
 * Closes the information container.
 */
function closeInfoContainer() {
    document.getElementById("infoAboutPlayContainer").classList.add("dNone");
}

/**
 * Activates fullscreen mode.
 */
function fullscreen() {
    let fullscreen = document.getElementById("fullscreen");
    enterFullscreen(fullscreen);
}

/**
 * Enters fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to enter fullscreen.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Rotates the message container based on orientation change.
 */
function rotateMessage() {
    window.addEventListener("orientationchange", function () {
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById("rotateMessageContainer").style.display = "block";
        } else {
            document.getElementById("rotateMessageContainer").style.display = "none";
        }
    });
}
