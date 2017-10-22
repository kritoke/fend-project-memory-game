/*
 * Create a list that holds all of your cards
 */
const sortedDeck = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];

// jQuery variables for class look ups
const $placedDeck = $('.deck');
const $moveClass = $('.moves');
const $restartClass = $('.restart');
const $starsClass = $('.stars');
const $congratsClass = $('.congrats');
const $timeClass = $('.time');

// variables that need to be reset at each game
let openCards = [];
let moveCounter = 0;
let matches = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
var shuffle = function(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// shuffle the deck
let shuffledDeck = shuffle(sortedDeck);

// put cards on the "table"
var placeCards = function(cards) {
    let placedCards = '';

    for (let index = 0; index < cards.length; index++) {
        placedCards += `<li class="card">
        <i class="fa fa-${cards[index]}"></i>
    </li>`
    }
    $placedDeck.html(placedCards);
};

// flip card over for a short period of time, run match function
var flipCard = function(card) {
    displayStars();
    if (!card.hasClass('card match')) {
        card.addClass('open show');
        if (openCards.length === 0) {
            openCards.push(card);
        } else {
            setTimeout(function() {
                matchCards(openCards[0], card);
            }, 600);
        }
    }
};

// match cards if they are the same
var matchCards = function(prevCard, currCard) {
    if ((typeof prevCard != 'undefined') && (typeof prevCard != 'undefined')) {
        if (prevCard.children().attr('class') === currCard.children().attr('class')) {
            currCard.addClass('match');
            prevCard.addClass('match');
            shakeCardUpDown(prevCard);
            shakeCardUpDown(currCard);
            matches++;
            allMatched();
        } else {
            shakeCardSideways(prevCard);
            shakeCardSideways(currCard);
        }
        moveCounter++;
        updateMoveDisplay();
    } else { // fix bug related to clicking over 2 cards in a row and it still showing up
        shakeCardSideways(currCard);
    }
};

// remove most recent card from openCards and remove given card from being visible and shake card up/down
var shakeCardUpDown = function(card) {
    card.addClass('shake_effect_updown');
    setTimeout(function() {
        card.removeClass('open show shake_effect_updown')
    }, 600);
    openCards.pop();
};

// remove most recent card from openCards and remove given card from being visible and shake card sideways
var shakeCardSideways = function(card) {
    card.addClass('shake_effect_sideways wrong');
    setTimeout(function() {
        card.removeClass('open show shake_effect_sideways wrong')
    }, 600);
    openCards.pop();
};

// change display to update to current move counter amount.
var updateMoveDisplay = function() {
    $moveClass.text(moveCounter);
};

// generate html code for displaying stars
var generateStars = function() {
    let starHTML = '';
    let oneStarHTML = '<li><i class="fa fa-star"></i></li>';
    if (moveCounter >= 15) {
        starHTML = oneStarHTML;
    } else if (moveCounter === 9) {
        starHTML = oneStarHTML.repeat(2);
    } else if (moveCounter <= 8) {
        starHTML = oneStarHTML.repeat(3);
    }
    return starHTML;
};

// replace html for the score panel
var displayStars = function() {
    $starsClass.html(generateStars());
};

// see if all cards are matched, display modal with congrats info
var allMatched = function() {
    if (matches === 8) {
        $congratsClass.modal({
            fadeDuration: 250,
            fadeDelay: 0.80
        });
    }
};

// sets the current time spent in the game
let timeInterval;
var timer = function() {
    let time = {
        minutes: 0,
        seconds: 0
    };

    let setTime = function() {
        time.seconds++;
        if (time.seconds === 60) {
            time.seconds = 0;
            time.min++;
        }
        let timeTotal = `${time.minutes}:${time.seconds}`;
        $timeClass.text(timeTotal);
    };
    timeInterval = window.setInterval(setTime, 1000);
};

var stopTimer = function() {
    window.clearInterval(timeInterval);
};

// resets the game and puts all the cards back down
var reset = function() {
    shuffledDeck = shuffle(sortedDeck);
    placeCards(shuffledDeck);
    openCards = [];
    moveCounter = 0;
    matches = 0;
    updateMoveDisplay();
    displayStars($starsClass);
    stopTimer();
    timer();
};

var startGame = function() {
    displayStars();
    placeCards(shuffledDeck);
    timer();

    $placedDeck.on('click', 'li', function() {
        let $currentCard = $(this);
        flipCard($currentCard);
    });

    $restartClass.on('click', 'i', function() {
        reset();
    });
};

startGame();