class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    


        // loadImage('img/test.png')
        loadImage(path) {
            this.img = new Image(); // this.img = document.getElementById('image') <img id="image" scr>
            this.img.src = path;
            console.log('das bild ist:', this.img);
        }


        draw(ctx) {
          
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

        drawFrame(ctx) {
            if(this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof SalsaBottle || this instanceof SmallChicken) {
                ctx.beginPath();
                ctx.lineWidth = '5';
                ctx.strokeStyle = 'blue';
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        }


    /**
     * 
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

