/**
 * Class representing a drawable object.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path of the image to be loaded.
     */
    loadImage(path) {
        // loadImage('img/test.png')
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" scr>
        this.img.src = path;
    }

    /**
     * Draws the image on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     *  Loads an array of images into the image cache.
     * @param {Array} arr - ['img/image1.png'. 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
