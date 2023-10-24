/**
 * Class representing a coin that extends MovableObject.
 */
class Coin extends MovableObject {
    y = 310;
    x = 200;

    /**
     * Coin offset values for collision detection.
     */
    offset = {
        top: 20,
        bottom: 30,
        left: 40,
        right: 40,
    };

    /**
     * Array of coin images.
     * @type {string[]}
     */
    IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

    /**
     * Constructor for the Coin class.
     * Initializes coin properties, loads images, and starts animation.
     * @param {number} x - The initial x-coordinate of the coin.
     * @param {number} y - The initial y-coordinate of the coin.
     */
    constructor(x, y) {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
        this.width = 100;
        this.height = 100;
    }

    /**
     * Animates the coin's appearance with a cycling animation.
     */
    animate() {
        this.coinAnimation();
    }

    /**
     * Plays the coin animation in a loop.
     */
    coinAnimation() {
        this.coinAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
    }

    /**
     * Stops the coin animation interval.
     */
    stopCoinInterval() {
        clearInterval(this.coinAnimation);
    }
}
