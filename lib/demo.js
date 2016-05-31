'use strict';

var _cardgame = require('./cardgame');

var cardgame = _interopRequireWildcard(_cardgame);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
var summary = cardgame.summary(cardgame.players);

// log out the summary
console.log('summary:\n', summary);

/**
 * usage of the slack parser
 */

console.log('\n\n---\nusage of the slack parser\n---\n');

// parse a player to a formatted slack message
var playerSlack = cardgame.playerToSlack(cardgame.players[0]);

// parse the summary to a formatted slack message
var summarySlack = cardgame.gameToSlack(summary);

// log out both
console.log(playerSlack, '\n\n');
console.log(summarySlack);