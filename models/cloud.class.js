class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;
    speed = 0.15;

    constructor(x, world) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = x;
        this.animate();
    }

    animate() {
        this.moveLeftClouds();
    }

    moveLeftClouds() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}
