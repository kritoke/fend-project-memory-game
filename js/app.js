/*
 * Create a list that holds all of your cards
 */
const sortedDeck = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
const shuffledDeck = shuffle(sortedDeck);
const $placedDeck = $('.deck');
const $moveClass = $('.moves');
const $restartClass = $('.restart');
let openCards = [];
let moveCounter = 0;
let matches = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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
}

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
    incrementMove();
    console.log(moveCounter);
    if (!card.hasClass('card match')) {
        card.addClass('open show');
        if (openCards.length === 0) {
            openCards.push(card);
        } else {
            setTimeout(function() {
                matchCards(openCards[0], card);
            }, 800);
        }
    }
};

// match cards if they are the same
var matchCards = function(prevCard, currCard) {
    if ((typeof prevCard != 'undefined') && (typeof prevCard != 'undefined')) {
        if (prevCard.children().attr('class') === currCard.children().attr('class')) {
            currCard.addClass('match');
            prevCard.addClass('match');
            unshowCards(prevCard, currCard);
            matches++;
            allMatched();
        } else {
            unshowCards(prevCard, currCard);
        }
    } else { // fix bug related to clicking over 2 cards in a row and it still showing up
        currCard.removeClass('open show');
    }
};

// remove cards from openCards and remove the cards from being visible
var unshowCards = function(prevCard, currCard) {
    prevCard.removeClass('open show');
    currCard.removeClass('open show');
    openCards.pop();
    openCards.pop();
};

// increment move counter and change display to reflect it.
var incrementMove = function() {
    moveCounter++;
    console.log(moveCounter);
    $moveClass.text(moveCounter);
};

// see if all cards are matched
var allMatched = function() {
    if (matches === 8) {
        $('.congrats').removeClass('hidden');
    }
};

// resets the game and puts all the cards back down
var reset = function() {
    const shuffledDeck = shuffle(sortedDeck);
    placeCards(shuffledDeck);
    openCards = [];
    moveCounter = 0;
    matches = 0;
    $moveClass.text(moveCounter);
};

placeCards(shuffledDeck);

$placedDeck.on('click', 'li', function() {
    let $currentCard = $(this);
    flipCard($currentCard);
});

$restartClass.on('click', 'i', function() {
    reset();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */