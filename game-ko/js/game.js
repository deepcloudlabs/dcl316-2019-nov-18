class Move {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

class GameStatistics {
    constructor() {
        let localStatistics = localStorage.getItem("game-statistics")
            || JSON.stringify({wins: 0, loses: 0, totalWinsTime: 0, totalMoves: 0});
        localStatistics = JSON.parse(localStatistics);
        this.wins = ko.observable(localStatistics.wins);
        this.loses = ko.observable(localStatistics.loses);
        this.total = ko.computed(() => {
            return this.wins() + this.loses();
        })
        this.totalWinsTime = ko.observable(localStatistics.totalWinsTime);
        this.avgWinsTime = ko.computed(() => {
            if (this.wins() == 0) return 0;
            return this.totalWinsTime() / this.wins();
        });
        this.totalMoves = ko.observable(localStatistics.totalMoves);
        this.avgMoves = ko.computed(() => {
            if (this.wins() == 0) return 0;
            return this.totalMoves() / this.wins();
        });
    }
}

class GameViewModel {
    constructor() {
        this.secret = this.createSecret();
        this.tries = ko.observable(0);
        this.guess = ko.observable(50);
        this.moves = ko.observableArray([]);
        this.counter = ko.observable(30);
        this.pbWidth = ko.computed(() => {
            return ((10 * this.counter()) / 3) + '%';
        });
        this.pbClass = ko.computed(() => {
            if (this.counter() <= 10)
                return "progress-bar progress-bar-danger";
            if (this.counter() <= 20)
                return "progress-bar progress-bar-warning";
            return "progress-bar progress-bar-striped";
        });
        this.statistics = new GameStatistics();
        setInterval(() => {
            this.countDown()
        }, 1000);
    }

    countDown() {
        this.counter(this.counter() - 1);
        if (this.counter() <= 0) {
            this.statistics.loses(this.statistics.loses() + 1);
            let move = new Move(this.secret, "Time is out!");
            this.initGame();
            this.moves.push(move);
        }
    }

    play() {
        let move;
        this.tries(this.tries() + 1);
        if (this.secret === Number(this.guess())) {
            this.statistics.wins(this.statistics.wins() + 1);
            this.statistics.totalWinsTime(
                this.statistics.totalWinsTime() + 30 - this.counter()
            );
            this.statistics.totalMoves(
                this.statistics.totalMoves() + this.tries()
            );
            this.initGame();
            move = new Move(this.guess(), "You win!");
        } else {
            if (this.secret > Number(this.guess())) {
                move = new Move(this.guess(), "Pick larger!");
            } else {
                move = new Move(this.guess(), "Pick smaller!");
            }
            if (this.tries() >= 7) {
                move = new Move(this.secret, "You lose!");
                this.statistics.loses(this.statistics.loses() + 1);
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
        this.counter(30);
        this.moves([]);
        this.secret = this.createSecret();
        localStorage.setItem("game-statistics", ko.toJSON(this.statistics));
    }
}
