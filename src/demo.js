'use strict';

import * as cardgame from './cardgame';



/**
 * basic implementation
 */

console.log('\n---\nbasic implementation of cardgame\n---\n');

// create new game
cardgame.newGame();

// pick a card for new player 'John Doe'
cardgame.pick('John Doe');

// pick a card for new player 'Sylvester Stallone'
cardgame.pick('Sylvester Stallone');

// pick a card for new player 'Dolph Lundgren'
cardgame.pick('Dolph Lundgren');

// create summary
// array of all players sorted by card value
const summary = cardgame.summary(cardgame.players);

// log out the summary
console.log('summary:\n',summary);




/**
 * usage of the slack parser
 */

console.log('\n\n---\nusage of the slack parser\n---\n');


// parse a player to a formatted slack message
const playerSlack = cardgame.playerToSlack(cardgame.players[0]);

// parse the summary to a formatted slack message
const summarySlack = cardgame.gameToSlack(summary);


// log out both
console.log(playerSlack, '\n\n');
console.log(summarySlack);
