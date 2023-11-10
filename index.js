// Deck
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(`Cards/${rank}_of_${suit}.png`);
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
        return null; // or handle it in a way suitable for your application
    }
    return [deck.pop()];
}

const myDeck = createDeck();
shuffleDeck(myDeck);

// Displaying
function displayCurrentPlayerCards() {
    // Clear out the currently displayed cards
    document.getElementById('currentPlayerCard1').src = '';
    document.getElementById('currentPlayerCard2').src = '';
    
    // Clear out the currently displayed new card
    document.getElementById('currentPlayerNewCard').src = '';

    // Deal and display the new cards
    const currentPlayer = dealTwoCards(myDeck);
    document.getElementById('currentPlayerCard1').src = currentPlayer[0];
    document.getElementById('currentPlayerCard2').src = currentPlayer[1];

    // Show the card images after dealing
    document.getElementById('currentPlayerCard1').style.display = 'inline-block';
    document.getElementById('currentPlayerCard2').style.display = 'inline-block';
    document.getElementById('currentPlayerNewCard').style.display = 'none'; // Hide new card image
}

function displayCurrentPlayerNewCard() {
    // Clear out the currently displayed new card
    document.getElementById('currentPlayerNewCard').src = '';

    // Deal and display the new card
    const newCard = dealOneCard(myDeck);
    document.getElementById('currentPlayerNewCard').src = newCard[0];

    // Show the new card image after dealing
    document.getElementById('currentPlayerNewCard').style.display = 'inline-block';
}