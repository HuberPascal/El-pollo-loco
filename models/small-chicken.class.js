class SmallChicken extends MovableObject {
    y = 370;
    height = 50;
    width = 70;

    offset = {
        top: 0,
        left: 2,
        right: 2,
        bottom: 2,
    };

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
     
    ];

    IMAGES_DEAD_CHICKEN = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];

    constructor() {
        super().loadImage(
            "img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_CHICKEN);

        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playChicken();
        }, 100);
    }

    playChicken() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD_CHICKEN);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}
