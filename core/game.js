import { ShougunNumberUtility } from "./shougun-number-utility";
import { GameStatuses } from "./types/types";

export class Game {
  #settings = {
    gridSize: {
      columsCount: 4, //Hard code
      rowsCount: 4, //Hard code
    },
    googleJumpInterval: 1000,
  };
  #status = GameStatuses.pending;

  #googlePosition = null;
  #numberUtility;

  #makeGoogleJump() {
    const newPosition = {
      x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.columsCount),
      y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.rowsCount),
    };
    if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
      this.#makeGoogleJump();
      return;
    }
    this.#googlePosition = newPosition;
  }

  constructor() {
    this.#numberUtility = new ShougunNumberUtility();
  }
  set googleJumpInterval(value) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error();
    }
    this.#settings.googleJumpInterval = value;
  }
  get status() {
    return this.#status;
  }
  get googlePosition() {
    return this.#googlePosition;
  }
  get gridSize() {
    return this.#settings.gridSize;
  }
  start() {
    this.#status = GameStatuses.inProgress;
    this.#googlePosition = {
      x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.columsCount),
      y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.rowsCount),
    };
    setInterval(() => {
      this.#makeGoogleJump();
    }, this.#settings.googleJumpInterval);
  }
}
