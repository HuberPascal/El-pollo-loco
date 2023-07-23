class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coins = 0;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof TrowableObject) { // TrowableObject should always fall
            return true;
        } else {
        return this.y < 120;
        }
    }

    // isColliding(Chicken);
    isColliding(object) {
        return  this.x + this.width - this.offset.right > object.x &&
                this.y + this.height - this.offset.bottom > object.y + object.offset.top &&
                this.x + this.offset.left < object.x + object.width - object.offset.right &&
                this.y + this.offset.top < object.y + object.height - object.offset.bottom
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    collectCoin() {
        // collect_coin.play();
        this.coins += 10;
        if(this.coins > 100) {
            this.coins = 100;
        }
    }
 
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // Differenz in s
        return timepassed < 1;
    }


    isDead(){
        return this.energy == 0;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; // Inkrementierung von currentImage hinzugefügt
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
            this.x -= this.speed;
    }
    

    jump() {
        this.speedY = 30;
    }

}
