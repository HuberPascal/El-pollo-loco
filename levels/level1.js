let level1;
initLevel();
function initLevel() {
level1 = new Level(
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

        new BackgroundObject('img/5_background/layers/air.png', 719*4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),

        new BackgroundObject('img/5_background/layers/air.png', 719*5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),
    ],
    [
        new Chicken(500),
        new Chicken(900), 
        new Chicken(1200),
        new Chicken(1500),
        new Chicken(1900),
        new Chicken(2400),
        new Chicken(2700),
        new Chicken(3000),
        new SmallChicken(400),
        new SmallChicken(800),
        new SmallChicken(1300),
        new SmallChicken(1900),
        new SmallChicken(2500),
        new SmallChicken(2800),
    ],
    [
        new Cloud(100),
        new Cloud(550),
        new Cloud(1000),
        new Cloud(1450),
        new Cloud(1900),
        new Cloud(2350),
        new Cloud(2800),
        new Cloud(3250),
        new Cloud(3700),
        new Cloud(4150),
        new Cloud(4600)
    ],
    [
        new Coin(500, 250),
        new Coin(580, 210),
        new Coin(660, 170),
        new Coin(740, 210),
        new Coin(820, 250),
        
        new Coin(1500, 250),
        new Coin(1580, 210),
        new Coin(1660, 170),
        new Coin(1740, 210),
        new Coin(1820, 250),

        new Coin(2500, 250),
        new Coin(2580, 210),
        new Coin(2660, 170),
        new Coin(2740, 210),
        new Coin(2820, 250),
    ],
    [
        new SalsaBottle(500),
        new SalsaBottle(500),
        new SalsaBottle(800),
        new SalsaBottle(1200),
        new SalsaBottle(1800),
        new SalsaBottle(2000),
        new SalsaBottle(2500),
        new SalsaBottle(2800),
        new SalsaBottle(3000),
    ]
    );
}