/**
 * Class representing a SalsaBottle in the game.
 * @extends MovableObject
 */
class SalsaBottle extends MovableObject {
    y = 350;
    x = 200;

    /**
     * The offset values for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 20,
        bottom: 30,
        left: 40,
        right: 0,
    };

    /**
     * Array of image paths for the salsa bottle.
     * @type {string[]}
     */
    IMAGES_SALSA_BOTTLE = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

    /**
     * Creates an instance of SalsaBottle.
     * @param {number} x - The initial x-coordinate of the salsa bottle.
     */
    constructor(x) {
        super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
        this.loadImages(this.IMAGES_SALSA_BOTTLE);
        this.y = 350;
        this.x = x + Math.random() * 500;
        this.width = 80;
        this.height = 80;
    }
}
