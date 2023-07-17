class Character extends MovableObject {

    height = 300;
    y = 155;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'          
    ];
    world;
    walking_sound = new Audio();
    
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }


    animate() {

      setInterval(() => {
        this.walking_sound.pause();
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
          this.x += this.speed;
          this.otherDirection = false;
          this.walking_sound.play();
        }

        if(this.world.keyboard.LEFT && this.x > 0) {
          this.x -= this.speed;
          this.otherDirection = true;
          this.walking_sound.play();

        }
        this.world.camera_x = -this.x + 100;
      }, 1000 / 60);

        setInterval(() => {

          if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            // Walk animation
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6; => 1, Rest 1
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++; // Inkrementierung von currentImage hinzugefügt
          }
        }, 50);
      }
      

    jump() {

    }
}