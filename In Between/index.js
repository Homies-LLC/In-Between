// Deck
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(`${rank} of ${suit}`);
        }
    }
    return deck;
}

// Shuffler
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal Two Cards
function dealTwoCards(deck) {
    return [deck.pop(), deck.pop()];
}

// Deal One Card
function dealOneCard(deck) {
    return [deck.pop()];
}

// Example usage:
const myDeck = createDeck();
shuffleDeck(myDeck); // Shuffle the deck once

const currentPlayer = dealTwoCards(myDeck);
const newCard = dealOneCard(myDeck);
console.log('Current Player\'s Cards:', currentPlayer);
console.log('Current Player\'s New Card:', newCard);

//speedy