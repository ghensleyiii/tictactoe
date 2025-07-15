import Store from "./store.js";
import View from "./view.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "green",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "blue",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  window.addEventListener("storage", () => {
    console.log("State changed in another tab");
    view.render(store.game, store.stats);
  });

  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
    view.render(store.game, store.stats);
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    view.render(store.game, store.stats);
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // Advance the game state with the player's move
    store.playerMove(+square.id);

    view.render(store.game, store.stats);
  });
}

window.addEventListener("load", init);
