class TrowableObject extends MovableObject {

    IMAGES_SALSA_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SALSA_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    isSmashed = false;


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_SALSA_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_SALSA_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.animate();
        this.salsaBottleRotationOrSplash();
        this.throw();
    }

    animate() {
        setInterval(() => {
            if(this.isSmashed) {
                this.playAnimation(this.IMAGES_SALSA_BOTTLE_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_SALSA_BOTTLE_ROTATION);
            }
        }, 100);
    }


    hitGround() {
        return this.y > 270;
    }
    

    salsaBottleRotationOrSplash() {
        setInterval(() => {
            if(this.hitGround()) {
                this.isSmashed = true;
            }
        }, 25);
    }


    throw() {
            this.speedY = 20;
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 25);
    }
}