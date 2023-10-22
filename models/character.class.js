class Character extends MovableObject {
  offset = {
    top: 120,
    bottom: 0,  
    left: 20,
    right: 20
  };

    height = 300;
    // y = 155;
    y = 130;
    speed = 6;
    coins = 0;
    salsaBottles = 0;
    timeStempOflastMovement = new Date().getTime();


    IMAGES_STANDING = [
      'img/2_character_pepe/1_idle/idle/I-1.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'          
    ];

    IMAGES_JUMPING = [
      'img/2_character_pepe/3_jump/J-31.png',
      'img/2_character_pepe/3_jump/J-32.png',
      'img/2_character_pepe/3_jump/J-33.png',
      'img/2_character_pepe/3_jump/J-34.png',
      'img/2_character_pepe/3_jump/J-35.png',
      'img/2_character_pepe/3_jump/J-36.png',
      'img/2_character_pepe/3_jump/J-37.png',
      'img/2_character_pepe/3_jump/J-38.png',
      'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
      'img/2_character_pepe/5_dead/D-51.png',
      'img/2_character_pepe/5_dead/D-52.png',
      'img/2_character_pepe/5_dead/D-53.png',
      'img/2_character_pepe/5_dead/D-54.png',
      'img/2_character_pepe/5_dead/D-55.png',
      'img/2_character_pepe/5_dead/D-56.png',
      'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
      'img/2_character_pepe/4_hurt/H-41.png',
      'img/2_character_pepe/4_hurt/H-42.png',
      'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_SLEEP = [
      'img/2_character_pepe/1_idle/long_idle/I-11.png',
      'img/2_character_pepe/1_idle/long_idle/I-12.png',
      'img/2_character_pepe/1_idle/long_idle/I-13.png',
      'img/2_character_pepe/1_idle/long_idle/I-14.png',
      'img/2_character_pepe/1_idle/long_idle/I-15.png',
      'img/2_character_pepe/1_idle/long_idle/I-16.png',
      'img/2_character_pepe/1_idle/long_idle/I-17.png',
      'img/2_character_pepe/1_idle/long_idle/I-18.png',
      'img/2_character_pepe/1_idle/long_idle/I-19.png',
      'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];


    world;
    finishGame = false;
    // hurtSoundPlayed = false;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }


    animate() {
      this.characterKeyboardInterval = setInterval(() => {
        // this.walking_sound.pause();
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
          if (!this.isDead()) {
            this.characterMoveRight();
            this.otherDirection = false;
          } else {
            pauseAudio('walkingSound');
          }
        }

        if(this.world.keyboard.LEFT && this.x > 0) {
          if (!this.isDead()) {
            this.characterMoveLeft();
            this.otherDirection = true;
          } else {
            pauseAudio('walkingSound');
          }
        }

        // if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
        //   // this.walking_sound.pause();
        // }

        if(this.world.keyboard.SPACE && !this.isAboveGround()) {
          if (!this.isDead()) {
            playAudio('jumpSound');
            this.jump();
          } else {
            pauseAudio('jumpSound');
          }

        }

        this.world.camera_x = -this.x + 100;
      }, 1000 / 60);

      this.characterInterval = setInterval(() => {
        if(this.isDead()) {
            // pauseAudio('endboss')
            // playAudio('gameLost');
            this.checkGameIsFinish();
            characterIsDeadScreen();
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if(this.isAsleep()) {
            playAudio('snoreSound');
            this.playAnimation(this.IMAGES_SLEEP);
        } else {
          this.playAnimation(this.IMAGES_STANDING);
          pauseAudio('walkingSound');
          pauseAudio('snoreSound');

        };
      }, 70);
    }


    stopCharacterInterval() {
      clearInterval(this.characterKeyboardInterval);
      clearInterval(this.characterInterval);
      pauseAudio('walkingSound');
      this.loadImages(this.IMAGES_STANDING);
  }



    checkGameIsFinish() {
      if (!this.finishGame) {
        pauseAudio('endboss');
        playAudio('gameLost');
        this.finishGame = true;
      }

    }
 

    ////////////// evt. löschen
      // isInLongSleep() {
      //   let secondsPassed = (new Date().getTime() - this.timeStempOflastMovement) / 1000;
      //   return secondsPassed > 5;
      // }

    jump() {
      this.speedY = 30;
      this.lastAction = new Date().getTime();
    }
}


