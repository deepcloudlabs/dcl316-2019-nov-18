let counter= 0;
let updateCounter = () => { // lambda expression?
    counter++;
    let spanCounter = document.querySelector("#counter");
    spanCounter.innerText = counter;
};
// async programming
// event-driven programming: callback function
setInterval( updateCounter , 1000);
