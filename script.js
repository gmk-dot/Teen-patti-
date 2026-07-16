let gamePhase="deal";

let highestBid=0;
let bidWinner=null;

let trump=null;const suits=["♠","♥","♦","♣"];

const ranks=[
"A","K","Q","J",
"10","9","8","7",
"6","5","4","3","2"
];

let deck=[];
let players=[
[],
[],
[],
[]
];


function startGame(){

createDeck();
shuffle();
deal();

}


function createDeck(){

deck=[];

for(let s of suits){

for(let r of ranks){

deck.push({
rank:r,
suit:s
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


function deal(){

players=[
[],
[],
[],
[]
];

for(let i=0;i<5;i++){

for(let p=0;p<4;p++){

players[p].push(deck.pop());

}

}

gamePhase="bidding";

showBidding();

}



render();

}


function render(){

for(let p=0;p<4;p++){

let box=document.getElementById(
p==0?"you":
"bot"+p
);

box.innerHTML="";


players[p].forEach((card,index)=>{


if(p==0){

box.innerHTML+=`
<div class="card"
onclick="play(${index})">
${card.rank}${card.suit}
</div>`;

}

else{

box.innerHTML+=`
<div class="card back">
🂠
</div>`;

}


});


}

}


function play(index){

let card=players[0][index];

alert(
"You played "+card.rank+card.suit
);

players[0].splice(index,1);

render();

}
function showBidding(){

document.getElementById("bidding").innerHTML=`

<h3>Place Your Bid</h3>

<button onclick="bid(14)">14</button>
<button onclick="bid(15)">15</button>
<button onclick="bid(16)">16</button>
<button onclick="bid(17)">17</button>
<button onclick="bid(18)">18</button>

`;

}
function bid(value){

if(value>highestBid){

highestBid=value;
bidWinner=0;

alert(
"You won bid: "+value
);

showTrump();

}

}
function showTrump(){

document.getElementById("bidding").innerHTML=`

<h3>Select Trump</h3>

<button onclick="selectTrump('♣')">♣ Club</button>

<button onclick="selectTrump('♠')">♠ Spade</button>

<button onclick="selectTrump('♦')">♦ Diamond</button>

<button onclick="selectTrump('♥')">♥ Heart</button>

`;

}
function selectTrump(card){

trump=card;

document.getElementById("bidding").innerHTML=
`
<h2>
इस राउंड का हुकुम ${trump} है!
</h2>
`;

console.log(
"Trump:",trump
);

}
