class Level {
    BackgroundObjects;
    enemies;
    clouds;
    coins;
    bottles;
    salsaBottles;
    level_end_x = 3900;
    
    constructor(BackgroundObjects, enemies, clouds, coins, salsaBottles) {
        this.BackgroundObjects = BackgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.salsaBottles = salsaBottles;
    }
}