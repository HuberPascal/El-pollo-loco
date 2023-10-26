/**
 * Represents the status bar for the player's health, displaying its health level.
 */
class StatusBarHealth extends DrawableObject {
    /**
     * Array of image paths representing the health status bar.
     * @type {string[]}
     */
    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png", // 0
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png", // 5
    ];

    imagePath;
    percentage = 100;

    /**
     * Constructs a StatusBarHealth object.
     */
    constructor(imagePath) {
        super();
        this.loadImages(this.IMAGES);
        this.imagePath = imagePath;
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the fill percentage of the status bar based on the given percentage.
     * @param {number} percentage - The fill percentage to set (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current fill percentage.
     * @returns {number} - The resolved image index.
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
