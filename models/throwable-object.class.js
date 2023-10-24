/**
 * Represents a throwable salsa bottle object that can be thrown in the game.
 * @extends {MovableObject}
 */
class TrowableObject extends MovableObject {
    /**
     * Array of image paths representing the salsa bottle rotation animation.
     * @type {string[]}
     */
    IMAGES_SALSA_BOTTLE_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    /**
     * Array of image paths representing the salsa bottle splash animation.
     * @type {string[]}
     */
    IMAGES_SALSA_BOTTLE_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    isSmashed = false;

    /**
     * Constructs a TrowableObject.
     * @param {number} x - The x-coordinate of the salsa bottle's initial position.
     * @param {number} y - The y-coordinate of the salsa bottle's initial position.
     */
    constructor(x, y) {
        super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.loadImages(this.IMAGES_SALSA_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_SALSA_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.animate();
        this.salsaBottleRotationOrSplash();
        this.throw();
    }

    /**
     * Animates the salsa bottle by playing the rotation or splash animation based on its state.
     */
    animate() {
        setInterval(() => {
            if (this.isSmashed) {
                this.playAnimation(this.IMAGES_SALSA_BOTTLE_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_SALSA_BOTTLE_ROTATION);
            }
        }, 100);
    }

    /**
     * Checks if the salsa bottle has hit the ground.
     * @returns {boolean} - True if the salsa bottle has hit the ground, otherwise false.
     */
    hitGround() {
        return this.y > 270;
    }

    /**
     * Monitors the salsa bottle's position to determine whether it is smashed upon hitting the ground.
     */
    salsaBottleRotationOrSplash() {
        setInterval(() => {
            if (this.hitGround()) {
                this.isSmashed = true;
            }
        }, 25);
    }

    /**
     * Throws the salsa bottle by setting its initial speed and applying gravity.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}
