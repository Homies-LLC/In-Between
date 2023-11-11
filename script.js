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
function drawTwoCards(deck) {
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

//Section 2: Currency / Wallet / Ante


//Section 3: Game Start & HTML Display

// Function to start the game
function startGame() {
    // Hide the start screen
    document.getElementById('start-screen').style.display = 'none';

    // Show the game content
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'flex';
    gameContainer.classList.remove('hidden');
}

// Displaying
function displayCurrentPlayerCards() {
    // Clear out the currently displayed cards
    document.getElementById('currentPlayerCard1').src = '';
    document.getElementById('currentPlayerCard2').src = '';
    document.getElementById('currentPlayerNewCard').src = ''; // Clear the new card as well

    // Deal and display the new cards
    const currentPlayer = dealTwoCards(myDeck);

    if (currentPlayer) {
        document.getElementById('currentPlayerCard1').src = currentPlayer[0];
        document.getElementById('currentPlayerCard2').src = currentPlayer[1];

        // Show the card images after dealing
        document.getElementById('currentPlayerCard1').style.display = 'inline-block';
        document.getElementById('currentPlayerCard2').style.display = 'inline-block';
        document.getElementById('currentPlayerNewCard').style.display = 'none'; // Hide the new card initially
    }
}

function displayCurrentPlayerNewCard() {
    // Clear out the currently displayed new card
    document.getElementById('currentPlayerNewCard').src = '';

    // Deal and display the new card
    const newCard = dealOneCard(myDeck);

    if (newCard) {
        document.getElementById('currentPlayerNewCard').src = newCard[0];

        // Show the new card image after dealing
        document.getElementById('currentPlayerNewCard').style.display = 'inline-block';
    }
}
