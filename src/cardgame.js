'use strict';

import {getConfig, getByName, sortByDeepProp, copyArray} from 'helptos';

/**
 * create ad card deck from config cards
 *
 * @param cards
 * @returns {*}
 */
let createDeck = cards => {

    let cardRank = 0;

    return cards.values.reduce((cardDeck, val) => {

        return cardDeck.concat(cards.colors.map((color) => ({
            color: color,
            value: val,
            rank: cardRank++
        })));

    }, []);
};

/**
 * picks out a random card from deck and removes this card from deck
 *
 * @param deck
 * @returns {{card: *, newDeck: (Array|*)}}
 */
let deal = deck => {

    let card = deck[Math.floor(Math.random() * deck.length)],
        newDeck = deck.filter(deckCard => !(deckCard.rank === card.rank));

    return {
        card: card,
        newDeck: newDeck
    }
};

/**
 * color string to slack emoji
 *
 * @param color
 */
let colorToSlack = color => `:${color}:`;

/**
 * value to slack bold message
 *
 * @param value
 */
let valueToSlack = value => `*${value}*`;

/**
 * create a card slack message
 *
 * @param card
 */
let cardToSlack = card => `[ ${valueToSlack(card.value)}${colorToSlack(card.color)} ]`;


let cardsConfig = getConfig('../config/cardgame.json', __dirname).cards;
let deck = createDeck(cardsConfig, __dirname);
export let players = [];

/**
 * reset the game
 */
export let newGame = () => {

    deck = createDeck(cardsConfig);
    players = [];
};

/**
 * pick a card and give it to a player
 *
 * @param playerName
 * @returns {*}
 */
export let pick = (playerName) => {

    if (getByName(players, playerName).length) {
        return false;
    }

    let dealt = deal(deck),
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
export let summary = (players => sortByDeepProp(players, '.card.rank'));

/**
 * convert player object to slack message
 *
 * @param player
 * @returns {string}
 */
export let playerToSlack = player => `> *${player.name}* picks ${cardToSlack(player.card)}`;

/**
 * converts game summery to slack message
 *
 * @param summary
 * @returns {string}
 */
export let gameToSlack = summary => {

    let reversedSummery = copyArray(summary).reverse();
    let output = `>>> :crown: *${reversedSummery[0].name}* leads with ${cardToSlack(reversedSummery[0].card)}`;

    reversedSummery.shift();

    if (reversedSummery.length) {
        output += '\n\n_others:_\n';
    }

    output = reversedSummery.reduce((out, player) => {
        return out += `~${player.name}~ ${cardToSlack(player.card)}\n`;
    }, output);

    return output;
};