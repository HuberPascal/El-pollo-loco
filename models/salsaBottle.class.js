class SalsaBottle extends MovableObject {
    y = 350;
    x = 200;

    offset = {
        top: 20,
        bottom: 30,
        left: 40,
        right: 0
    };

    IMAGES_SALSA_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_SALSA_BOTTLE);
        this.y = 350;
        this.x = x + Math.random() * 500;
        this.width = 80;
        this.height = 80;
     } 

}