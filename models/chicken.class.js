class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 80;


    offset = {
        top: 5,
        bottom: 5,
        left: 12,
        right: 12
    };

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGES_DEAD_CHICKEN = [
        "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

    world;

    constructor(x) {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD_CHICKEN);

        this.x = x + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.chickensMoveLeft();
        this.checkChickenIsDead();
    }

    chickensMoveLeft() {
        this.chickenMoveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    checkChickenIsDead() {
        this.chickenAnimation = setInterval(() => {
            this.playChicken();
        }, 100);
    }

    playChicken() {
        if (this.isDead()) {
            this.speed = 0;
            this.playAnimation(this.IMAGES_DEAD_CHICKEN);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    stopChickenInterval() {
        clearInterval(this.chickenMoveLeft);
        clearInterval(this.chickenAnimation);
    }
}
