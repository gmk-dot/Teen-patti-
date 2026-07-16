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

console.log(deck);

}

document
.getElementById("startGame")
.addEventListener("click",startGame);
