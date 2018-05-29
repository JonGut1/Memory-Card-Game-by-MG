// List that holds all the cards

const cards = document.querySelectorAll(".card");
const cardList = [];
for (let i = 0; i < cards.length; i++) {
	cardList.push(cards[i]);
}

// Shuffle function from http://stackoverflow.com/a/2450976.
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

// Looping through each card and inserting shuffled cards in to the HTML

function cardHTML() {
	const shuffledCards = shuffle(cardList);
	const deck = document.querySelector('.board');
	for (let i = 0; i < shuffledCards.length; i++) {
		deck.appendChild(shuffledCards[i]);
    }
}
cardHTML();

// Setting up event listiner for the cards and creating a function that will uncover the card

const board = document.querySelector(".board-container");
board.addEventListener("click", toggleCard);
let openCards = [];
 function toggleCard(evt) {
    let theTarget = evt.target;
    if (theTarget && theTarget.matches("LI"))  {
        theTarget.classList.toggle("flip");
        openCards.push(theTarget);
        cardMatch();
    }  
 }

// Checking if the two open cards match, setting the delay for the flip class removal if the cards doesn't match. Keeping the cards open if they match.
let matchedCards = [];

function cardMatch() {
        if (openCards.length > 1) {
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


// Move counter
let moves = 0;
let movesDisplay = document.querySelector(".moves");
function moveCounter() {
    moves++; 
    if (moves === 1) {
        movesDisplay.textContent = moves + " move";
    } else {
        movesDisplay.textContent = moves + " moves";
    }
}

//Setting up the timer
const theTimer = document.querySelector(".timeCount");
const restart = document.querySelector(".restart");
let timer = [0,0,0,0];
let interval;
let timerRunning = false;

board.addEventListener("click", start);
restart.addEventListener("click", reset);

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.textContent = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Start the timer:
function start() {
    if (!timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;
  theTimer.textContent = "00:00:00";
  moves = 0;
  movesDisplay.textContent = moves + " moves";
  cardReset();
}

// Reseting all the cards to original state

function cardReset() {
    for (let i = 0; i < matchedCards.length; i++) {
    matchedCards[i].classList.remove("flip");
    } 
    if (openCards.length < 2 && openCards.length > 0) {
      openCards[0].classList.remove("flip");
      openCards = [];
    } 
      cardHTML();
}






















