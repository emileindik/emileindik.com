"use strict";
var poker = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // dist/src/util.js
  var require_util = __commonJS({
    "dist/src/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.shuffle = exports.uniqWith = exports.cleanInput = exports.validateInput = void 0;
      var types_1 = require_types();
      function validateInput(input) {
        if (!("numPlayers" in input) && !("hands" in input))
          throw new Error(`Either "numPlayers" or "hands" must be provided.`);
        if ("returnHandStats" in input) {
          if (typeof input.returnHandStats !== "boolean")
            throw new Error(`"returnHandStats" must be a boolean. Invalid: ${input.returnHandStats}`);
        }
        if ("returnTieHandStats" in input) {
          if (typeof input.returnTieHandStats !== "boolean")
            throw new Error(`"returnTieHandStats" must be a boolean. Invalid: ${input.returnTieHandStats}`);
        }
        if ("numPlayers" in input) {
          if (typeof input.numPlayers !== "number" || !Number.isSafeInteger(input.numPlayers) || input.numPlayers < 1)
            throw new Error(`"numPlayers" must be an integer greater than 0. Invalid: ${input.numPlayers}`);
          if (input.hands && input.numPlayers < input.hands.length)
            throw new Error(`"numPlayers" must be equal to or greater than number of hands. Invalid: ${input.numPlayers} | ${input.hands}`);
        }
        if ("boardSize" in input) {
          if (typeof input.boardSize !== "number" || !Number.isSafeInteger(input.boardSize) || input.boardSize < 0)
            throw new Error(`"boardSize" must be a positive integer. Invalid: ${input.boardSize}`);
        }
        if ("numDecks" in input) {
          if (typeof input.numDecks !== "number" || !Number.isSafeInteger(input.numDecks) || input.numDecks < 1)
            throw new Error(`"numDecks" must be an integer greater than 0. Invalid: ${input.numDecks}`);
        }
        if ("board" in input) {
          if (typeof input.board !== "string")
            throw new Error(`"board" must be a string. Invalid: ${input.board}`);
          const cardGroup = new types_1.CardGroup(input.board);
          if ("boardSize" in input) {
            if (cardGroup.cards.length > input.boardSize)
              throw new Error(`"board" cannot contain more than "boardSize" numer of cards. Invalid: ${input.board} on boardSize ${input.boardSize}`);
          } else {
            if (cardGroup.cards.length > 5)
              throw new Error(`"board" cannot contain more than 5 cards. Invalid: ${input.board}`);
          }
        }
        if ("iterations" in input) {
          if (typeof input.iterations !== "number" || !Number.isSafeInteger(input.iterations) || input.iterations < 1)
            throw new Error(`"iterations" must be a string. Invalid: ${input.iterations}`);
        }
        if ("handSize" in input) {
          if (typeof input.handSize !== "number" || !Number.isSafeInteger(input.handSize) || input.handSize < 0)
            throw new Error(`"handSize" must be a positive integer. Invalid: ${input.handSize}`);
        }
        if ("hands" in input) {
          if (!Array.isArray(input.hands))
            throw new Error(`"hands" must be an array of strings like ["5c,Th"]. Invalid: ${input.hands}`);
          for (const hand of input.hands) {
            const cardGroup = new types_1.CardGroup(hand);
            if (!("handSize" in input)) {
              if (cardGroup.cards.length > 2)
                throw new Error(`Each hand must specify at most 2 cards. Invalid ${hand}`);
            } else {
              if (cardGroup.cards.length > input.handSize)
                throw new Error(`Each hand must specify at most ${input.handSize} cards. Invalid ${hand}`);
            }
          }
        }
        const allCards = [];
        if (input.hands)
          input.hands.forEach((e) => allCards.push(...e.split(",")));
        if (input.board)
          allCards.push(...input.board.split(","));
        if (new Set(allCards).size !== allCards.length)
          throw new Error(`Input cards must be unique. Invalid: ${allCards}`);
      }
      exports.validateInput = validateInput;
      function cleanInput(input) {
        if (!input.hands)
          input.hands = [];
        if (input.numPlayers !== 0 && !input.numPlayers)
          input.numPlayers = input.hands.length;
        if (!input.board)
          input.board = "";
        if (input.boardSize !== 0 && !input.boardSize)
          input.boardSize = 5;
        if (!input.numDecks)
          input.numDecks = 1;
        if (!input.iterations)
          input.iterations = 1e3;
        if (!input.handSize)
          input.handSize = 2;
      }
      exports.cleanInput = cleanInput;
      function uniqWith(arr, comparator) {
        const uniques = [];
        for (const a of arr) {
          if (uniques.findIndex((u) => comparator(a, u)) === -1)
            uniques.push(a);
        }
        return uniques;
      }
      exports.uniqWith = uniqWith;
      function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      exports.shuffle = shuffle;
    }
  });

  // dist/src/types.js
  var require_types = __commonJS({
    "dist/src/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Deck = exports.CardGroup = exports.Card = exports.HandRanks = exports.Ranks = exports.Suits = void 0;
      var util_1 = require_util();
      var Suits;
      (function(Suits2) {
        Suits2[Suits2["club"] = 1] = "club";
        Suits2[Suits2["diamond"] = 2] = "diamond";
        Suits2[Suits2["heart"] = 3] = "heart";
        Suits2[Suits2["spade"] = 4] = "spade";
      })(Suits = exports.Suits || (exports.Suits = {}));
      var Ranks;
      (function(Ranks2) {
        Ranks2[Ranks2["two"] = 2] = "two";
        Ranks2[Ranks2["three"] = 3] = "three";
        Ranks2[Ranks2["four"] = 4] = "four";
        Ranks2[Ranks2["five"] = 5] = "five";
        Ranks2[Ranks2["six"] = 6] = "six";
        Ranks2[Ranks2["seven"] = 7] = "seven";
        Ranks2[Ranks2["eight"] = 8] = "eight";
        Ranks2[Ranks2["nine"] = 9] = "nine";
        Ranks2[Ranks2["ten"] = 10] = "ten";
        Ranks2[Ranks2["jack"] = 11] = "jack";
        Ranks2[Ranks2["queen"] = 12] = "queen";
        Ranks2[Ranks2["king"] = 13] = "king";
        Ranks2[Ranks2["ace"] = 14] = "ace";
      })(Ranks = exports.Ranks || (exports.Ranks = {}));
      var HandRanks;
      (function(HandRanks2) {
        HandRanks2[HandRanks2["highCard"] = 1] = "highCard";
        HandRanks2[HandRanks2["pair"] = 2] = "pair";
        HandRanks2[HandRanks2["twoPair"] = 3] = "twoPair";
        HandRanks2[HandRanks2["trips"] = 4] = "trips";
        HandRanks2[HandRanks2["straight"] = 5] = "straight";
        HandRanks2[HandRanks2["flush"] = 6] = "flush";
        HandRanks2[HandRanks2["fullHouse"] = 7] = "fullHouse";
        HandRanks2[HandRanks2["quads"] = 8] = "quads";
        HandRanks2[HandRanks2["straightFlush"] = 9] = "straightFlush";
      })(HandRanks = exports.HandRanks || (exports.HandRanks = {}));
      var Suit = class {
        static fromString(s) {
          switch (s) {
            case "c":
              return Suits.club;
            case "d":
              return Suits.diamond;
            case "h":
              return Suits.heart;
            case "s":
              return Suits.spade;
            default:
              throw new Error(`Invalid card suit string: ${s}`);
          }
        }
        static toString(suit) {
          if (!(suit in Suits))
            throw new Error(`Invalid suit value: ${suit}`);
          return Suits[suit][0];
        }
        static toLongName(suit, plural) {
          if (!(suit in Suits))
            throw new Error(`Invalid suit value: ${suit}`);
          let longName = Suits[suit];
          if (plural)
            longName += "s";
          return longName;
        }
      };
      var Rank = class {
        static fromString(s) {
          switch (s) {
            case "T":
              return Ranks.ten;
            case "J":
              return Ranks.jack;
            case "Q":
              return Ranks.queen;
            case "K":
              return Ranks.king;
            case "A":
              return Ranks.ace;
            default:
              const n = Number(s);
              if (isNaN(n) || n < Ranks.two || n > Ranks.nine)
                throw new Error(`Invalid card rank string: ${s}`);
              return n;
          }
        }
        static toString(r) {
          switch (r) {
            case Ranks.ten:
              return "T";
            case Ranks.jack:
              return "J";
            case Ranks.queen:
              return "Q";
            case Ranks.king:
              return "K";
            case Ranks.ace:
              return "A";
            default:
              if (isNaN(r) || r < Ranks.two || r > Ranks.ace)
                throw new Error(`Invalid card rank value: ${r}`);
              return r.toString();
          }
        }
        static toLongName(rank) {
          if (!(rank in Ranks))
            throw new Error(`Invalid rank value: ${rank}`);
          return Ranks[rank];
        }
      };
      var Card = class _Card {
        constructor(s) {
          _Card.validateCardString(s);
          this._rank = Rank.fromString(s[0]);
          this._suit = Suit.fromString(s[1]);
        }
        get rank() {
          return this._rank;
        }
        get suit() {
          return this._suit;
        }
        static validateCardString(s) {
          if (s.length !== 2)
            throw new Error(`Card string must have a length of 2. Invalid: ${s}`);
          if (!["T", "J", "Q", "K", "A"].includes(s[0]) && (+s[0] < 2 || +s[0] > 9))
            throw new Error(`Card string must begin with 2-9, T, J, Q, K, or A. Invalid: ${s}`);
          if (!["c", "d", "h", "s"].includes(s[1]))
            throw new Error(`Card string must end with c, d, h, or s. Invalid: ${s}`);
        }
        equals(card) {
          return this._rank === card.rank && this._suit === card.suit;
        }
        toString() {
          return Rank.toString(this._rank) + Suit.toString(this._suit);
        }
        toLongName() {
          return `${Rank.toLongName(this._rank)} of ${Suit.toLongName(this._suit, true)}`;
        }
      };
      exports.Card = Card;
      var CardGroup = class {
        constructor(cards) {
          this._cards = [];
          if (!cards)
            return;
          if (Array.isArray(cards))
            this.addCards(cards);
          else if (typeof cards === "string")
            this.addCards(cards);
          else
            this.addCards(cards);
        }
        get cards() {
          return this._cards;
        }
        static validateCardGroupString(s) {
          for (const e of s.split(",")) {
            Card.validateCardString(e);
          }
        }
        toString() {
          return this._cards.map((c) => c.toString()).join(",");
        }
        addCardGroup(cardGroup) {
          this._cards.push(...cardGroup.cards);
        }
        addCards(cards) {
          if (typeof cards === "string")
            this.addCardsString(cards);
          else if (Array.isArray(cards))
            this._cards.push(...cards);
          else
            this._cards.push(cards);
        }
        sortDesc() {
          this._cards.sort((a, b) => b.suit - a.suit);
          this._cards.sort((a, b) => b.rank - a.rank);
        }
        countBy(type) {
          const map = {};
          for (const card of this._cards) {
            const prop = type === "rank" ? card.rank : card.suit;
            if (!(prop in map))
              map[prop] = 1;
            else
              map[prop]++;
          }
          return map;
        }
        addCardsString(s) {
          for (const e of s.split(",")) {
            const card = new Card(e);
            this.addCards(card);
          }
        }
      };
      exports.CardGroup = CardGroup;
      var Deck = class extends CardGroup {
        constructor(numDecks) {
          const deckString = "2c,2d,2h,2s,3c,3d,3h,3s,4c,4d,4h,4s,5c,5d,5h,5s,6c,6d,6h,6s,7c,7d,7h,7s,8c,8d,8h,8s,9c,9d,9h,9s,Tc,Td,Th,Ts,Jc,Jd,Jh,Js,Qc,Qd,Qh,Qs,Kc,Kd,Kh,Ks,Ac,Ad,Ah,As";
          const decksString = Array(numDecks).fill(deckString);
          super(decksString.join(","));
        }
        pop() {
          if (this._cards.length === 0)
            throw new Error("Deck is empty. There are either too many players, or the boardSize is too large");
          return this._cards.pop();
        }
        removeCard(cardToRemove) {
          let found = false;
          for (let i = 0; i < this._cards.length; i++) {
            if (this._cards[i].equals(cardToRemove)) {
              this._cards.splice(i, 1);
              found = true;
            }
          }
          if (!found)
            throw new Error(`CardGroup does not contain card string: ${cardToRemove.toString()}`);
          return cardToRemove;
        }
        shuffle() {
          util_1.shuffle(this._cards);
        }
      };
      exports.Deck = Deck;
    }
  });

  // dist/src/evaluate.js
  var require_evaluate = __commonJS({
    "dist/src/evaluate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.evaluate = void 0;
      var types_1 = require_types();
      var util_1 = require_util();
      function evaluate(cardGroup) {
        cardGroup.sortDesc();
        const rankCount = cardGroup.countBy("rank");
        const quadRanks = [];
        const tripRanks = [];
        const pairRanks = [];
        let straightCardsCount = 0;
        let straightMaxCardRank;
        let straightLastCardRank;
        const allRanks = Object.keys(rankCount).reverse();
        for (const rank of allRanks) {
          if (rankCount[rank] === 2) {
            pairRanks.push(Number(rank));
          } else if (rankCount[rank] === 3) {
            tripRanks.push(Number(rank));
          } else if (rankCount[rank] === 4) {
            quadRanks.push(Number(rank));
          }
          if (straightCardsCount < 5) {
            if (straightLastCardRank && straightLastCardRank - 1 === Number(rank)) {
              straightCardsCount++;
              straightLastCardRank = Number(rank);
            } else {
              straightMaxCardRank = straightLastCardRank = Number(rank);
              straightCardsCount = 1;
            }
          }
        }
        const suitCount = cardGroup.countBy("suit");
        let flushSuit;
        for (const suit in suitCount) {
          if (suitCount[suit] >= 5) {
            flushSuit = Number(suit);
            break;
          }
        }
        if (flushSuit) {
          if (straightCardsCount === 5) {
            const straightFlushCards = cardGroup.cards.filter((card) => card.suit === flushSuit && card.rank <= straightMaxCardRank);
            if (straightFlushCards.length >= 5) {
              let index = 0;
              let count = 1;
              let isStraightFlush = false;
              for (let i = 1; i < straightFlushCards.length; i++) {
                if (straightFlushCards[i].rank !== straightFlushCards[i - 1].rank - 1) {
                  index = i;
                  count = 1;
                } else {
                  count++;
                }
                if (count === 5) {
                  isStraightFlush = true;
                  break;
                }
              }
              if (isStraightFlush)
                return { handRank: types_1.HandRanks.straightFlush, hand: new types_1.CardGroup(straightFlushCards.slice(index, index + 5)) };
            }
          } else if (straightCardsCount === 4 && straightMaxCardRank === types_1.Ranks.five) {
            const aceCards = cardGroup.cards.filter((card) => card.suit === flushSuit && card.rank === types_1.Ranks.ace);
            if (aceCards.length > 0) {
              const straightFlushCards = cardGroup.cards.filter((card) => card.suit === flushSuit && card.rank <= straightMaxCardRank);
              if (straightFlushCards.length === 4)
                return { handRank: types_1.HandRanks.straightFlush, hand: new types_1.CardGroup(straightFlushCards.concat(aceCards[0]).slice(0, 5)) };
            }
          }
        }
        if (quadRanks.length >= 1) {
          const quadCards = cardGroup.cards.filter((card) => card.rank === quadRanks[0]);
          const otherCards = cardGroup.cards.filter((card) => card.rank !== quadRanks[0]);
          return { handRank: types_1.HandRanks.quads, hand: new types_1.CardGroup(quadCards.concat(otherCards).slice(0, 5)) };
        }
        if (tripRanks.length === 1 && pairRanks.length >= 1) {
          const tripCards = cardGroup.cards.filter((card) => card.rank === tripRanks[0]);
          const pairCards = cardGroup.cards.filter((card) => card.rank === pairRanks[0]);
          return { handRank: types_1.HandRanks.fullHouse, hand: new types_1.CardGroup(tripCards.concat(pairCards)) };
        } else if (tripRanks.length > 1) {
          const tripCards = cardGroup.cards.filter((card) => card.rank === tripRanks[0]);
          const pairCards = cardGroup.cards.filter((card) => card.rank === tripRanks[1]);
          return { handRank: types_1.HandRanks.fullHouse, hand: new types_1.CardGroup(tripCards.concat(pairCards.slice(0, 2))) };
        }
        if (flushSuit) {
          const flushCards = cardGroup.cards.filter((card) => card.suit === flushSuit);
          return { handRank: types_1.HandRanks.flush, hand: new types_1.CardGroup(flushCards.slice(0, 5)) };
        }
        if (straightCardsCount === 5) {
          const straightCards = util_1.uniqWith(cardGroup.cards.filter((card) => card.rank <= straightMaxCardRank), (c1, c2) => c1.rank === c2.rank);
          return { handRank: types_1.HandRanks.straight, hand: new types_1.CardGroup(straightCards.slice(0, 5)) };
        } else if (straightCardsCount === 4 && straightMaxCardRank === types_1.Ranks.five) {
          const aceCards = cardGroup.cards.filter((card) => card.rank === types_1.Ranks.ace);
          if (aceCards.length > 0) {
            const straightCards = util_1.uniqWith(cardGroup.cards.filter((card) => card.rank <= straightMaxCardRank), (c1, c2) => c1.rank === c2.rank);
            return { handRank: types_1.HandRanks.straight, hand: new types_1.CardGroup(straightCards.concat(aceCards[0]).slice(0, 5)) };
          }
        }
        if (tripRanks.length === 1) {
          const tripCards = cardGroup.cards.filter((card) => card.rank === tripRanks[0]);
          const cards = cardGroup.cards.filter((card) => card.rank !== tripRanks[0]);
          return { handRank: types_1.HandRanks.trips, hand: new types_1.CardGroup(tripCards.concat(cards).slice(0, 5)) };
        }
        if (pairRanks.length >= 2) {
          const pairedHigherCards = cardGroup.cards.filter((card) => card.rank === pairRanks[0]);
          const pairedLowerCards = cardGroup.cards.filter((card) => card.rank === pairRanks[1]);
          const unpairedCards = cardGroup.cards.filter((card) => card.rank !== pairRanks[0] && card.rank !== pairRanks[1]);
          return { handRank: types_1.HandRanks.twoPair, hand: new types_1.CardGroup(pairedHigherCards.concat(pairedLowerCards).concat(unpairedCards).slice(0, 5)) };
        }
        if (pairRanks.length === 1) {
          const pairedCards = cardGroup.cards.filter((card) => card.rank === pairRanks[0]);
          const unpairedCards = cardGroup.cards.filter((card) => card.rank !== pairRanks[0]);
          return { handRank: types_1.HandRanks.pair, hand: new types_1.CardGroup(pairedCards.concat(unpairedCards).slice(0, 5)) };
        }
        return { handRank: types_1.HandRanks.highCard, hand: new types_1.CardGroup(cardGroup.cards.slice(0, 5)) };
      }
      exports.evaluate = evaluate;
    }
  });

  // dist/src/Game.js
  var require_Game = __commonJS({
    "dist/src/Game.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Calculator = void 0;
      var types_1 = require_types();
      var util_1 = require_util();
      var evaluate_1 = require_evaluate();
      var Player = class {
        constructor(name) {
          this.dealt = new types_1.CardGroup();
          this.name = name;
        }
        evaluate(board) {
          const totalCardGroup = new types_1.CardGroup(this.dealt.cards.concat(board.cards));
          this.bestHand = evaluate_1.evaluate(totalCardGroup);
          return this.bestHand;
        }
        compare(p) {
          if (p.bestHand.handRank === this.bestHand.handRank) {
            for (let i = 0; i < this.bestHand.hand.cards.length; i++) {
              if (p.bestHand.hand.cards[i].rank !== this.bestHand.hand.cards[i].rank) {
                return p.bestHand.hand.cards[i].rank > this.bestHand.hand.cards[i].rank ? 1 : -1;
              }
            }
            return 0;
          }
          return p.bestHand.handRank > this.bestHand.handRank ? 1 : -1;
        }
      };
      var Game = class _Game {
        constructor(input) {
          this.players = [];
          this.input = input;
          this.deck = new types_1.Deck(this.input.numDecks);
          this.deck.shuffle();
          this.buildKnownBoard();
          this.dealKnownCards();
          this.buildRestOfBoard();
          this.dealRestOfCards();
        }
        static getNpcName(i) {
          return `NPC ${i}`;
        }
        play() {
          for (const p of this.players) {
            p.evaluate(this.board);
          }
          util_1.shuffle(this.players);
          this.players.sort((a, b) => a.compare(b));
          const winners = [this.players[0]];
          for (let i = 1; i < this.players.length; i++) {
            const res = this.players[i - 1].compare(this.players[i]);
            if (res === 0) {
              winners.push(this.players[i]);
            } else {
              break;
            }
          }
          return winners;
        }
        buildKnownBoard() {
          this.board = new types_1.CardGroup(this.input.board);
          this.board.cards.forEach((c) => this.deck.removeCard(c));
        }
        buildRestOfBoard() {
          const currentBoardSize = this.board.cards.length;
          for (let i = 0; i < this.input.boardSize - currentBoardSize; i++) {
            this.board.addCards(this.deck.pop());
          }
        }
        dealKnownCards() {
          for (const s of this.input.hands) {
            const dealtCards = new types_1.CardGroup(s);
            dealtCards.cards.forEach((c) => this.deck.removeCard(c));
            const p = new Player(dealtCards.toString());
            p.dealt.addCardGroup(dealtCards);
            this.players.push(p);
          }
        }
        dealRestOfCards() {
          for (const p of this.players) {
            for (let i = 0; i < this.input.handSize - p.dealt.cards.length; i++) {
              p.dealt.addCards(this.deck.pop());
            }
          }
          for (let i = 0; i < this.input.numPlayers - this.input.hands.length; i++) {
            const dealtCards = new types_1.CardGroup();
            for (let j = 0; j < this.input.handSize; j++) {
              dealtCards.addCards(this.deck.pop());
            }
            const p = new Player(_Game.getNpcName(i + 1));
            p.dealt.addCardGroup(dealtCards);
            this.players.push(p);
          }
        }
      };
      var Calculator = class {
        constructor(input) {
          this.stats = {};
          util_1.validateInput(input);
          util_1.cleanInput(input);
          this.input = input;
          for (const e of this.input.hands) {
            this.setupStatsObj(e);
          }
          for (let i = 0; i < this.input.numPlayers - this.input.hands.length; i++) {
            this.setupStatsObj(Game.getNpcName(i + 1));
          }
        }
        simulate() {
          for (let i = 0; i < this.input.iterations; i++) {
            const g = new Game(this.input);
            const winners = g.play();
            this.addToCount(winners);
          }
          this.calculateStats();
          return this.stats;
        }
        addToCount(winners) {
          if (winners.length > 1) {
            for (const winner of winners) {
              this.stats[winner.name].tieCount++;
              if (this.input.returnTieHandStats)
                this.stats[winner.name].tieHandStats[types_1.HandRanks[winner.bestHand.handRank]].count++;
            }
          } else {
            for (const winner of winners) {
              this.stats[winner.name].winCount++;
              if (this.input.returnHandStats)
                this.stats[winner.name].handStats[types_1.HandRanks[winner.bestHand.handRank]].count++;
            }
          }
        }
        calculateStats() {
          for (const name in this.stats) {
            this.stats[name].winPercent = this.calculatePercent(this.stats[name].winCount);
            this.stats[name].tiePercent = this.calculatePercent(this.stats[name].tieCount);
            if (this.input.returnHandStats) {
              for (const rank in this.stats[name].handStats) {
                this.stats[name].handStats[rank].percent = this.calculatePercent(this.stats[name].handStats[rank].count);
              }
            }
            if (this.input.returnTieHandStats) {
              for (const rank in this.stats[name].tieHandStats) {
                this.stats[name].tieHandStats[rank].percent = this.calculatePercent(this.stats[name].tieHandStats[rank].count);
              }
            }
          }
        }
        setupStatsObj(name) {
          this.stats[name] = { winCount: 0, tieCount: 0 };
          if (this.input.returnHandStats)
            this.stats[name].handStats = {};
          if (this.input.returnTieHandStats)
            this.stats[name].tieHandStats = {};
          for (const r in types_1.HandRanks) {
            if (typeof types_1.HandRanks[r] !== "number")
              continue;
            if (this.input.returnHandStats)
              this.stats[name].handStats[r] = { count: 0 };
            if (this.input.returnTieHandStats)
              this.stats[name].tieHandStats[r] = { count: 0 };
          }
        }
        calculatePercent(count) {
          return +(count / this.input.iterations * 100).toFixed(4);
        }
      };
      exports.Calculator = Calculator;
    }
  });

  // dist/index.js
  var require_index = __commonJS({
    "dist/index.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      var Game_1 = require_Game();
      Object.defineProperty(exports, "Calculator", { enumerable: true, get: function() {
        return Game_1.Calculator;
      } });
    }
  });
  return require_index();
})();
