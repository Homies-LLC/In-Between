// Section 1: Deck / Shuffler / Dealing Cards                                                                                        

// ** Function to create a deck of cards **
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(`Cards PNG/${rank}_of_${suit}.png`);
        }
    }

    return deck;
}

// ** Function to shuffle the deck **
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// ** Function to draw two cards from the deck **
function dealTwoCards(deck) {
    if (deck.length < 2) {
        console.log("Not enough cards in the deck to draw two cards.");
        return;
    }

    const card1 = deck.pop();
    const card2 = deck.pop();

    return { card1, card2 };
}

// ** Function to draw one card from the deck, 
// checking if this third card is in-between the previous two **
function dealOneCard(deck, card1, card2) {
    if (deck.length === 0) {
        console.log("No cards left in the deck.");
        return;
    }

    const card3 = deck.pop();
    const isBetween = (card3 > Math.min(card1, card2)) && (card3 < Math.max(card1, card2));

    if (isBetween) {
        return { card3, message: "Card is between" };
    } else {
        return { card3, message: "Card is not between" };
    }
}

// Section 2: Displaying

// Function to handle dealing two cards
function handleDealTwoCards() {
    const result = dealTwoCards(deck);
    if (result) {
        drawnCards.push(result.card1, result.card2);
        displayCard(result.card1);
        displayCard(result.card2);
    }
}

// Function to handle dealing one card and checking if it's between the previous two
function handleDealOneCard() {
    const result = dealOneCard(deck, drawnCards[0], drawnCards[1]);
    if (result) {
        drawnCards.push(result.card3);
        displayCard(result.card3);
    }
}

// Function to display a card image
function displayCard(card) {
    const cardDisplayArea = document.getElementById("cardDisplayArea");
    const imageElement = document.createElement("img");
    imageElement.src = card;
    imageElement.alt = "Card Image";
    cardDisplayArea.appendChild(imageElement);
}