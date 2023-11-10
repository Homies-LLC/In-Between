    //Deck
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

    //Shuffler
    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

   //Dealing Cards
    function dealTwoCards(deck) {
        return [deck.pop(), deck.pop()];
    }

    function dealOneCard(deck) {
        return [deck.pop()];
    }

    const myDeck = createDeck();
    shuffleDeck(myDeck);

    //Displaying
    function displayCurrentPlayerCards() {
        const currentPlayer = dealTwoCards(myDeck);
        document.getElementById('currentPlayerCard1').src = currentPlayer[0];
        document.getElementById('currentPlayerCard2').src = currentPlayer[1];
    }

    function displayCurrentPlayerNewCard() {
        const newCard = dealOneCard(myDeck);
        document.getElementById('currentPlayerNewCard').src = newCard[0];
    }