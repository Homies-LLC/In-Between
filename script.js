
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
let choiceIsAbove = false;
let post = false;
let postPair = false;

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
    theGreatReset();

    // check if we have enough cards to continue
    if (deck.length <= 2) {
        changeTextBox("Out of cards. New Deck!");
        hideAllButtons();
        resetDeck();
        return null;
    }
   
    //charging the ante amount and display
    chargeAnte();

    // draw card1 and display card1
    drawCard1();
    changeTextBox("In Between?");

    // check for ace
    if (card1[1] == 14) {
        // prompt user to choose high or low
        changeTextBox("High or Low?");
        showAHoLButtons();
        return null;
    }
    
    //draw card2 and display card2
    drawCard2();

    // check for pair
    if (card1[1] == card2[1]) {
        changeTextBox("Above or Below?");
        showAoBButtons();

    }

}

// Function to deal the 3rd card, determine if you win or lose
function hit() {

    drawCard3();
    
    checkAboveBelow();
    checkInBetween();
    checkAcePosts();
    checkPosts();

    updateWallet();

    hideAllButtons();
    
}


//**********************//
//    Player Response   //
//**********************//

// player response, above or below? Above
function pr_AoB_A() {



    // logic needed to determine win/loss
    choiceIsAbove = true;

    // call the hit function
    hit();
}

// player response, above or below? Below
function pr_AoB_B() {



    // logic needed to determine win/loss
    choiceIsAbove = false;

    // call the hit function
    hit();
}

// player response, ace high or low? High
function pr_AHoL_H() {

    
    // draw card2 and display card 2
     drawCard2();

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
    changeTextBox("In Between?");
        
 

    }
}

// player response, ace high or low? Low
function pr_AHoL_L() {

    // Ace is now low, needed to determine player win/lose
    card1[1] = 1;

    // draw card2 display card2
    drawCard2();

    // prompt player
    changeTextBox(" ");
    hideAllButtons();
    showHitButton();
    changeTextBox("In Between?");
    

}


//**************************//
//  CHECKS                  //
//**************************//

// check for card 1 = card 2, determine if player wins above/below
function checkAboveBelow() {
    if (card1[1] == card2[1]) {
        if (choiceIsAbove == true) {
            win = card3[1] > card1[1];
        } 
        if (choiceIsAbove == false) {
            win = card3[1] < card1[1];
        }
    }
}


function checkInBetween() {
    if (card1[1] != card2[1]) {
        win = (card3[1] > Math.min(card1[1], card2[1])) && (card3[1] < Math.max(card1[1], card2[1]));
    }
}

function checkPosts() {
    // check for regular posting
    if ( card3[1] == card1[1] || card3[1] == card2[1] ) {
        // check for post pairs
        if ( card1[1] == card2[1] ) {
            postPair = true;

            changeTextBox("You Posted, PAY T̵̨̗̻̫̰̠̬͎̦̭͉̜̱́̍͋̕R̴̘̥͔͕͈̻͈̝̯̱͊̆̍̇̂̿̾̐͘͜Į̵̧̣̲͈̞͍̟͐̅͘ͅP̶̗̿L̷̥͕̍̾̑̉̽̍̋̊̀̈̿Ȩ̵̡̠̗̠̙̹̀̎́̎͊̈́̅̄̑!");

        }
        else {
            post = true;
            changeTextBox("You Posted, PAY DOUBLE");
        }
    }
}

function checkAcePosts() {
    // card 3 is an ace?
    if (card3[1] == 14) {
        // check for an ace post
        if ( (card1[1] == 1 || card1[1] == 14) || (card2[1] == 14) ) {
            // check for a pair of aces
            if ((card1[1] == 1 || card1[1] == 14) && card2[1] == 14) {
                postPair = true;
            }
            else {
                post = true;
            }
        }
    }
}

//**************************//
//  MONEY                   //
//**************************//

function updateWallet() {
    if (win == true) {
        walletBalance += winAmount;
        changeTextBox("You Win!");
    }
    if (win == false) {
        if (post == true) {
            walletBalance -= lossAmount * 2;
            changeTextBox("You Posted, PAY DOUBLE");
        }
        else if (postPair == true) {
            walletBalance -= lossAmount * 3;


            changeTextBox("You Posted, PAY T̵̨̗̻̫̰̠̬͎̦̭͉̜̱́̍͋̕R̴̘̥͔͕͈̻͈̝̯̱͊̆̍̇̂̿̾̐͘͜Į̵̧̣̲͈̞͍̟͐̅͘ͅP̶̗̿L̷̥͕̍̾̑̉̽̍̋̊̀̈̿Ȩ̵̡̠̗̠̙̹̀̎́̎͊̈́̅̄̑!");


        }
        else if (post == false && postPair == false) {
            walletBalance -= lossAmount;
            changeTextBox("You Lose");
        }
    }
        // display wallet
        document.getElementById('walletDisplay').textContent = `Wallet: $${walletBalance}`;
}


function chargeAnte() {
    walletBalance -= anteAmount
    document.getElementById('walletDisplay').textContent = `Wallet: $${walletBalance}`;
}




//**************************//
//  DISPLAY & CARD DRAW     //
//**************************//

function drawCard1() {
    let topCard = deck.pop();
    card1[0] = cardname[topCard];
    card1[1] = rank[topCard];
    document.getElementById("imgCard1").src = card1[0];
}
function drawCard2() {
    topCard = deck.pop();
    card2[0] = cardname[topCard];
    card2[1] = rank[topCard];
    document.getElementById("imgCard2").src = card2[0]
}
function drawCard3() {
    let topCard = deck.pop();
    card3[0] = cardname[topCard];
    card3[1] = rank[topCard];
    document.getElementById("imgCard3").src = card3[0]
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

    
//**************************//
//  RESETTING               //
//**************************//

// the great reset
function theGreatReset() {
    clearCards();
    changeTextBox("  ");
    hideAllButtons();
    showHitButton();
    clearBools();
}

// card images
function clearCards() {
    document.getElementById("imgCard1").src = '';
    document.getElementById("imgCard2").src = '';
    document.getElementById("imgCard3").src = '';
}

// bools
function clearBools() {
    win = false;
    choiceIsAbove = false;
    post = false;
    postPair = false;
}