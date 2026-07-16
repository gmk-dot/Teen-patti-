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
