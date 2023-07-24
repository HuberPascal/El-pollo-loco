class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;
    speed = 0.15;
    

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        // this.x = Math.random() * 500;
        this.x = x;
        this.animate();
    }

    animate() {
        this.moveLeftClouds();
    }
}

