class Player {                  // build a player with an empty hand and a score of zero
    constructor() {
        this.playerHand = [];
        this.playerScore = 0;
    }

    describe() {
        return `Player has ${this.playerHand.length} cards and a score of ${this.playerScore}.`;
    }
}

class Card {                  // define the properties of a card
    constructor(rank, suit, value) {
        this.rank = rank;               // switched to rank after seeing the project in class because I prefer the name to what I was using before
        this.suit = suit;
        this.value = value;
    }

    describe() {
        return `Card is the ${this.value} of ${this.suit}`;  // not sure if I will use this or not, but it's good to have in case
    }
}

class Deck {                    // deck of cards and all of the things you can do with it 
    constructor() { 
        this.deck = [];         // this will be an array of card objects using the below values
        this.rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        this.suit = ["♥", "♦", "♣", "♠"]; 
        this.value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    }

    describe() {
        return `The deck has ${this.deck.length} cards.`;
    }

    buildCards() {
        for (let s = 0; s < this.suit.length; s++) {          // can I do this with for (let rank in ranks) ?  I feel like I could but not sure
            for (let v = 0; v < this.value.length; v++) {
                let rank = this.rank[v];
                let suit = this.suit[s];                      // realized I needed to use the outside loop value
                let value = this.value[v];
                this.deck.push(new Card(rank, suit, value));  //  add each card to the deck array
            }
        }
    }

    shuffleDeck() {
        console.log("Shuffling deck...");
        this.shuffledDeck = [];
        let l = this.deck.length;
        let i;
  
        while (l) {
            i = Math.floor(Math.random() * l--);    // return a random number between 0 and .9999, multiply by the size of the deck minus one, round up
            this.shuffledDeck.push(this.deck[i]);   // push that card to shuffledDeck
            this.deck.splice(i, 1);                 // remove that card from deck - I like the idea that we only have one complete deck at a time
        }
        this.deck = this.shuffledDeck;              // once the deck is empty make it equal to shuffledDeck
    }

    dealCards() {
        console.log("Dealing cards...");
        for (let i = 0; i <= this.deck.length; i = i + 2) {     // i couldn't just split the deck in two, that's not how dealing works!
            if (this.deck[i] !== undefined) {                   // this checks if the deck has any cards in it
                player1.playerHand.push(this.deck[i]);          // push the first card to p1
                player2.playerHand.push(this.deck[i + 1]);      // push the second card to p2
            }
        }
    }

    playWar() {
        console.log("Play War!");
        for (let i = 0; i < player1.playerHand.length; i++) {  // compare the first card of each players hand and so on
            if (player1.playerHand[i].value > player2.playerHand[i].value) {
                player1.playerScore++;
                console.log("Player1 wins this round");
            } else if (player1.playerHand[i].value < player2.playerHand[i].value) {
                player2.playerScore++;
                console.log("Player2 wins this round");
            } else {
                console.log("This round is a tie");          // log result of each round and add score to each player
            }
        }
        console.log(`The final score is:
                      Ties: ${26 - player1.playerScore - player2.playerScore} 
                      Player1: ${player1.playerScore}
                      Player2: ${player2.playerScore}`);     // log score to console
        if (player1.playerScore > player2.playerScore) {
            console.log("Player1 Wins!");                    // log winner if p1
            alert(`The final score is:
            Ties: ${26 - player1.playerScore - player2.playerScore} 
            Player1: ${player1.playerScore}
            Player2: ${player2.playerScore}
            Player1 Wins!`);                                 // Alert p1 win
        } else if (player2.playerScore > player1.playerScore) {
            console.log("Player2 Wins!");                    // log winner if p2
            alert(`The final score is:
            Ties: ${26 - player1.playerScore - player2.playerScore} 
            Player1: ${player1.playerScore}
            Player2: ${player2.playerScore}
            Player2 Wins!`);                                 // Alert p2 win
        } else {
            console.log("It's a Tie!");                      // log tie if scores match
            alert(`The final score is:
            Ties: ${26 - player1.playerScore - player2.playerScore} 
            Player1: ${player1.playerScore}
            Player2: ${player2.playerScore}
            It's a Tie!`);                                   // Alert tie if scores match
        }

    }
}


let player1 = new Player();
let player2 = new Player();
let newDeck = new Deck();

newDeck.buildCards();
newDeck.shuffleDeck();
newDeck.dealCards();
newDeck.playWar();