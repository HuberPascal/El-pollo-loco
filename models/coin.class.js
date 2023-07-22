class Coin extends MovableObject {


    static createCoins() {
        let coins = [];

        let coin1 = new Coin(500, 330);
        coins.push(coin1);

        let coin2 = new Coin(550, 300);
        coins.push(coin2);

        let coin3 = new Coin(600, 300);
        coins.push(coin3);

        let coin4 = new Coin(600, 300);
        coins.push(coin4);

        let coin5 = new Coin(600, 300);
        coins.push(coin5);

        return coins;
    }

    constructor(x, y) {
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
    }
}