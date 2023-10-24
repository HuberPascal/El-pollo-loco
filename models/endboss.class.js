/**
 * Class representing an end boss chicken that extends MovableObject.
 */
class Endboss extends MovableObject {
    offset = {
        top: 70,
        bottom: 10,
        left: 55,
        right: 30,
    };

    height = 400;
    width = 250;
    y = 50;

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png", 
        "img/4_enemie_boss_chicken/4_hurt/G22.png", 
        "img/4_enemie_boss_chicken/4_hurt/G23.png"
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png", 
        "img/4_enemie_boss_chicken/5_dead/G25.png", 
        "img/4_enemie_boss_chicken/5_dead/G26.png"
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    endbossIsDead = false;
    isAlarmed = false;
    powerOfPushing = 50;

    /**
     * Constructor for the Endboss class.
     * Initializes end boss properties, loads images, and starts animation.
     */
    constructor() {
        super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);

        this.x = 3850; // endboss start position
        this.animate();
    }

    /**
     * Animates the end boss based on its state (dead, hurt, attacking, alarmed).
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playEndbossDeathAudio();
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.wasHit()) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.moveLeft();
            } else if (this.isAlarmed) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 150);
    }

    /**
     * Moves the end boss to the left if allowed.
     */
    moveLeft() {
        if (this.canMoveLeft()) {
            if (this.isAtStart()) {
                this.cannotMove();
            } else {
                super.endbossMoveLeft();
            }
        }
    }

    /**
     * Plays the end boss death audio and handles related actions.
     */
    playEndbossDeathAudio() {
        if (this.isEndbossAlive()) {
            this.handleEndbossDeathAudio();
        }
    }

    /**
     * Handles the end boss death audio, marks the end boss as dead, and triggers victory screen.
     */
    handleEndbossDeathAudio() {
        playAudio("gameWon");
        pauseAudio("endboss");
        this.endbossIsDead = true;
        characterWinScreen();
    }

    /**
     * Checks if the end boss can move to the left.
     * @returns {boolean} - True if the end boss can move to the left, false otherwise.
     */
    canMoveLeft() {
        return !this.world.character.isDead();
    }

    /**
     * Checks if the end boss is alive.
     * @returns {boolean} - True if the end boss is alive, false otherwise.
     */
    isEndbossAlive() {
        return !this.endbossIsDead;
    }
}
