import { Game } from "./game.js";
import { ShogunNumberUtility } from "./shogun-number-utility.js";

export class Controller {
  constructor(view) {
    const randomUtil = new ShogunNumberUtility();
    this.model = new Game(randomUtil, {
      onChange: () => {
        this.#renderView();
      },
    });
    this.view = view;
    this.view.setCallbacks({
      onStart: () => {
        this.#start();
      },
      onMove: (playerNumber, direction) => {
        this.model.movePlayer(playerNumber, direction);
      },
    });
    this.#renderView();
  }
  #start() {
    this.model.start();
  }
  #renderView() {
    this.view.render({
      status: this.model.status,
      rowsCount: this.model.gridSize.rowsCount,
      columnsCount: this.model.gridSize.columsCount,
      googlePosition: this.model.googlePosition,
      player1Position: this.model.player1Position,
    });
  }
}
