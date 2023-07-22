class Level {
    enemies;
    clouds;
    coins;
    SalsaBottle;
    BackgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, BackgroundObjects, coins, SalsaBottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.BackgroundObjects = BackgroundObjects;
        this.coins = coins;
        this.SalsaBottle = SalsaBottle;
    }
}