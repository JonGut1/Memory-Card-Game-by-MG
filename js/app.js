/** 
* @description List that holds all the cards
*/

const cards = document.querySelectorAll(".card");
const cardList = [];
for (let i = 0; i < cards.length; i++) {
	cardList.push(cards[i]);
}


/** 
* @description Shuffle function from http://stackoverflow.com/a/2450976
* @param {array} array cardList array with all the .card li items
*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/** 
* @description Looping through each card and inserting shuffled cards in to the HTML. Function is called right away in order to shuffle the cards after every reload of the page.
*/

function cardHTML() {
	const shuffledCards = shuffle(cardList);
	const deck = document.querySelector('.board');
	for (let i = 0; i < shuffledCards.length; i++) {
		deck.appendChild(shuffledCards[i]);
    }
}
cardHTML();

/** 
* @description Setting up event listiner for the cards and creating a function that will uncover the card
* @param {NodeList} evt A clicked card. 
*/

const board = document.querySelector(".board-container");
board.addEventListener("click", toggleCard);
let openCards = [];
 function toggleCard(evt) {
    let theTarget = evt.target;
    if (theTarget && theTarget.matches("LI"))  {
        start();
        theTarget.classList.toggle("flip");
        openCards.push(theTarget);
        cardMatch();
    }  
 }

/** 
* @description Checking if the two open cards match, setting the delay for the flip class removal if the cards doesn't match. Keeping the cards open if they match. Function is called at toggleCard(evt)
*/
let matchedCards = [];

function cardMatch() {
    if (openCards.length === 2) {
        let card1 = openCards[0];
        let card2 = openCards[1];
        moveCounter();
        if (card1.innerHTML === card2.innerHTML) {
            matchedCards.push(card1, card2);
            openCards = [];
        } else {
            setTimeout(function () {
                        card1.classList.remove("flip");
                        card2.classList.remove("flip");
                    }, 600);
            openCards = [];                
        }
    }
}

/** 
* @description Counting the moves after every two cards were opened. Displaying the moved on the panel. The function is called at cardMatch(). Also calling a starRating() function to remove stars after every 10 moves
*/
let moves = 0;
let movesDisplay = document.querySelector(".moves");
function moveCounter() {
    moves++; 
    if (moves === 1) {
        movesDisplay.textContent = moves + " move";
    } else {
        movesDisplay.textContent = moves + " moves";
    }
    starRating();
}

/** 
* @description Setting up the variables for stopwatch
*/
const theTimer = document.querySelector(".timeCount");
let timer = [0,0,0,0];
let interval;
let timerRunning = false;

/** 
* @description Add leading zero to numbers 9 or below (purely for aesthetics)
*/
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

/** 
* @description Run a standard minute/second/hundredths timer. The functions is called at star(), with an interbval of 10 miliseconds
*/
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.textContent = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

/** 
* @description Starting the timer. This function is called at toggleCard(evt) when the first card is flipped
*/
function start() {
    if (!timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
    }
}

/** 
* @description Reset function, it gets activated after reset button is clicked. It resets the move count, timer, stars, flips back all the cards
*/
const restart = document.querySelector(".restart");
restart.addEventListener("click", reset);
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;
  theTimer.textContent = "00:00:00";
  moves = 0;
  movesDisplay.textContent = moves + " moves";
  stars[0].firstElementChild.style.visibility = "visible";
  stars[1].firstElementChild.style.visibility = "visible";
  stars[2].firstElementChild.style.visibility = "visible";
  cardReset();
}

/** 
* @description Reseting all the matched cards to original state, after reset button is clicked. This function is called in reset(). Flipping only matched cards and if only a single card was flipped.  
*/

function cardReset() {
    for (let i = 0; i < matchedCards.length; i++) {
    matchedCards[i].classList.remove("flip");
    } 
    if (openCards.length === 1) {
      openCards[0].classList.remove("flip");
      openCards = [];
    } 
      cardHTML();
}

/** 
* @description Making stars to dissapear after every 10 moves. This function is called at moveCounter() 
*/

const stars = document.querySelectorAll(".stars li");
function starRating() {
  if (moves === 15) {
    stars[2].firstElementChild.style.visibility = "hidden";
  } else if (moves === 25) {
    stars[1].firstElementChild.style.visibility = "hidden";
  } else if (moves === 30) {
    stars[0].firstElementChild.style.visibility = "hidden";
  }
}


/** 
* @description Starting the game after clicking start. Removing the modal and revealing the game and the panel
*/


const startButton = document.querySelector(".start");
const panel = document.querySelector(".panel");
const startMenu = document.querySelector(".startMenu");
startButton.addEventListener("click", gameStart);

function gameStart() {
  panel.style.visibility = "visible";
  startMenu.style.visibility = "hidden";
  reset();
}










