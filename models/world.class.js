class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    coin = new Coin();
    salsaBottle = new SalsaBottle();
    throwableObjects = [];
    salsaBottles = 0;
    salsaBottleCounter = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runIntervals();
        // this.checkCharacterCollidesEnemy();
        // this.checkCollisions();
        // this.checkBottleIsSmashed();
        // playAudio('background');
    }

    setWorld() {
        this.character.world = this;
    }

    runIntervals() {
        setInterval(() => {
            this.checkCharacterCollidesEnemy();
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100);
    }



    checkThrowObjects() {
        if(this.keyboard.D && this.salsaBottleCounter > 0) {
            this.salsaBottleCounter--;
            this.salsaBottles -= 20;
            this.statusBarBottles.setPercentage(this.salsaBottles);
            let bottle = new TrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCharacterCollidesEnemy() {
        this.level.enemies.forEach((enemy) => {
            if(this.characterJumpsOnTop(enemy)) {
                this.enemieGetsKilled(enemy);
            }
            if(this.enemieCanHurtCharacter(enemy)) {
                this.characterGetsHurt();
            }
        });
    }

    characterJumpsOnTop(enemy) {
        return (
            !this.character.isHurt() &&
            this.character.isColliding(enemy) &&
            this.character.isAboveGround() &&
            this.character.speedY < 0
        );
    }

    enemieGetsKilled(enemy) {
        let indexEnemy = this.level.enemies.indexOf(enemy);
        let hittedEnemy = (this.level.enemies[indexEnemy].energy = 0);
        setTimeout(() => {
            this.level.enemies.splice(indexEnemy, 1);
        }, 100);
        this.character.jump();
        // playAudio('chickenHit');
    }


    enemieCanHurtCharacter(enemy) {
        return (
            this.character.isColliding(enemy) &&
            !this.character.isHurt() &&
            !this.character.isAboveGround()
        );
    }

    characterGetsHurt() {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        // playAudio('characterHurt');
    }


    checkCollisions() {  
            // this.enemyCollision();
            this.coinCollision();
            this.salsaBottleCollision();
    }

    // enemyCollision() {
    //     this.level.enemies.forEach((enemy) => {
    //         if(this.character.isColliding(enemy)) {
    //             // this.character.hit();
    //             // this.statusBarHealth.setPercentage(this.character.energy);
    //         }
    //     });
    // }

    coinCollision() { 
        this.level.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.statusBarCoin.setPercentage(this.character.coins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    salsaBottleCollision() {
        if(this.salsaBottles < 100) {
            this.level.salsaBottles.forEach((salsaBottle, index) => {
                if(this.character.isColliding(salsaBottle)) {
                    this.character.collectSalsaBottle();
                    this.statusBarBottles.setPercentage(this.salsaBottles);
                    this.level.salsaBottles.splice(index, 1);
                }
            });
        }
    }
 

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.BackgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ------
       
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0);
        
        this.addToMap(this.character); 
        this.addObjectsToMap(this.level.enemies); 
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.throwableObjects);
 

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


}