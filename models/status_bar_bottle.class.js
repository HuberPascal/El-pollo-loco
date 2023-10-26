/**
 * Represents the status bar for the salsa bottle, displaying its fill level.
 */
class StatusBarBottle extends DrawableObject {
    /**
     * Array of image paths representing the status bar bottle at different fill levels.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    imagePath;
    percentage = 0;

    /**
     * Constructs a StatusBarBottle object.
     */
    constructor(imagePath) {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.imagePath = imagePath;
        this.x = 40;
        this.y = 100;     
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the fill percentage of the salsa bottle and updates its image accordingly.
     * @param {number} percentage - The fill percentage of the salsa bottle (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in IMAGES_BOTTLE based on the given fill percentage.
     * @param {number} percentage - The fill percentage of the salsa bottle (0 to 100).
     * @returns {number} - The index of the corresponding image in IMAGES_BOTTLE.
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
