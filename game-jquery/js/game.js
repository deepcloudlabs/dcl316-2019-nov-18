class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

class GameViewModel {
    constructor() {
        this.secret = this.createSecret();
        this.tries = 0;
        this.moves = [];
        this.counter = 30;
    }

    countDown(){
        this.counter--;
        if (this.counter<=0){
            let move = new Move(this.secret,"Time is out!");
            this.initGame();
            this.moves.push(move);
        }
    }

    play(guess) {
        let move;
        this.tries++;
        if (this.secret == guess) {
            this.initGame();
            move = new Move(guess, "You win!");
        } else {
            if (this.secret > guess) {
                move = new Move(guess, "Pick larger!");
            } else {
                move = new Move(guess, "Pick smaller!");
            }
            if (this.tries >= 7) {
                move = new Move(this.secret, "You lose!")
                this.initGame();
            }
        }
        this.moves.push(move);
    }

    createSecret() {
        let rand = Math.random() * 100;
        return Math.floor(rand) + 1;
    }

    initGame() {
        this.tries = 0;
        this.counter = 30;
        this.moves.splice(0);
        this.secret = this.createSecret();
    }
}