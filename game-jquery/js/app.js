let model = new GameViewModel();

$(document).ready(() => {
    function updateHistory() {
        // TODO: Update history table
    }

    function updateTries() {
        // TODO: Update treies
    }

    function updateProgressBar() {
        // TODO: Update progress bar
    }

    let playButton = /*TODO: Get play button element using jQuery selector */;
    let guessInputText = /*TODO: Get input text element using jQuery selector */;
    let history = /*TODO: Get history table body element using jQuery selector */;
    let tries = /*TODO: Get tries span element using jQuery selector */;
    let pbCounter = $("#counter");
    window.setInterval(() => {
        // TODO: Count down and update state/view
    }, 1000);

    playButton.click(() => {
        // TODO: Update view model and then view
    })
});