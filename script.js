// ========= GAME ENGINE =========

const TRUMP = "♠";

const SUITS = ["♠","♥","♦","♣"];

const RANKS = [
"A","K","Q","J","10","9","8","7","6","5","4","3","2"
];

let deck = [];

let players = [
{
name:"You",
team:1,
hand:[],
seen:[],
unseen:[],
tricks:0
},
{
name:"Bot 1",
team:2,
hand:[],
seen:[],
unseen:[],
tricks:0
},
{
name:"Bot 2",
team:1,
hand:[],
seen:[],
unseen:[],
tricks:0
},
{
name:"Bot 3",
team:2,
hand:[],
seen:[],
unseen:[],
tricks:0
}
];

let currentPlayer = 0;
let currentTrick = [];
let leadSuit = null;
let trickNumber = 1;

function createDeck(){

deck=[];

for(let suit of SUITS){

for(let rank of RANKS){

deck.push({
rank:rank,
suit:suit
});

}

}

}

function shuffle(){

for(let i=deck.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[deck[i],deck[j]]=[deck[j],deck[i]];

}

}

function startGame(){

    createDeck();

    shuffle();

    dealCards();

}

document
.getElementById("startGame")
.addEventListener("click",startGame);
function dealCards() {

    // Reset
    players.forEach(player => {
        player.unseen = [];
        player.seen = [];
        player.hand = [];
    });

    // 4 Unseen
    for (let i = 0; i < 4; i++) {
        players.forEach(player => {
            player.unseen.push(deck.pop());
        });
    }

    // 4 Seen
    for (let i = 0; i < 4; i++) {
        players.forEach(player => {
            player.seen.push(deck.pop());
        });
    }

    // 5 Hand
    for (let i = 0; i < 5; i++) {
        players.forEach(player => {
            player.hand.push(deck.pop());
        });
    }

    console.log(players);
renderGame();
}
function renderGame() {

    players.forEach((player, index) => {

        const unseen = document.getElementById(`p${index + 1}-unseen`);
        const seen = document.getElementById(`p${index + 1}-seen`);
        const hand = document.getElementById(`p${index + 1}-hand`);

        unseen.innerHTML = "";
        seen.innerHTML = "";
        hand.innerHTML = "";

        // Unseen Cards
        player.unseen.forEach(() => {
            unseen.innerHTML += `<div class="card back">🂠</div>`;
        });

        // Seen Cards
        player.seen.forEach(card => {
            seen.innerHTML += `<div class="card">${card.rank}${card.suit}</div>`;
        });

        // Hand Cards
        
player.hand.forEach((card, cardIndex)=>{

    if(index===0){

        hand.innerHTML += `
        <div class="card" onclick="playCard(${cardIndex})">
        ${card.rank}${card.suit}
        </div>`;

    } else {

        hand.innerHTML += `<div class="card back">🂠</div>`;

    }

});
function playCard(index){

let card = players[0].hand[index];

currentTrick.push({
player:0,
card:card
});

players[0].hand.splice(index,1);

renderGame();

console.log("Played:",card);

botTurn();

}
function botTurn(){

for(let i=1;i<4;i++){

if(players[i].hand.length>0){

let random =
Math.floor(Math.random()*players[i].hand.length);

let card =
players[i].hand[random];


currentTrick.push({
player:i,
card:card
});


players[i].hand.splice(random,1);

}

}

renderGame();

console.log(currentTrick);

}
