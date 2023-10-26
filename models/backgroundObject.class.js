class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    imagePath;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.imagePath = imagePath;
        this.x = x;
        this.y = 480 - this.height;
    }
}
