/**
 * Represents the status bar for the coin, displaying its collected amount.
 */
class StatusBarCoin extends DrawableObject {
    /**
     * Array of image paths representing the status bar coin at different fill levels.
     * @type {string[]}
     */
    IMAGES_COIN = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ];

    imagePath;
    percentage;

    /**
     * Constructs a StatusBarCoin object.
     */
    constructor(imagePath) {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.imagePath = imagePath;
        this.x = 40;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the fill percentage of the coin and updates its image accordingly.
     * @param {number} percentage - The fill percentage of the coin (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in IMAGES_COIN based on the given fill percentage.
     * @returns {number} - The index of the corresponding image in IMAGES_COIN.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
