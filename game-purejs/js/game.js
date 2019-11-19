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
        this.createSecret = this.createSecret.bind(this);
        this.play = this.play.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.initGame = this.initGame.bind(this);
    }

    play(guess) {
        guess = Number(guess);
        this.tries++;
        if (guess === this.secret) {
            this.initGame();
            this.moves.push(new Move(guess, "You win!"));
        } else if (this.tries > 7) {
            let move = new Move(this.secret, "You lose!");
            this.initGame();
            this.moves.push(move);
        } else {
            let message = this.createMessage(guess);
            this.moves.push(new Move(guess, message));
        }
    }

    createSecret() {
        return Math.floor(Math.random() * 100) + 1;
    }

    initGame() {
        this.secret = this.createSecret();
        this.tries = 0;
        this.moves = [];
    }

    createMessage(guess) {
        let message = "Pick smaller one!";
        if (guess < this.secret) message = "Pick larger one!";
        return message;
    }
}
