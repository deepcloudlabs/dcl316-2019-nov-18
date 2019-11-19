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
   let playButton = /* TODO: get play button element by id using DOM */;
   let guessInputText = /* TODO: get input element by id using DOM */;
   let history = /* TODO: get history table body element by id using DOM */;
   let tries = /* TODO: get span element by id using DOM */;
   playButton.addEventListener("click", ()=>{
       // TODO: Update game model
       emptyElement(history);
       tries.innerText = // TODO: Update tries element
       for (let i in model.moves){
           let move = model.moves[i];
           // TODO: update table body
       }
   },false)
};