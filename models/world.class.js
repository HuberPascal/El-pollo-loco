/**
 * Represents the game world containing various game elements.
 */
class World {
    character = new Character();
    chicken = new Chicken();
    smallChicken = new SmallChicken();
    cloud = new Cloud();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottles = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    statusBarEndbossHeart = new StatusBarEndbossHeart();
    coin = new Coin();
    salsaBottle = new SalsaBottle();
    throwableObjects = [];
    salsaBottles = 0;
    salsaBottleCounter = 0;
    throwableBottles = [];
    wasDKeyPressed = false;
    lastThrowTime = 0;

    /**
     * Constructs a World instance.
     * @param {HTMLCanvasElement} canvas - The HTML canvas element.
     * @param {Keyboard} keyboard - The keyboard controller for user input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.setEndboss();
        this.runIntervals();
        playAudio("backgroundSound");
    }

    /**
     * Sets the world property of the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Sets the world property of the end boss.
     */
    setEndboss() {
        this.endboss.world = this;
    }

    /**
     * Runs intervals for various game checks and updates.
     */
    runIntervals() {
        setInterval(() => {
            this.checkCharacterCollidesEnemy();
            this.checkEndboss();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleHurtingEndboss();
            this.checkBottleIsSmashed();
            this.checkEndbossHurtCharacter();
        }, 1000 / 100);
    }

    /**
     * Draws the game elements on the canvas.
     */
    draw() {
        this.clearCanvas();
        this.drawBackground();
        this.drawFixedObjects();
        this.drawMovableObjects();
        this.requestAnimationFrame();
    }

    /**
     * Draws the background elements.
     */
    drawBackground() {
        this.ctx.save(); // Save the current state of the context
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.BackgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.restore(); // Restore the context to the saved state
    }

    /**
     * Draws the fixed objects on the canvas.
     */
    drawFixedObjects() {
        this.ctx.save(); // Save the current state of the context

        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarEndbossHeart);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.restore(); // Restore the context to the saved state
    }

    /**
     * Draws the movable objects on the canvas.
     */
    drawMovableObjects() {
        this.ctx.save(); // Save the current state of the context
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.restore(); // Restore the context to the saved state
    }

    /**
     * Requests the next animation frame.
     */
    requestAnimationFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Clears the entire canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Adds an array of objects to the map.
     * @param {DrawableObject[]} objects - The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a drawable object to the map.
     * @param {DrawableObject} mo - The drawable object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally.
     * @param {DrawableObject} mo - The drawable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back to its original orientation.
     * @param {DrawableObject} mo - The drawable object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks if the character should throw objects (salsa bottles).
     * If the conditions are met, creates a throwable object and adds it to the throwableObjects array.
     */
    checkThrowObjects() {
        if (this.shouldThrowObjects()) {
            this.salsaBottleCounter--;
            this.salsaBottles -= 20;
            this.statusBarBottles.setPercentage(this.salsaBottles);
            let bottle = new TrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.lastAction = new Date().getTime();
            this.updateLastThrowTime();
        }
        this.wasDKeyPressed = this.keyboard.D;
    }

    /**
     * Checks if the character should throw objects.
     * @returns {boolean} - True if the character should throw objects; otherwise, false.
     */
    shouldThrowObjects() {
        return (
            this.keyboard.D &&
            !this.wasDKeyPressed &&
            !world.character.otherDirection &&
            this.salsaBottleCounter > 0 &&
            !this.character.isHurt() &&
            !this.character.isDead() &&
            this.lastThrowObjectsTime()
        );
    }

    /**
     * Checks the time elapsed since the last salsa bottle throw.
     * @returns {boolean} - True if more than 1 second has passed since the last throw; otherwise, false.
     */
    lastThrowObjectsTime() {
        let currentTime = new Date().getTime();
        let lastThrowTime = (currentTime - this.lastThrowTime) / 1000;
        return lastThrowTime > 1.5;
    }

    /**
     * Updates the last throw time to the current time.
     */
    updateLastThrowTime() {
        this.lastThrowTime = new Date().getTime();
    }

    /**
     * Checks if the character collides with enemies, handles enemy interactions, and updates game state accordingly.
     */
    checkCharacterCollidesEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterJumpsOnTop(enemy)) {
                playAudio("chickenHit");
                this.enemieGetsKilled(enemy);
            }
            if (this.enemieCanHurtCharacter(enemy)) {
                this.characterGetsHurt();
            }
        });
    }

    /**
     * Checks if the character is on top of an enemy (jumps on top).
     * @param {DrawableObject} enemy - The enemy to check collision with.
     * @returns {boolean} - True if the character jumps on top of the enemy; otherwise, false.
     */
    characterJumpsOnTop(enemy) {
        return !this.character.isHurt() && this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0;
    }

    /**
     * Handles the scenario where the character jumps on top of an enemy.
     * @param {DrawableObject} enemy - The enemy that the character jumped on.
     */
    enemieGetsKilled(enemy) {
        let indexEnemy = this.level.enemies.indexOf(enemy);
        this.level.enemies[indexEnemy].energy = 0;
        this.removeEnemyAfterDelay(indexEnemy);
        this.character.jump();
    }

    /**
     * Removes an enemy from the level after a delay.
     * @param {number} indexEnemy - The index of the enemy to remove.
     */
    removeEnemyAfterDelay(indexEnemy) {
        setTimeout(() => {
            this.level.enemies.splice(indexEnemy, 1);
        }, 700);
    }

    /**
     * Checks if an enemy can hurt the character.
     * @param {DrawableObject} enemy - The enemy to check collision with.
     * @returns {boolean} - True if the enemy can hurt the character; otherwise, false.
     */
    enemieCanHurtCharacter(enemy) {
        return this.character.isColliding(enemy) && !this.character.isHurt() && !this.character.isAboveGround();
    }

    /**
     * Handles the scenario where the character gets hurt, updating character health and status bar.
     */
    characterGetsHurt() {
        if (this.shouldCharacterGetHurt()) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if the character should get hurt.
     * @returns {boolean} - True if the character should get hurt; otherwise, false.
     */
    shouldCharacterGetHurt() {
        return !this.character.isHurt() && !this.character.isDead();
    }

    /**
     * Checks collisions involving coins, salsa bottles, and endboss, updating game state accordingly.
     */
    checkCollisions() {
        this.coinCollision();
        this.salsaBottleCollision();
    }

    /**
     * Checks if the character should collect coins and handles coin collection.
     */
    coinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.shouldCharacterCollectCoin(coin)) {
                this.character.collectCoin();
                this.statusBarCoin.setPercentage(this.character.coins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * Checks if the character should collect a coin.
     * @param {DrawableObject} coin - The coin to check collision with.
     * @returns {boolean} - True if the character should collect the coin; otherwise, false.
     */
    shouldCharacterCollectCoin(coin) {
        return this.character.isColliding(coin) && !this.character.isHurt();
    }

    /**
     * Checks if the character should collect salsa bottles and handles salsa bottle collection.
     */
    salsaBottleCollision() {
        if (this.shouldCharacterCollectSalsaBottle()) {
            this.level.salsaBottles.forEach((salsaBottle, index) => {
                if (this.isCharacterCollidingAndNotHurt(salsaBottle)) {
                    this.character.collectSalsaBottle();
                    this.statusBarBottles.setPercentage(this.salsaBottles);
                    this.level.salsaBottles.splice(index, 1);
                }
            });
        }
    }

    /**
     * Checks if the character should collect a salsa bottle.
     * @returns {boolean} - True if the character should collect a salsa bottle; otherwise, false.
     */
    shouldCharacterCollectSalsaBottle() {
        return this.salsaBottles < 100;
    }

    isCharacterCollidingAndNotHurt(salsaBottle) {
        return this.character.isColliding(salsaBottle) && !this.character.isHurt();
    }

    /**
     * Checks if the character reaches the endboss and activates the endboss if true.
     */
    checkEndboss() {
        if (this.characterReachesEndboss()) {
            this.activatingEndboss();
        } else {
            this.hiddenStatusBarOfEndboss();
        }
    }

    /**
     * Checks if the character reaches the endboss.
     * @returns {boolean} - True if the character reaches the endboss; otherwise, false.
     */
    characterReachesEndboss() {
        return this.endboss.x - this.character.x < 600;
    }

    /**
     * Activates the endboss and plays audio if conditions are met.
     */
    activatingEndboss() {
        this.statusBarEndboss.width = 200;
        this.statusBarEndboss.height = 60;
        this.statusBarEndbossHeart.width = 60;
        this.statusBarEndbossHeart.height = 60;
        this.endboss.isAlarmed = true;

        if (!this.endboss.energy == 0) {
            if (!this.character.isDead()) {
                playAudio("endboss");
                pauseAudio("backgroundSound");
            }
        }
    }

    /**
     * Hides the status bar of the endboss.
     */
    hiddenStatusBarOfEndboss() {
        this.statusBarEndboss.width = 0;
        this.statusBarEndboss.height = 0;
        this.statusBarEndbossHeart.width = 0;
        this.statusBarEndbossHeart.height = 0;
    }

    /**
     * Checks if throwable objects hurt the endboss and updates the game state accordingly.
     */
    checkBottleHurtingEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.bottleCollidesEndboss(bottle)) {
                this.endbossGetsHurt();
            }
        });
    }

    /**
     * Checks if a bottle collides with the endboss.
     * @param {TrowableObject} bottle - The bottle to check collision with the endboss.
     * @returns {boolean} - True if the bottle collides with the endboss; otherwise, false.
     */
    bottleCollidesEndboss(bottle) {
        return this.endboss.isColliding(bottle) && !this.endboss.isHurt();
    }

    /**
     * Handles the scenario where the endboss gets hurt by a throwable object.
     */
    endbossGetsHurt() {
        this.endboss.isAlarmed = false;
        this.endboss.hit();
        this.statusBarEndboss.setPercentage(this.endboss.energy);
        playAudio("chickenHit");
    }

    /**
     * Checks if throwable objects are smashed and updates the game state accordingly.
     */
    checkBottleIsSmashed() {
        this.throwableObjects.forEach((bottle) => {
            if (this.bottleCollidesBottomOrEndboss(bottle)) {
                this.clearBottle(bottle);
            }
        });
    }

    /**
     * Checks if a bottle collides with the bottom or endboss.
     * @param {TrowableObject} bottle - The bottle to check collision with.
     * @returns {boolean} - True if the bottle collides with the bottom or endboss; otherwise, false.
     */
    bottleCollidesBottomOrEndboss(bottle) {
        return bottle.hitGround() || this.endboss.isColliding(bottle);
    }

    /**
     * Clears a bottle, playing audio if it's not already smashed.
     * @param {TrowableObject}
     */
    clearBottle(bottle) {
        if (!this.isBottleSmashed(bottle)) {
            playAudio("bottleSmashed");
        }
        bottle.isSmashed = true;
    }

    /**
     * Checks if a bottle is smashed.
     * @param {TrowableObject} bottle - The bottle to check if it's smashed.
     * @returns {boolean} - True if the bottle is smashed; otherwise, false.
     */
    isBottleSmashed(bottle) {
        return bottle.isSmashed === true;
    }

    /**
     * Checks if the end boss collides with the character and if the character should get hurt.
     */
    checkEndbossHurtCharacter() {
        if (this.endbossCollidesCharacter()) {
            this.characterGetsHurt();
            this.resetCharacterPosition();
        }
    }

    /**
     * Resets the character's position to a previous location.
     */
    resetCharacterPosition() {
        this.character.x = this.character.x - 400;
    }

    /**
     * Checks if the end boss collides with the character.
     * @returns {boolean} - True if the end boss collides with the character; otherwise, false.
     */
    endbossCollidesCharacter() {
        return this.character.isColliding(this.endboss);
    }
}
