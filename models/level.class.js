class Level {
    BackgroundObjects;
    enemies;
    clouds;
    coins;
    SalsaBottle;
    level_end_x = 2200;

    constructor(BackgroundObjects, enemies, clouds, coins, SalsaBottle) {
        this.BackgroundObjects = BackgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.SalsaBottle = SalsaBottle;
    }
}