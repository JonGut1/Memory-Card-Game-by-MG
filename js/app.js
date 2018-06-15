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
            winner();
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
* @description Reseting the timer. This function is called at reset() and openMenu()
*/

function resetTimer() {
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;
  theTimer.textContent = "00:00:00";
}

/** 
* @description Reset function, it gets activated after reset button is clicked. It resets the move count, timer, stars, flips back all the cards
*/
const restart = document.querySelector(".restart");
restart.addEventListener("click", reset);
function reset() {
  resetTimer();
  moves = 0;
  movesDisplay.textContent = moves + " moves";
  stars[0].firstElementChild.style.visibility = "visible";
  stars[1].firstElementChild.style.visibility = "visible";
  stars[2].firstElementChild.style.visibility = "visible";
  starsLeft = 3;
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
      matchedCards = [];
}

/** 
* @description Making stars to dissapear after every 10 moves. This function is called at moveCounter() 
*/

const stars = document.querySelectorAll(".stars li");
  let starsLeft = 3;
function starRating() {
  if (moves === 15) {
    stars[2].firstElementChild.style.visibility = "hidden";
    starsLeft--; 
  } else if (moves === 25) {
    stars[1].firstElementChild.style.visibility = "hidden";
    starsLeft--;
  } else if (moves === 30) {
    stars[0].firstElementChild.style.visibility = "hidden";
    starsLeft--;
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

/** 
* @description Funtions that hides the panel. It's user on the start menu and winner's modal
*/

function panelHidden() {
  panel.style.visibility = "hidden";
  stars[0].firstElementChild.style.visibility = "hidden";
  stars[1].firstElementChild.style.visibility = "hidden";
  stars[2].firstElementChild.style.visibility = "hidden";
}


/** 
* @description Opening 'MENU' modal after clicking the menu. The game gets restarted after menu is clicked
*/

const menu = document.querySelector(".menu");
menu.addEventListener("click", openMenu);
function openMenu() {
  startMenu.style.visibility = "visible";
  panelHidden();
  resetTimer();
}


/** 
* @description Winners modal appear when the game is completed
*/

const winModal = document.querySelector(".winModal");

function winner() {
  if (matchedCards.length === 16) {
    gameStats();
    winModal.style.visibility = "visible";
    submit.style.visibility = "visible";
    panelHidden();
    cardReset();
  }
}



/** 
* @description Adding the game statistics and score to the Winner's Modal
*/


function gameStats() {
  const playTime = document.querySelector(".playTime");
  const score = document.querySelector(".score");
  const starCount = document.querySelector(".starCount");
  const totalMoves = document.querySelector(".totalMoves");

  let seconds = (timer[0] * 60) + timer[1]; 
  let totalScore = ((40 - moves) + (100 - seconds)) * 10;
  let timeStopped = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);

  clearInterval(interval);

  playTime.textContent = timeStopped;
  starCount.textContent = starsLeft;
  totalMoves.textContent = moves;
  score.textContent = totalScore;
}


/** 
* @description Restarting the game when clicking the resart button in the Winner's modal
*/


const winnerRestart= document.querySelector(".highRestart");
winnerRestart.addEventListener("click", winnerStart);

function winnerStart() {
  nameAnim.readOnly = false;
  nameAnim.style.opacity = "1";
  nameAnim.value = "";
  submit.style.opacity = "1";
  winModal.style.visibility = "hidden";
  gameStart();
}

/** 
* @description Opening Highscore modal when clicked on Highscore button and going back when clicking Back
*/

const highscoreModal = document.querySelector(".highscoreModal");
const goBack = document.querySelector(".goBack");
const highscore = document.querySelectorAll(".highscore");
highscore[0].addEventListener("click", showHighscore);
highscore[1].addEventListener("click", showHighscore);
goBack.addEventListener("click", backMenu);

function showHighscore() {
  highscoreModal.style.visibility = "visible";
}


function backMenu() {
  highscoreModal.style.visibility = "hidden";
}

/** 
* @description Storing the scores locally
*/

const submit = document.querySelector(".submit");
const highscoreBtn = document.querySelectorAll(".highscore");
const nameAnim = document.querySelector(".name");
highscoreBtn[0].addEventListener("click", createElement);
highscoreBtn[1].addEventListener("click",createElement);
submit.addEventListener("click", submitStats);
let StorageObject = {
  gamesPlayed: 0,
  username : [],
  score : [],
  time : [],
  moves : [],
  stars : []
}


function submitStats() {
  const username = document.querySelector(".name").value;
  const score = document.querySelector(".score").textContent;
  const time = document.querySelector(".playTime").textContent;
  const stars = document.querySelector(".starCount").textContent;
  nameAnim.readOnly = true;
  nameAnim.style.background = "rgba(245, 217, 129, 0)";
  submit.style.opacity = "0";
  submit.style.visibility = "hidden";
  StorageObject.gamesPlayed++;
  StorageObject.username.push(username);
  StorageObject.score.push(score);
  StorageObject.time.push(time);
  StorageObject.moves.push(moves);
  StorageObject.stars.push(stars);
  if (username) {
    if (localStorage.cardGameStatistics) {
      let gameStatistics = JSON.parse(localStorage.getItem("cardGameStatistics"));
      gameStatistics.gamesPlayed++;
      gameStatistics.username.push(username);
      gameStatistics.score.push(score);
      gameStatistics.time.push(time);
      gameStatistics.moves.push(moves);
      gameStatistics.stars.push(stars);
      console.log(gameStatistics);
      localStorage.setItem("cardGameStatistics", JSON.stringify(gameStatistics));
  } else {
      localStorage.setItem("cardGameStatistics", JSON.stringify(StorageObject));
    } 
  }
}


/** 
* @description Creating a table and inserting all the data from the local storage after Highscore button is clicked. Every time highscore button is clicked table is cleaned and all the data is re-inserted
*/


const table = document.querySelector(".table tbody");

function createElement() {
  let tr = document.createElement("tr");
  table.textContent = ""; //Cleaning the table
    if (localStorage.cardGameStatistics) {
      let gameStatistics = JSON.parse(localStorage.getItem("cardGameStatistics"));
      let gameCount = gameStatistics.gamesPlayed - 1;
    //Creating TH and inserting after the click
      createTH();
    //Starting a for loop to iterate through all the data and inserting into TD
        for (let i = 0; i <= gameCount; i++) {
          let tdScore = document.createElement("td");
          let tdUsername = document.createElement("td");
          let tdTime = document.createElement("td");
          let tdStars = document.createElement("td");
          let tdMoves = document.createElement("td");
          tdUsername.textContent = gameStatistics.username[i];
          tdScore.textContent = gameStatistics.score[i];
          tdTime.textContent = gameStatistics.time[i];
          tdMoves.textContent = gameStatistics.moves[i];
          tdStars.textContent = gameStatistics.stars[i]; 
          //Inserting all the TD into Table rows 
          tr = document.createElement("tr");
          tr.appendChild(tdUsername);
          tr.appendChild(tdScore);
          tr.appendChild(tdTime); 
          tr.appendChild(tdMoves);
          tr.appendChild(tdStars);
          table.appendChild(tr);
            
    } 
  } else {
    createTH();
  }
}

/** 
* @description Function for creating table headers
*/

function createTH() {
  let tr = document.createElement("tr");
  let thStars = document.createElement("th");
  let thScore = document.createElement("th");
  let thTime = document.createElement("th");
  let thMoves = document.createElement("th");
  let thName = document.createElement("th");
  thName.textContent = "Name";
  thScore.textContent = "Score";
  thTime.textContent = "Time";
  thMoves.textContent = "Moves";
  thStars.textContent = "Stars";
  tr.appendChild(thName);
  tr.appendChild(thScore);
  tr.appendChild(thTime);
  tr.appendChild(thMoves);
  tr.appendChild(thStars);
  table.appendChild(tr);
}







