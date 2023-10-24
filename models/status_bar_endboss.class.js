/**
 * Represents the status bar for the end boss, displaying its health level.
 */
class StatusBarEndboss extends DrawableObject {
    /**
     * Array of image paths representing the end boss's health status bar.
     * @type {string[]}
     */
    IMAGES_STATUSBAR_ENDBOSS = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
    ];

    x = 500;
    y = 50;
    width = 200;
    height = 60;
    percentage = 100;

    /**
     * Constructs a StatusBarEndboss object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.setPercentage(100);
    }

    /**
     * Sets the fill percentage of the status bar based on the given percentage.
     * @param {number} percentage - The fill percentage to set (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()];
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
