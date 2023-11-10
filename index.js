// Section 1: Deck / Shuffler / Dealing Cards                                                                                        

    // Deck
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(`Cards PNG/${rank}_of_${suit}.png`);
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

    // Dealing Cards
function dealTwoCards(deck) {
    if (deck.length === 0) {
        // Deck is empty
        const reshuffle = window.confirm('The deck is empty. Do you want to reshuffle?');
        if (reshuffle) {
            // Reshuffle the deck
            shuffleDeck(deck);
        } else {
            return null;
        }
    }
    const firstCard = dealOneCard(deck)[0];
        // Check if the first card is an Ace ('A')
    if (firstCard.includes('A')) {
         // Prompt the player to choose high or low for the Ace
        const isHigh = window.confirm('You got an Ace! Do you want it to be high? Click OK for high, Cancel for low.');
            // Display the alert
        if (isHigh) {
            window.alert('You chose Ace to be high!');
        } else {
            window.alert('You chose Ace to be low!');
        }
        // Deal the second card
        const secondCard = dealOneCard(deck)[0];
        return [firstCard, secondCard];
    } else {
        // If the first card is not an Ace, just deal the second card
        const secondCard = dealOneCard(deck)[0];
        return [firstCard, secondCard];
    }
}

function dealOneCard(deck) {
    if (deck.length === 0) {
        console.error('Deck is empty!');
        return null;
    }
    return [deck.pop()];
}

const myDeck = createDeck();
shuffleDeck(myDeck);

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
