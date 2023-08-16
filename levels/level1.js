const level1 = new Level(
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        
        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
    ],
    [
        new Chicken(),
        new Chicken(), 
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ],
    [
        new Cloud(100),
        new Cloud(550),
        new Cloud(1000),
        new Cloud(1450),
        new Cloud(1900),
        new Cloud(2350),
        new Cloud(2800)
    ],
    [
        new Coin(300, 100),
        new Coin(500, 200),
        new Coin(700, 100),
        new Coin(900, 100),
        new Coin(1100, 200),
        new Coin(1300, 100),
        // new Coin(300, 200),
        // new Coin(400, 200),
        // new Coin(500, 200)
    ],
    [
        new SalsaBottle(300),
        new SalsaBottle(300),
        new SalsaBottle(400),
        new SalsaBottle(500),
        new SalsaBottle(600),
        new SalsaBottle(700),
        new SalsaBottle(800),
    ]
    );