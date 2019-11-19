let model = new GameViewModel();

let emptyElement = function(element) {
    var node = element;
    while (element.hasChildNodes()) {
        if (node.hasChildNodes()) {
            node = node.lastChild;
        } else {
            node = node.parentNode;
            node.removeChild(node.lastChild);
        }
    }
} ;

window.onload = () => {
   let playButton = document.querySelector("#play");
   let guessInputText = document.querySelector("#guess");
   let history = document.querySelector("#history");
   let tries = document.querySelector("#tries");
   playButton.addEventListener("click", ()=>{
       model.play(guessInputText.value);
       emptyElement(history);
       tries.innerText = model.tries;
       for (let move of model.moves){
           let tr = history.insertRow();
            let guessTd = tr.insertCell(0);
            let messageTd = tr.insertCell(1);
            guessTd.appendChild(document.createTextNode(move.guess));
            messageTd.appendChild(document.createTextNode(move.message));
       }
   },false)
};
