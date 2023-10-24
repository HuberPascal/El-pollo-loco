/**
 * Class representing a small chicken enemy that extends MovableObject.
 */
class SmallChicken extends MovableObject {
    y = 370;
    height = 50;
    width = 70;

    /**
     * SmallChicken offset values for collision detection.
     */
    offset = {
        top: 2,
        bottom: 2,
        left: 2,
        right: 2,
    };

    /**
     * Array of walking images for the small chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    /**
     * Array of dead small chicken images.
     * @type {string[]}
     */
    IMAGES_DEAD_CHICKEN = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    ];

    /**
     * Constructor for the SmallChicken class.
     * Initializes small chicken properties, loads images, and starts animation.
     * @param {number} x - The initial x-coordinate of the small chicken.
     */
    constructor(x) {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_CHICKEN);

        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Animates the small chicken's movement to the left and checks if it is dead.
     */
    animate() {
        this.smallChickensMoveLeft();
        this.checkSmallChickenIsDead();
    }

    /**
     * Moves the small chicken to the left at a random speed.
     */
    smallChickensMoveLeft() {
        this.SmallChickenMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Moves the small chicken to the left at a random speed.
     */
    checkSmallChickenIsDead() {
        this.SmallChickenAnimation = setInterval(() => {
            this.playChicken();
        }, 100);
    }

    /**
     * Plays the small chicken animation based on its state (walking or dead).
     */
    playChicken() {
        if (this.isDead()) {
            this.speed = 0;
            this.playAnimation(this.IMAGES_DEAD_CHICKEN);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Stops the small chicken animation intervals.
     */
    stopSmallChickenInterval() {
        clearInterval(this.SmallChickenMoveLeft);
        clearInterval(this.SmallChickenAnimation);
    }
}
