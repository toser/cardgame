'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gameToSlack = exports.playerToSlack = exports.summary = exports.pick = exports.newGame = exports.players = undefined;

var _helptos = require('helptos');

/**
 * create a card deck from config cards
 *
 * @param cards
 * @returns {function}
 */
var createDeck = function createDeck(cards) {

    var cardRank = 0;

    return cards.values.reduce(function (cardDeck, val) {

        return cardDeck.concat(cards.colors.map(function (color) {
            return {
                color: color,
                value: val,
                rank: cardRank++
            };
        }));
    }, []);
};

/**
 * picks out a random card from deck and removes this card from deck
 *
 * @param deck
 * @returns {{card: string, newDeck: Array}}
 */
var deal = function deal(deck) {

    var card = deck[Math.floor(Math.random() * deck.length)],
        newDeck = deck.filter(function (deckCard) {
        return !(deckCard.rank === card.rank);
    });

    return {
        card: card,
        newDeck: newDeck
    };
};

/**
 * color string to slack emoji
 *
 * @param color
 * @returns {string}
 */
var colorToSlack = function colorToSlack(color) {
    return ':' + color + ':';
};

/**
 * value to slack bold message
 *
 * @param value
 * @returns {string}
 */
var valueToSlack = function valueToSlack(value) {
    return '*' + value + '*';
};

/**
 * create a card slack message
 *
 * @param card
 * @returns {string}
 */
var cardToSlack = function cardToSlack(card) {
    return '[ ' + valueToSlack(card.value) + colorToSlack(card.color) + ' ]';
};

var cardsConfig = (0, _helptos.getConfig)('../config/cardgame.json', __dirname).cards;
var deck = createDeck(cardsConfig, __dirname);
var players = exports.players = [];

/**
 * reset the game
 */
var newGame = exports.newGame = function newGame() {

    deck = createDeck(cardsConfig);
    exports.players = players = [];
};

/**
 * pick a card and give it to a player
 *
 * @param playerName
 * @returns {object}
 */
var pick = exports.pick = function pick(playerName) {

    if ((0, _helptos.getByName)(players, playerName).length) {
        return false;
    }

    var dealt = deal(deck),
        playerStore = {
        name: playerName,
        card: dealt.card
    };

    deck = dealt.newDeck;
    players.push(playerStore);

    return playerStore;
};

/**
 * create summery of game and sort it by rank
 *
 * @type {function(): Array}
 */
var summary = exports.summary = function summary(players) {
    return (0, _helptos.sortByDeepProp)(players, '.card.rank');
};

/**
 * convert player object to slack message
 *
 * @param player
 * @returns {string}
 */
var playerToSlack = exports.playerToSlack = function playerToSlack(player) {
    return '> *' + player.name + '* picks ' + cardToSlack(player.card);
};

/**
 * converts game summery to slack message
 *
 * @param summary
 * @returns {string}
 */
var gameToSlack = exports.gameToSlack = function gameToSlack(summary) {

    var reversedSummery = (0, _helptos.copyArray)(summary).reverse();
    var output = '>>> :crown: *' + reversedSummery[0].name + '* leads with ' + cardToSlack(reversedSummery[0].card);

    reversedSummery.shift();

    if (reversedSummery.length) {
        output += '\n\n_others:_\n';
    }

    output = reversedSummery.reduce(function (out, player) {
        return out += '~' + player.name + '~ ' + cardToSlack(player.card) + '\n';
    }, output);

    return output;
};