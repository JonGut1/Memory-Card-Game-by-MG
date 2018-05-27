// List that holds all the cards

const cards = document.querySelectorAll(".card");
const cardList = [];
for (let i = 0; i < cards.length; i++) {
	cardList.push(cards[i]);
}

// Shuffle function from http://stackoverflow.com/a/2450976.
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
	const dec = document.querySelector('.board');
	for (let i = 0; i < shuffledCards.length; i++) {
		dec.appendChild(shuffledCards[i]);
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

function cardMatch() {
        if (openCards.length > 1) {
            let card1 = openCards[0];
            let card2 = openCards[1];
            moveCounter();
            if (card1.innerHTML === card2.innerHTML) {
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
function moveCounter() {
    let movesDisplay = document.querySelector(".moves");
    moves++; 
    if (moves === 1) {
        movesDisplay.textContent = moves + " move";
    } else {
        movesDisplay.textContent = moves + " moves";
    }
}



























