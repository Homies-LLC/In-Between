
//****************************//
//    initialize variables    //
//****************************//

// create deck
let deck = [];
for (i=0;i<52;i++) {
    deck.push(i);
}
// create ranks
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

// create cardnames
let cardname = [];
for (i=0;i<52;i++) {
    if (i <= 12) {
        cardname.push("Cards DUB/" + JSON.stringify(i+2) + "_of_spades.png");
    }
    else if (i <= 25) {
        cardname.push("Cards DUB/" + JSON.stringify(i + 2 - 13) + "_of_clubs.png");
    }
    else if (i <= 38) {
        cardname.push("Cards DUB/" + JSON.stringify(i + 2 - 13 - 13) + "_of_diamonds.png");
    }
    else if (i <= 51) {
        cardname.push("Cards DUB/" + JSON.stringify(i + 2 - 13 - 13 - 13) + "_of_hearts.png");
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

// wallet, betting and lossing
let walletBalance = 10;
const anteAmount = 1;
const winAmount = 10;
const lossAmount = 5;


//********************//
//    Housekeeping    //
//********************//

// shuffle the deck
shuffle();
// button display settings
hideAllButtons();

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
    //Out of money msg
    if (walletBalance <= 0){
        changeTextBox("You're Out of Money! HA!");
   return;
 }
    //resetting
    clearCards();
    changeTextBox(" ");
    hideAllButtons();
    showHitButton();

    // check if we have enough cards to continue
    if (deck.length <= 2) {
        changeTextBox("Out of cards. New Deck!");
        hideAllButtons()
        resetDeck();
        return null;
    }
   
    //charging the ante amount and display
    walletBalance -= anteAmount;
    displayWallet();

    // draw top card, assign card 1
    let topCard = deck.pop();
    card1[0] = cardname[topCard];
    card1[1] = rank[topCard];
 
    // display card1
    displayCard1()

    // check for ace
    if (card1[1] == 14) {
        // prompt user to choose high or low
        changeTextBox("High or Low?");
        showAHoLButtons();
        return null;
    }
    
    // draw new top card, assign card 2
    topCard = deck.pop();
    card2[0] = cardname[topCard];
    card2[1] = rank[topCard];

    // display card2
    displayCard2();

    // check for pair
    if (card1[1] == card2[1]) {
        changeTextBox("Above or Below?");
        showAoBButtons();
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
        changeTextBox("Please Deal Again");
         
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
    displayCard3();

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
        changeTextBox("You Win!");
        // hide all buttons except deal
        hideAllButtons();
        // Adjust wallet for win
        walletBalance += winAmount;
        displayWallet();
    }
    else {
        // update text
        changeTextBox("You Lose");
        // hide all buttons except deal
     hideAllButtons();
     // Deduct loss amount from the wallet
     walletBalance -= lossAmount;
     displayWallet();
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
     displayCard2();

    // if card2 is 14 (an ace) prompt player "Below", remove hit button and show below button
    if (card2[1] == 14) {
        changeTextBox("Below?");
       hideAllButtons();
        document.getElementById("aoBBButtons").style.display = "block"  
    }

    else {
    
    // prompt player
    changeTextBox(" ");
    hideAllButtons();
    showHitButton();
        
    // unlock the hit function
    waitingForRespose = false;
    cardAlreadyHit = false;
    }
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
    displayCard2();

    // prompt player
    changeTextBox(" ");
    hideAllButtons();
    showHitButton();
    
    
    // unlock the hit function
    waitingForRespose = false;
    cardAlreadyHit = false;
}


//**************************//
//  HTML Element Functions  //
//**************************//


//buttons

function hideAllButtons() {
document.getElementById("aoBBButtons").style.display = "none"
document.getElementById("aoBAButtons").style.display = "none"
document.getElementById("aHoLHButtons").style.display = "none"
document.getElementById("aHoLLButtons").style.display = "none"
document.getElementById("hitButton").style.display = "none"

}

function showAoBButtons() {
document.getElementById("hitButton").style.display = "none"
document.getElementById("aoBAButtons").style.display = "block"
document.getElementById("aoBBButtons").style.display = "block"

}

function showAHoLButtons() {
document.getElementById("hitButton").style.display = "none"
document.getElementById("aHoLHButtons").style.display = "block"
document.getElementById("aHoLLButtons").style.display = "block"

}

function showHitButton() {
document.getElementById("hitButton").style.display = "block"

}

//text box

function changeTextBox(newText) {
    // Get the text box element by its ID
    var textBox = document.getElementById('textBox');

    // Change the text content of the text box
    textBox.textContent = newText;
}


//card images

function clearCards() {
    document.getElementById("imgCard1").src = '';
    document.getElementById("imgCard2").src = '';
    document.getElementById("imgCard3").src = '';
}

function displayCard1() {
    document.getElementById("imgCard1").src = card1[0];
}

function displayCard2() {
    document.getElementById("imgCard2").src = card2[0]
}

function displayCard3() {
    document.getElementById("imgCard3").src = card3[0]
}

//wallet

function displayWallet() {
    document.getElementById('walletDisplay').textContent = `Wallet: $${walletBalance}`;
}