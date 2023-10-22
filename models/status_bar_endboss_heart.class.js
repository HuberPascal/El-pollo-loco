class StatusBarEndbossHeart extends DrawableObject {
    x = 487;
    y = 60;
    width = 65;
    height = 65;
    percentage = 100;
    IMAGES_HEART = ["img/7_statusbars/3_icons/icon_health_endboss.png"];
  
    constructor() {
        super();
        this.loadImage(this.IMAGES_HEART);
    }
  }
  