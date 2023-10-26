/**
 * Class representing a movable object in the game.
 */
class MovableObject extends DrawableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    speed = 0.15;
    endbossSpeed = 20;
    otherDirection = false;
    speedY = 0;
    acceleration = 3.0;
    energy = 100;
    coins = 0;
    lastHit = 0;
    ground = 130;
    lastAction = new Date().getTime();

    /**
     * Applies gravity to the movable object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.shouldApplyGravity()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                if (this.isCharacterAboveGround()) {
                    this.speedY = (this.ground - this.y) * -1;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether gravity should be applied.
     * @returns {boolean} - True if gravity should be applied, false otherwise.
     */
    shouldApplyGravity() {
        return this.isAboveGround() || this.speedY > 0;
    }

    /**
     * Checks if the character is above the ground.
     * @returns {boolean} - True if the character is above the ground, false otherwise.
     */
    isCharacterAboveGround() {
        return this instanceof Character && this.y - this.speedY > this.ground;
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof TrowableObject) {
            // TrowableObject should always fall
            return true;
        } else {
            return this.y < this.ground;
        }
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {Object} obj - The object to check for collision.
     * @returns {boolean} - True if there is a collision, false otherwise.
     */
    isColliding(obj) {
        // isColliding(z.B Chicken);
        return (
            this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
        );
    }

    /**
     * Handles the hit event.
     */
    hit() {
        playAudio("hurtSound");
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.lastAction = new Date().getTime();
        }
    }

    /**
     * Collects a coin and plays the corresponding sound.
     */
    collectCoin() {
        playAudio("coinSound");
        this.coins += 10;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    /**
     * Collects a salsa bottle and plays the corresponding sound.
     */
    collectSalsaBottle() {
        playAudio("bottleCollected");
        this.world.salsaBottles += 20;
        this.world.salsaBottleCounter++;
        if (this.salsaBottles > 100) {
            this.salsaBottles = 100;
        }
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} - True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 2;
    }

    /**
     * Checks if the object was hit.
     * @returns {boolean} - True if the object was hit, false otherwise.
     */
    wasHit() {
        return this.energy < 100;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays the animation with the given images.
     * @param {Array} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
 * Moves the character to the right.
 */
characterMoveRight() {
    this.x += this.speed;
    this.lastAction = new Date().getTime();
    this.handleWalkingAudio();
}

/**
 * Moves the character to the left.
 */
characterMoveLeft() {
    this.x -= this.speed;
    this.lastAction = new Date().getTime();
    this.handleWalkingAudio();
}

/**
 * Handles the audio for character movement.
 * Pauses the walking sound if the character is above ground or hurt; otherwise, plays the walking sound.
 */
handleWalkingAudio() {
    if (this.isAboveGround() || this.isMovingAndHurt()) {
        pauseAudio("walkingSound");
    } else {
        playAudio("walkingSound");
    }
}

/**
 * Checks if the character is either moving right or left and is currently hurt.
 * @returns {boolean} True if the character is moving right or left and is hurt; otherwise, false.
 */
isMovingAndHurt() {
    return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.isHurt();
}


    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.lastAction = new Date().getTime();
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
        this.lastAction = new Date().getTime();
    }

    /**
     * Moves the endboss to the left.
     */
    endbossMoveLeft() {
        this.x -= this.endbossSpeed;
    }

    /**
     * Checks if the object is at the starting position.
     * @returns {boolean} - True if the object is at the starting position, false otherwise.
     */
    isAtStart() {
        return this.x <= 0;
    }

    /**
     * Stops the object from moving.
     */
    cannotMove() {
        return (this.speedX = 0);
    }

    /**
     * Checks if the object is asleep.
     * @returns {boolean} - True if the object is asleep, false otherwise.
     */
    isAsleep() {
        let timePassed = new Date().getTime() - this.lastAction;
        timePassed = timePassed / 1000;
        return timePassed > 5;
    }
}
