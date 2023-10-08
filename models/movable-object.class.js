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
    lastAction;
    ground = 130;


    



    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this instanceof Character && this.y - this.speedY > this.ground) {
                    this.speedY = (this.ground - this.y) * -1;
                }
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof TrowableObject) { // TrowableObject should always fall
            return true;
        } else {
        return this.y < this.ground;
        }
    }

    // isColliding(z.B Chicken);
    isColliding(obj) {
        return  this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
                this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
                this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
                this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    }

    // isCollidingTop(object) {
    //     return 
    // }

    hit() {
        playAudio('hurtSound');
        this.energy -= 20;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.lastAction = new Date().getTime();
        }
    }



    collectCoin() {
        playAudio('coinSound');
        this.coins += 10;
        if(this.coins > 100) {
            this.coins = 100;
        }
    }


    collectSalsaBottle() {
        playAudio('bottleCollected');
        this.world.salsaBottles += 20;
        this.world.salsaBottleCounter++;
        console.log('bottles gleich', this.world.salsaBottleCounter);
        if(this.salsaBottles > 100) {
            this.salsaBottles = 100;
        }
    }

    // kontrolliert ob der Character verletzt wurde in der letzen 1s
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in s
        return timepassed < 3;
    }

    wasHit() {
        return this.energy < 100;
      }


    isDead(){
        return this.energy == 0;
    }

    // isGround() {
    //     return this.y = 150;
    // }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; // Inkrementierung von currentImage hinzugefügt
    }

    characterMoveRight() {
        this.x += this.speed;
        this.lastAction = new Date().getTime();
        playAudio('walkingSound');
    }

    characterMoveLeft() {
        this.x -= this.speed;
        this.lastAction = new Date().getTime();
        playAudio('walkingSound');
    }

    moveRight() {
        this.x += this.speed;
        this.lastAction = new Date().getTime();
        // this.walking_sound.play()
    }


    moveLeft() {
        this.x -= this.speed;
        this.lastAction = new Date().getTime();
    }

    endbossMoveLeft() {
        this.x -= this.endbossSpeed;
    }
    

    moveLeftClouds() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
    

    isAtStart() {
        return this.x <= 0;
    }

    jump() {
        this.speedY = 20;
    }

    cannotMove() {
        return (this.speedX = 0);
      }
 
 
      isAsleep() {
        let timePassed = new Date().getTime() - this.lastAction;
        timePassed = timePassed / 1000;
        return timePassed > 5;
    }
    
    

}



