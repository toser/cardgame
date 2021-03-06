'use strict';

import {getConfig, getByName, sortByDeepProp, copyArray} from 'helptos';

/**
 * create a card deck from config cards
 *
 * @param cards
 * @returns {function}
 */
const createDeck = cards => {

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
 * @returns {{card: string, newDeck: Array}}
 */
const deal = deck => {

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
 * @returns {string}
 */
const colorToSlack = color => `:${color}:`;

/**
 * value to slack bold message
 *
 * @param value
 * @returns {string}
 */
const valueToSlack = value => `*${value}*`;

/**
 * create a card slack message
 *
 * @param card
 * @returns {string}
 */
const cardToSlack = card => `[ ${valueToSlack(card.value)}${colorToSlack(card.color)} ]`;


const cardsConfig = getConfig('../config/cardgame.json', __dirname).cards;
let deck = createDeck(cardsConfig, __dirname);
export let players = [];

/**
 * reset the game
 */
export const newGame = () => {

    deck = createDeck(cardsConfig);
    players = [];
};

/**
 * pick a card and give it to a player
 *
 * @param playerName
 * @returns {object}
 */
export const pick = (playerName) => {

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
export const summary = (players => sortByDeepProp(players, '.card.rank'));

/**
 * convert player object to slack message
 *
 * @param player
 * @returns {string}
 */
export const playerToSlack = player => `> *${player.name}* picks ${cardToSlack(player.card)}`;

/**
 * converts game summery to slack message
 *
 * @param summary
 * @returns {string}
 */
export const gameToSlack = summary => {

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
