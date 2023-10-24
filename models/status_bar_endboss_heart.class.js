/**
 * Represents the status bar for the end boss's heart, displaying its health icon.
 */
class StatusBarEndbossHeart extends DrawableObject {
    x = 487;
    y = 60;
    width = 65;
    height = 65;
    percentage = 100;

    /**
     * Array of image paths representing the end boss's heart icon.
     * @type {string[]}
     */
    IMAGES_HEART = [
        "img/7_statusbars/3_icons/icon_health_endboss.png"
    ];

    /**
     * Constructs a StatusBarEndbossHeart object.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_HEART);
    }
}
