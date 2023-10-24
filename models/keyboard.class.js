/**
 * Class representing the keyboard input handling.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * Constructor for the Keyboard class.
     * Initializes keyboard events for both physical keyboard and touchpad.
     */
    constructor() {
        this.eventKeyboard();
        this.eventTouchpad();
    }

    /**
     * Sets up keyboard events for key press and release.
     */
    eventKeyboard() {
        this.checkKeysArePressed();
        this.checkKeysAreReleased();
    }

    /**
     * Checks for keys that are pressed and updates corresponding properties.
     */
    checkKeysArePressed() {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 39) {
                keyboard.RIGHT = true;
            }

            if (e.keyCode == 37) {
                keyboard.LEFT = true;
            }

            if (e.keyCode == 38) {
                keyboard.UP = true;
            }

            if (e.keyCode == 40) {
                keyboard.DOWN = true;
            }

            if (e.keyCode == 32) {
                keyboard.SPACE = true;
            }

            if (e.keyCode == 68) {
                keyboard.D = true;
            }
        });
    }

    /**
     * Checks for keys that are released and updates corresponding properties.
     */
    checkKeysAreReleased() {
        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 39) {
                this.RIGHT = false;
            }

            if (e.keyCode == 37) {
                this.LEFT = false;
            }

            if (e.keyCode == 38) {
                this.UP = false;
            }

            if (e.keyCode == 40) {
                this.DOWN = false;
            }

            if (e.keyCode == 32) {
                this.SPACE = false;
            }

            if (e.keyCode == 68) {
                this.D = false;
            }
        });
    }

    /**
     * Sets up touchpad events for touch start and end.
     */
    eventTouchpad() {
        this.checkButtonsArePressed();
        this.checkButtonsAreReleased();
    }

    /**
     * Checks for touchpad buttons that are pressed and updates corresponding properties.
     */
    checkButtonsArePressed() {
        setTimeout(() => {
            document.getElementById("btnRight").addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });

            document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.LEFT = true;
            });

            document.getElementById("btnJump").addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.SPACE = true;
            });

            document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.D = true;
            });
        }, 500);
    }

    /**
     * Checks for touchpad buttons that are released and updates corresponding properties.
     */
    checkButtonsAreReleased() {
        setTimeout(() => {
            document.getElementById("btnRight").addEventListener("touchend", (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });

            document.getElementById("btnLeft").addEventListener("touchend", (e) => {
                e.preventDefault();
                this.LEFT = false;
            });

            document.getElementById("btnJump").addEventListener("touchend", (e) => {
                e.preventDefault();
                this.SPACE = false;
            });

            document.getElementById("btnThrow").addEventListener("touchend", (e) => {
                e.preventDefault();
                this.D = false;
            });
        }, 500);
    }
}
