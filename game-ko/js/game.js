class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

class GameViewModel {
    constructor() {
        this.secret = this.createSecret();
        this.tries = ko.observable(0);
        this.guess = ko.observable(50);
        this.moves = ko.observableArray([]);
        this.counter = ko.observable(300);
    }

    countDown() {
        this.counter(this.counter()-1);
        if (this.counter() <= 0) {
            let move = new Move(this.secret, "Time is out!");
            this.initGame();
            this.moves.push(move);
        }
    }

    play() {
        let move;
        this.tries(this.tries()+1);
        if (this.secret === Number(this.guess())) {
            this.initGame();
            move = new Move(this.guess(), "You win!");
        } else {
            if (this.secret > Number(this.guess())) {
                move = new Move(this.guess(), "Pick larger!");
            } else {
                move = new Move(this.guess(), "Pick smaller!");
            }
            if (this.tries() >= 7) {
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
        this.tries(0);
        this.counter(300);
        this.moves([]);
        this.secret = this.createSecret();
    }
}
