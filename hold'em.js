// Declare global variables
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
let deck = [];

// Player class
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  addCardToHand(card) {
    this.hand.push(card);
  }
}

// Game class
class Game {
  constructor() {
    this.players = [];
  }

  // Create players
  createPlayers() {
    this.players = [];
    const playerName = 'Player'; // Change the player's name as needed
    const player = new Player(playerName);
    this.players.push(player);

    // Create four AI players
    for (let i = 1; i <= 4; i++) {
      const aiName = `AI ${i}`;
      const aiPlayer = new Player(aiName);
      this.players.push(aiPlayer);
    }
  }

  // Deal cards to all players
  dealCardsToPlayers() {
    for (let player of this.players) {
      for (let i = 0; i < 2; i++) {
        const card = dealCard();
        player.addCardToHand(card);
      }
    }
  }

  // Display player hands
  displayPlayerHands() {
    for (let player of this.players) {
      console.log(`${player.name}'s Hand:`, player.hand);
    }
  }
}

// Create an instance of the Game class
const game = new Game();

// Deal a card from the deck
function dealCard() {
  return deck.pop();
}

// Shuffle the deck using Fisher-Yates algorithm
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Create deck of cards
function createDeck() {
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
}

// Display player and AI hands
function displayHands() {
  displayPlayerHand();
  displayAIHands();
}

// Display player hand
function displayPlayerHand() {
  document.getElementById('player-hand').innerHTML = '';
  for (let card of game.players[0].hand) {
    const cardImage = `<img src="Cards PNG/${card.rank}_of_${card.suit}.png" alt="${card.rank} of ${card.suit}">`;
    document.getElementById('player-hand').innerHTML += cardImage;
  }
}

// Display AI hands
function displayAIHands() {
  for (let i = 1; i <= 4; i++) {
    const aiHandId = `ai-hand${i}`;
    document.getElementById(aiHandId).innerHTML = '';
    for (let card of game.players[i].hand) {
      const cardImage = `<img src="Cards PNG/${card.rank}_of_${card.suit}.png" alt="${card.rank} of ${card.suit}">`;
      document.getElementById(aiHandId).innerHTML += cardImage;
    }
  }
}

// Start the game
function startGame() {
  createDeck();
  shuffleDeck();
  game.createPlayers();
  game.dealCardsToPlayers();
  displayHands();
}

// Deal the flop (first three community cards)
function dealFlop() {
  document.getElementById('community-cards').innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const card = dealCard();
    const cardImage = `<img src="Cards PNG/${card.rank}_of_${card.suit}.png" alt="${card.rank} of ${card.suit}">`;
    document.getElementById('community-cards').innerHTML += cardImage;
  }
}

// Deal the turn (fourth community card)
function dealTurn() {
  const card = dealCard();
  const cardImage = `<img src="Cards PNG/${card.rank}_of_${card.suit}.png" alt="${card.rank} of ${card.suit}">`;
  document.getElementById('community-cards').innerHTML += cardImage;
}

// Deal the river (fifth community card)
function dealRiver() {
  const card = dealCard();
  const cardImage = `<img src="Cards PNG/${card.rank}_of_${card.suit}.png" alt="${card.rank} of ${card.suit}">`;
  document.getElementById('community-cards').innerHTML += cardImage;
}