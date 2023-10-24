/**
 * Class representing a chicken enemy that extends MovableObject.
 */
class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 80;

    /**
     * Chicken offset values for collision detection.
     */
    offset = {
        top: 5,
        bottom: 5,
        left: 12,
        right: 12,
    };

    /**
     * Array of walking images for the chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    /**
     * Array of dead chicken images.
     * @type {string[]}
     */
    IMAGES_DEAD_CHICKEN = [
        "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
    ];

    /**
     * Constructor for the Chicken class.
     * Initializes chicken properties, loads images, and starts animation.
     * @param {number} x - The initial x-coordinate of the chicken.
     */
    constructor(x) {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_CHICKEN);

        this.x = x + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Animates the chicken's movement to the left and checks if it is dead.
     */
    animate() {
        this.chickensMoveLeft();
        this.checkChickenIsDead();
    }

    /**
     * Moves the chicken to the left at a random speed.
     */
    chickensMoveLeft() {
        this.chickenMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Checks if the chicken is dead and plays the corresponding animation.
     */
    checkChickenIsDead() {
        this.chickenAnimation = setInterval(() => {
            this.playChicken();
        }, 100);
    }

    /**
     * Plays the chicken animation based on its state (walking or dead).
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
     * Stops the chicken animation intervals.
     */
    stopChickenInterval() {
        clearInterval(this.chickenMoveLeft);
        clearInterval(this.chickenAnimation);
    }
}
