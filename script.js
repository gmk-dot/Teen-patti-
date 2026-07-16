// Players
const players = [
  { name: "You", unseen: [], seen: [], hand: [] },
  { name: "Bot 1", unseen: [], seen: [], hand: [] },
  { name: "Bot 2", unseen: [], seen: [], hand: [] },
  { name: "Bot 3", unseen: [], seen: [], hand: [] }
];

let deck = [];

// Deck Create
function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  deck = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(rank + suit);
    }
  }
}

// Shuffle
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal Cards
function dealCards() {

  // Reset
  players.forEach(p => {
    p.unseen = [];
    p.seen = [];
    p.hand = [];
  });

  // 4 Unseen
  for (let r = 0; r < 4; r++) {
    players.forEach(player => {
      player.unseen.push(deck.pop());
    });
  }

  // 4 Seen
  for (let r = 0; r < 4; r++) {
    players.forEach(player => {
      player.seen.push(deck.pop());
    });
  }

  // 5 Hand
  for (let r = 0; r < 5; r++) {
    players.forEach(player => {
      player.hand.push(deck.pop());
    });
  }

  // Current Turn
let currentPlayer = 0;

// Render Players
function renderPlayers() {

  players.forEach((player, index) => {

    const div = document.getElementById("p" + (index + 1));

    const unseen = div.querySelector(".unseen");
    const seen = div.querySelector(".seen");
    const hand = div.querySelector(".hand");

    unseen.innerHTML = "";
    seen.innerHTML = "";
    hand.innerHTML = "";

    // Unseen
    player.unseen.forEach(() => {
      unseen.innerHTML += `<div class="card back">🂠</div>`;
    });

    // Seen
    player.seen.forEach((card, i) => {

      if(index === 0){
        seen.innerHTML += `<div class="card" onclick="playSeen(${i})">${card}</div>`;
      }else{
        seen.innerHTML += `<div class="card">${card}</div>`;
      }

    });

    // Hand
    player.hand.forEach((card, i) => {

      if(index === 0){
        hand.innerHTML += `<div class="card" onclick="playHand(${i})">${card}</div>`;
      }else{
        hand.innerHTML += `<div class="card back">🂠</div>`;
      }

    });

  });

}

// Start Game
document.getElementById("startGame").onclick = () => {

  createDeck();

  shuffleDeck();

  dealCards();

};
