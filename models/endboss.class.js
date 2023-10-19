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
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    endbossIsDead = false;
    isAlarmed = false;
    // finishGame = false;
    powerOfPushing = 50;

     constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        // super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        
        // this.x = 3850; // endboss start position
        this.x = 1850; // endboss start position provisorisch
        this.animate();
    }


    animate() {
          setInterval(() => {
            // console.log('energy ist', this.energy);
            if (this.isDead()) {
                if (!this.endbossIsDead) {
                playAudio('gameWon');
                pauseAudio('endboss');
                this.endbossIsDead = true;
                }
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.wasHit()) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.moveLeft();
            } else if (this.isAlarmed) {
                this.playAnimation(this.IMAGES_ALERT);
            }
          }, 150)
    }


    moveLeft() {
        if (!this.world.character.isDead()) {
            if (this.isAtStart()) {
                this.cannotMove();
            } else {
                super.endbossMoveLeft();
            }
        }
    }
    
    
}

