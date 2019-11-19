let model = new GameViewModel();

$(document).ready(() => {
    function updateHistory() {
        history.empty();
        for (let move of model.moves) {
            let tr = "<tr>" +
                "<td>" + move.guess + "</td>" +
                "<td>" + move.message + "</td>" +
                "</tr>";
            history.append(tr);
        }
    }

    function updateTries() {
        tries.text(model.tries);
    }

    function updateGameStatistics() {
        wins.text(model.statistics.wins);
        loses.text(model.statistics.loses);
        avgWinsTime.text(model.statistics.avgWinsTime);
        avgMoves.text(model.statistics.avgMoves);
        avgMoveTime.text(model.statistics.avgMoveTime);
    }

    function updateProgressBar() {
        let clazz = "progress-bar progress-bar-striped";
        if (model.counter<10)
            clazz = "progress-bar progress-bar-danger";
        else if (model.counter<20)
            clazz = "progress-bar progress-bar-warning";
        pbCounter.css("width", (10 *model.counter)/3 + '%');
        pbCounter.attr("class",clazz);
    }

    let playButton = $("#play");
    let guessInputText = $("#guess");
    let history = $("#history");
    let tries = $("#tries");
    let pbCounter = $("#counter");
    let wins = $("#wins");
    let loses = $("#loses");
    let avgWinsTime = $("#avgWinsTime");
    let avgMoves = $("#avgMoves");
    let avgMoveTime = $("#avgMoveTime");

    function updateView() {
        updateHistory();
        updateProgressBar();
        updateTries();
        updateGameStatistics();
    }

    window.setInterval(() => {
        model.countDown();
        updateView();
    }, 1000);

    playButton.click(() => {
        model.play(guessInputText.val());
        updateView();
    })
});
