// List that holds all the cards

const cards = document.querySelectorAll(".card");
var cardList = [];

for (var i = 0; i < cards.length; i++) {
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
	var dec = document.querySelector('.board');
	for (var i = 0; i < shuffledCards.length; i++) {
		dec.appendChild(shuffledCards[i]);
}
}

// Setting up event listiner for the cards and creating a function that will uncover the card


