/**
 * Class representing a character that extends MovableObject.
 */
class Character extends MovableObject {
    /**
     * Character offset values for collision detection.
     */
    offset = {
        top: 120,
        bottom: 0,
        left: 20,
        right: 20,
    };

    height = 300;
    y = 130;
    speed = 6;
    coins = 0;
    salsaBottles = 0;
    finishGame = false;
    timeStempOflastMovement = new Date().getTime();

    /**
     * Array of standing images for the character.
     * @type {string[]}
     */
    IMAGES_STANDING = [
        "img/2_character_pepe/1_idle/idle/I-1.png"
    ];

    /**
     * Array of walking images for the character.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];

    /**
     * Array of jumping images for the character.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];

    /**
     * Array of dead images for the character.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    /**
     * Array of hurt images for the character.
     * @type {string[]}
     */
    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png", 
        "img/2_character_pepe/4_hurt/H-42.png", 
        "img/2_character_pepe/4_hurt/H-43.png"
    ];

    /**
     * Array of sleep images for the character.
     * @type {string[]}
     */
    IMAGES_SLEEP = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /**
     * Constructor for the Character class.
     * Loads initial images, applies gravity, and starts animation.
     */
    constructor() {
        super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    /**
     * Animates the character based on keyboard input and game state.
     */
    animate() {
        this.characterKeyboardInterval = setInterval(() => {
            this.moveRight();
            this.moveLeft();
            this.characterJump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        this.startCharacterInterval();
    }

    /**
     * Initiates the interval for character animation.
     * Handles different character animations based on game state.
     */
    startCharacterInterval() {
        this.characterInterval = setInterval(() => {
            if (this.isDead()) {
                this.checkGameIsFinish();
                characterIsDeadScreen();
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.isCharacterWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.isAsleep()) {
                playAudio("snoreSound");
                this.playAnimation(this.IMAGES_SLEEP);
            } else {
                this.playAnimation(this.IMAGES_STANDING);
                this.handleAudio();
            }
        }, 70);
    }

    /**
     * Moves the character to the right if allowed.
     */
    moveRight() {
        if (this.canMoveRight()) {
            if (!this.isDead()) {
                this.characterMoveRight();
                this.otherDirection = false;
            } else {
                pauseAudio("walkingSound");
            }
        }
    }

    /**
     * Moves the character to the left if allowed.
     */
    moveLeft() {
        if (this.canMoveLeft()) {
            if (!this.isDead()) {
                this.characterMoveLeft();
                this.otherDirection = true;
            } else {
                pauseAudio("walkingSound");
            }
        }
    }

    /**
     * Initiates a jump action if allowed.
     */
    characterJump() {
        if (this.canJump()) {
            if (!this.isDead()) {
                this.jump();
                playAudio("jumpSound");
            }
        }
    }

    /**
     * Handles audio playback, pausing walking and snore sounds.
     */
    handleAudio() {
        pauseAudio("walkingSound");
        pauseAudio("snoreSound");
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} - True if allowed, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} - True if allowed, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the character can perform a jump.
     * @returns {boolean} - True if allowed, false otherwise.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Checks if the character is currently walking.
     * @returns {boolean} - True if the character is moving to the right or left, otherwise false.
     */
    isCharacterWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Stops the character animation intervals and resets to standing.
     */
    stopCharacterInterval() {
        clearInterval(this.characterKeyboardInterval);
        clearInterval(this.characterInterval);
        pauseAudio("walkingSound");
        this.playAnimation(this.IMAGES_STANDING);
    }

    /**
     * Checks if the game is finished and triggers necessary actions.
     */
    checkGameIsFinish() {
        if (!this.finishGame) {
            pauseAudio("endboss");
            playAudio("gameLost");
            this.finishGame = true;
        }
    }

    /**
     * Initiates a jump action.
     */
    jump() {
        this.speedY = 30;
        this.lastAction = new Date().getTime();
    }
}
