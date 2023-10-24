/**
 * Class representing a cloud that extends MovableObject.
 */
class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;
    speed = 0.15;

    /**
     * Constructor for the Cloud class.
     * Initializes cloud properties, loads image, and starts animation.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(x) {
        super().loadImage("img/5_background/layers/4_clouds/1.png");

        this.x = x;
        this.animate();
    }

    /**
     * Animates the cloud's movement to the left.
     */
    animate() {
        this.cloudsMoveToLeft();
    }

    /**
     * Moves the cloud to the left at a constant speed.
     */
    cloudsMoveToLeft() {
        this.cloudsMoveLeft = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     * Stops the cloud movement interval.
     */
    stopCloudInterval() {
        clearInterval(this.cloudsMoveLeft);
    }
}
