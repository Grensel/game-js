import { GameStatuses, GridSize } from "./types/types.js";

export class Game {
  #status = GameStatuses.settings;
  #googlePosition = null;
  #player1Position = null;
  #player2Position = null;
  #numberUtility; // = new ShogunNumberUtility()
  #settings = {
    gridSize: new GridSize(4, 4),
    googleJumpInterval: 1000,
  };

  #observers = [];

  constructor(somethingSimilarToNumberUtility) {
    this.#numberUtility = somethingSimilarToNumberUtility;
  }

  subscribe(observer) {
    this.#observers.push(observer);
  }

  #notify() {
    this.#observers.forEach(o => o());
  }

  start() {
    if (this.#status !== GameStatuses.settings) {
      throw new Error("Game must be Setting before Start");
    }
    this.#status = GameStatuses.inProgress;

    this.#placePlayer1ToGrid();
    this.#makeGoogleJump();

    this.#notify();

    setInterval(() => {
      this.#makeGoogleJump();
      this.#notify();
    }, this.#settings.googleJumpInterval);
  }

  #placePlayer1ToGrid() {
    const newPosition = {
      x: this.#numberUtility.getRandomIntegerNumber(1, this.#settings.gridSize.columnsCount),
      y: this.#numberUtility.getRandomIntegerNumber(1, this.#settings.gridSize.rowsCount),
    };
    this.#player1Position = newPosition;
  }

  get player1Position() {
    return this.#player1Position;
  }

  #makeGoogleJump() {
    const newPosition = {
      x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnsCount),
      y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount),
    };
    if (
      (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) ||
      (newPosition.x === this.#player1Position?.x && newPosition.y === this.player1Position?.y)
    ) {
      this.#makeGoogleJump();
      return;
    }
    this.#googlePosition = newPosition;
  }

  get googlePosition() {
    return this.#googlePosition;
  }

  // todo: movedirection to constants
  movePlayer(playerNumber, moveDirection) {
    const position = this["player" + playerNumber + "Position"];
    let newPosition;
    switch (moveDirection) {
      case "UP": {
        newPosition = {
          x: position.x,
          y: position.y - 1,
        };
        break;
      }
      case "DOWN": {
        newPosition = {
          x: position.x,
          y: position.y + 1,
        };
        break;
      }
      case "LEFT": {
        newPosition = {
          x: position.x - 1,
          y: position.y,
        };
        break;
      }
      case "RIGHT": {
        newPosition = {
          x: position.x + 1,
          y: position.y,
        };
        break;
      }
    }
    if (
      newPosition.x >= this.gridSize.columnsCount ||
      newPosition.x < 0 ||
      newPosition.y >= this.gridSize.rowsCount ||
      newPosition.y < 0
    ) {
      return;
    }
    // this["#position.player" + playerNumber] = newPosition;
    this.#player1Position = newPosition;
    this.#notify();
  }

  //JSDoc
  /**
   * Set the grid size for the game
   * @param {GridSize} value - The new grid size to set
   */

  set gridSize(value) {
    this.#settings.gridSize = value;
    this.#notify();
  }

  get gridSize() {
    return this.#settings.gridSize;
  }

  /**
   * Sets the Google Jump Interval.
   *
   * @param {number} newValue - The new interval value to be set.
   * @throws {TypeError} If the provided value is not a number.
   * @throws {RangeError} If the provided value is less than or equal to 0.
   *
   * This method updates the internal settings for the Google Jump Interval.
   * The value must be a positive number; otherwise, it throws an error.
   */

  set googleJumpInterval(newValue) {
    if (typeof newValue !== "number") {
      throw new TypeError("Arguments must be numbers");
    }
    if (newValue <= 0) {
      throw new RangeError("Interval must be numbers");
    }
    this.#settings.googleJumpInterval = newValue;
    this.#notify();
  }

  get status() {
    return this.#status;
  }
}
