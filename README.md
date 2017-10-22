# Memory Game Project

## Game Instructions

* This is a typical memory/concentration game.  

* The user has to click two cards and if they are matched, they will change color and stay turned over.  

* If the user's cards do not match, they will flip back over.  

* Once all the cards are matched, then the user has won the game and can play another round if they want to play again.

## Project Info

The project contains the following features:

1. Shuffles a set of cards in an array and renders them to the screen hidden.
2. Implements a star rating based on how many moves you need to take to finish the game.
3. Allows you to reset by click a reload icon at any time.
4. Uses animations to highlight whether you matched correctly two cards, turns red as well if not matched.
5. Implements some checks to handle whether you click more than two cards in a row to prevent certain bugs that arise from that.
6. Tracks how many moves (each set of two cards flipped over) are made in the game.
7. Opens a congrats dialog whenever all cards are finally matched and allows you to start a new game in the same dialog.

## Dependencies

This program requires jQuery and a modern web browser that supports CSS3 and jQuery.  It also incorporates the jquery-modal plugin for the modal dialog.