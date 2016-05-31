# cardgame

A simple card picking game for nodejs. It also has a Slack parser, so you can use it with your Slack bot.

It is written in ES6 syntax (/src folder) and compiled to ES5 (/lib folder)

## basic functionality

With cardgame you can play a simple card picking game. Players can pick a card from a shuffled card deck. Players will be sorted by the value of there picked cards. A player can only pick once in a game.

It also provides a parser for Slack message syntax.

## demo

See a demo implementation here: `/lib/demo.js`

Run it with: `npm run demo`

## installation

Install the node package within your console:

`npm install --save cardgame`

## usage

### import

`import * as cardgame from 'cardgame'` - ES6 syntax

`var cardgame = require('cardgame')` - ES5 syntax

### start a new game

`cardgame.newGame()`

### pick a card for a player

`cardgame.pick('John Doe')`

### create a sorted summary of the game

`cardgame.summary(cardgame.players)`

### parse a player to a Slack message

`cardgame.playerToSlack(player)`

> `player` is one out of `cardgame.players` array.

### parse game summary to Slack message

`cardgame.gameToSlack(summary)`

> get `summary` with `cardgame.summary(cardgame.players)`

# planned features

* pass a card deck configuration object to `cardgame.newGame()` to override default deck
* create a wrapper Slack bot (in another package)
* provide a poker game mode

# contribution

I would love to see you contribute and send me pull requests. Note that you only work in /src folder and write ES6 syntax.

To compile your work use `npm run build`

# license

The MIT License (MIT)

Copyright (c) 2016 Toni Feistauer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
