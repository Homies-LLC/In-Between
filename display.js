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