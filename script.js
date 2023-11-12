
//****************************//
//    initialize variables    //
//****************************//

// create deck
let deck = [];
for (i=0;i<52;i++) {
    deck.push(i);
}

let rank = [];
for (i=0;i<52;i++) {
    if (i <= 12) {
        rank.push(i+2);
    }
    else if (i <= 25) {
        rank.push(i + 2 - 13);
    }
    else if (i <= 38) {
        rank.push(i + 2 - 13 - 13);
    }
    else if (i <= 51) {
        rank.push(i + 2 - 13 - 13 - 13);
    }
}

let cardname = [];
for (i=0;i<52;i++) {
    if (i <= 12) {
        cardname.push("Cards PNG/" + JSON.stringify(i+2) + "_of_spades.png");
    }
    else if (i <= 25) {
        cardname.push("Cards PNG/" + JSON.stringify(i + 2 - 13) + "_of_clubs.png");
    }
    else if (i <= 38) {
        cardname.push("Cards PNG/" + JSON.stringify(i + 2 - 13 - 13) + "_of_diamonds.png");
    }
    else if (i <= 51) {
        cardname.push("Cards PNG/" + JSON.stringify(i + 2 - 13 - 13 - 13) + "_of_hearts.png");
    }
}

// cards
let card1 = [];
let card2 = [];
let card3 = [];

// bools
let win = false;
let cardAlreadyHit = false;
let choiceIsAbove = false;
let waitingForRespose = false;


//********************//
//    Housekeeping    //
//********************//

// shuffle the deck
shuffle();
// clear card pictures
//document.getElementById("imgCard1").src = '';
//document.getElementById("imgCard2").src = '';
//document.getElementById("imgCard3").src = '';


//*****************//
//    functions    //
//*****************//


function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function resetDeck() {
    deck = [];
    for (i=0;i<52;i++) {
        deck.push(i);
    }
    shuffle();
}

function deal() {

    // check if we have enough cards to continue
    if (deck.length <= 2) {
        // insert message to player here "out of cards, reshuffle."
        resetDeck();
    }
    
    // draw top card, assign card 1
    let topCard = deck.pop();

    card1[0] = cardname[topCard];
    card1[1] = rank[topCard];

    // check for ace
    if (card1[1] == 14) {
        // prompt user to choose high or low
        let isLow = window.confirm("Should the ace be low? Ok = Yes.");
        if (isLow) {
            card1[1] = 1;
        }
    }
    
    // display card1
    document.getElementById("imgCard1").src = card1[0];

    // draw new top card, assign card 2
    topCard = deck.pop();

    card2[0] = cardname[topCard];
    card2[1] = rank[topCard];

    // display card2
    document.getElementById("imgCard2").src = card2[0];

    // update text
    document.getElementById('textBox').textContent = "";

    // clear card 3 image
    document.getElementById("imgCard3").src = '';
    
    if (card1[1] == card2[1]) {
        document.getElementById('textBox').textContent = "above or below?";
        waitingForRespose = true;
    }
    cardAlreadyHit = false;
}

function hit() {
    if (cardAlreadyHit == true) {
        //update text
        document.getElementById('textBox').textContent = "Please deal again"; 
        return null;
    }
    
    if (waitingForRespose == true) {
    return null;
    }

    // draw the top card, assign card3
    let topCard = deck.pop();

    card3[0] = cardname[topCard];
    card3[1] = rank[topCard];

    // display card 3
    document.getElementById("imgCard3").src = card3[0];

    // check for card 1 = card 2
    if (card1[1] == card2[1]) {
        if (choiceIsAbove) {
            win = card3[1] > card1[1];
        } 
        else
            win = card3[1] < card1[1];
    }
    else 
    // evaulate if inBetween
    win = (card3[1] > Math.min(card1[1], card2[1])) && (card3[1] < Math.max(card1[1], card2[1]));
    if (win) {
        // update text
        document.getElementById('textBox').textContent = "You Win!";
    }
    else {
        // update text
        document.getElementById('textBox').textContent = "You Lose";
    }
    cardAlreadyHit = true;
}


function buttonAbove() {
    choiceIsAbove = true;
    hit();
}

function buttonBelow() {
    choiceisAbove = false;
    hit();
}