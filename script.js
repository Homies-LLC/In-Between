
//****************************//
//    initialize variables    //
//****************************//

// create deck
let deck = [];
for (i=0;i<52;i++) {
    deck.push(i);
}
//create ranks
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

//create cardnames
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


//*****************//
//    Game Logic   //
//*****************//

// Function that shuffles the deck
// (This fuction MUST be called in the JS before dealing)
function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function that resets the deck (when out of cards) on 'deal'
function resetDeck() {
    deck = [];
    for (i=0;i<52;i++) {
        deck.push(i);
    }
    shuffle();
}

// The dealing function (deals two cards and checks for ace, if ace, it stops.)
function deal() {

    // clear all card images
    document.getElementById("imgCard1").src = '';
    document.getElementById("imgCard2").src = '';
    document.getElementById("imgCard3").src = '';

    // update text
    document.getElementById('textBox').textContent = "";

    // check if we have enough cards to continue
    if (deck.length <= 2) {
        document.getElementById('textBox').textContent = "Out of cards. New Deck!"
        resetDeck();
        return null;
    }
    
    // draw top card, assign card 1
    let topCard = deck.pop();
    card1[0] = cardname[topCard];
    card1[1] = rank[topCard];
 
    // display card1
    document.getElementById("imgCard1").src = card1[0];

    // check for ace
    if (card1[1] == 14) {
        // prompt user to choose high or low
        document.getElementById('textBox').textContent = "High or Low"
        return null;
    }
    
    // draw new top card, assign card 2
    topCard = deck.pop();
    card2[0] = cardname[topCard];
    card2[1] = rank[topCard];

    // display card2
    document.getElementById("imgCard2").src = card2[0];

    // check for pair
    if (card1[1] == card2[1]) {
        document.getElementById('textBox').textContent = "above or below?";
        // this will stop the player from hitting
        waitingForRespose = true;
    }

    // this will allow the hit function to execute 
    cardAlreadyHit = false;
}

// Function to deal the 3rd card, determine if you win or lose
function hit() {

    // check if player has already hit on the cards, exit function if true
    if (cardAlreadyHit == true) {
        //update text
        document.getElementById('textBox').textContent = "Please deal again"; 
        return null;
    }
    
    // check if the player needs to give more info (ace high/low, hit above/below) exit if true
    if (waitingForRespose == true) {
    return null;
    }

    // draw the top card, assign card3
    let topCard = deck.pop();
    card3[0] = cardname[topCard];
    card3[1] = rank[topCard];

    // display card 3
    document.getElementById("imgCard3").src = card3[0];

    // check for card 1 = card 2, determine if player wins above/below
    if (card1[1] == card2[1]) {
        if (choiceIsAbove) {
            win = card3[1] > card1[1];
        } 
        else
            win = card3[1] < card1[1];
    }
    else 

    // evaulate if player wins inBetween
    win = (card3[1] > Math.min(card1[1], card2[1])) && (card3[1] < Math.max(card1[1], card2[1]));
    if (win) {
        // update text
        document.getElementById('textBox').textContent = "You Win!";
    }
    else {
        // update text
        document.getElementById('textBox').textContent = "You Lose";
    }

    // locks hit function from being called again until deal is called
    cardAlreadyHit = true;
}


//**********************//
//    Player Response   //
//**********************//

// player response, above or below? Above
function pr_AoB_A() {

    // unlock the hit function
    waitingForRespose = false;

    // logic needed to determine win/loss
    choiceIsAbove = true;

    // call the hit function
    hit();
}

// player response, above or below? Below
function pr_AoB_B() {

    // unlock the hit function
    waitingForRespose = false;

    // logic needed to determine win/loss
    choiceIsAbove = false;

    // call the hit function
    hit();
}

// player response, ace high or low? High
function pr_AHoL_H() {

    // draw a top card off the deck, assign card 2 its values
    let topCard = deck.pop();
    card2[0] = cardname[topCard];
    card2[1] = rank[topCard];
    
    // display card 2
    document.getElementById("imgCard2").src = card2[0]
    
    // prompt player
    document.getElementById('textBox').textContent = "Hit?"

    // unlock the hit function
    waitingForRespose = false;
}

// player response, ace high or low? Low
function pr_AHoL_L() {

    // draw a top card off the deck, assign card 2 its values
    let topCard = deck.pop();
    card2[0] = cardname[topCard];
    card2[1] = rank[topCard];
    
    // Ace is now low, needed to determine player win/lose
    card1[1] = 1;

    // display card 2
    document.getElementById("imgCard2").src = card2[0]

    // prompt player
    document.getElementById('textBox').textContent = "Hit?"
    
    // unlock the hit function
    waitingForRespose = false;
}