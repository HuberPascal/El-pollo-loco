class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;
    speed = 0.15;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = x;
        this.animate();
    }

    animate() {
        this.cloudsMoveToLeft();
    }

    cloudsMoveToLeft() {
        this.cloudsMoveLeft = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    stopCloudInterval() {
        clearInterval(this.cloudsMoveLeft);
    }
}
