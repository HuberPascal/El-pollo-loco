/**
 * Class representing a game level.
 */
class Level {
    BackgroundObjects;
    enemies;
    clouds;
    coins;
    bottles;
    salsaBottles;
    level_end_x = 3900;

    /**
     * Constructor for the Level class.
     * @param {Array} BackgroundObjects - Array of background objects.
     * @param {Array} enemies - Array of enemies in the level.
     * @param {Array} clouds - Array of cloud objects.
     * @param {Array} coins - Array of coin objects.
     * @param {Array} salsaBottles - Array of salsa bottle objects.
     */
    constructor(BackgroundObjects, enemies, clouds, coins, salsaBottles) {
        this.BackgroundObjects = BackgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.salsaBottles = salsaBottles;
    }
}
