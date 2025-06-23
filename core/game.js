import { GameStatuses, GridSize } from "./types/types";

export class Game {
  #status = GameStatuses.settings;
  #googlePosition = null;
  #player1Position = null;
  #numberUtility; // = new ShogunNumberUtility()
  #settings = {
    GridSize: new GridSize(4, 4),
    googleJumpInterval: 1000,
  };

  constructor(somethingSimilarToNumberUtility) {
    this.#numberUtility = somethingSimilarToNumberUtility;
  }

  start() {
    if (this.#status !== GameStatuses.settings) {
      throw new Error("Game must be Setting before Start");
    }
    this.#status = GameStatuses.inProgress;

    this.#makeGoogleJump();
    this.#placePlayer1ToGrid();

    setInterval(() => {
      this.#makeGoogleJump();
    }, this.#settings.googleJumpInterval);
  }

  #makeGoogleJump() {
    const newPosition = {
      x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.GridSize.columnsCount),
      y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.GridSize.rowsCount),
    };
    if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
      this.#makeGoogleJump();
      return;
    }
    this.#googlePosition = newPosition;
  }

  get googlePosition() {
    return this.#googlePosition;
  }

  #placePlayer1ToGrid() {
    const newPosition = {
      x: this.#numberUtility.getRandomIntegerNumber(2, this.#settings.GridSize.columnsCount),
      y: this.#numberUtility.getRandomIntegerNumber(2, this.#settings.GridSize.rowsCount),
    };
    this.#player1Position = newPosition;
  }

  get player1Position() {
    return this.#player1Position;
  }

  //JSDoc
  /**
   * Set the grid size for the game
   * @param {GridSize} value - The new grid size to set
   */

  set gridSize(value) {
    return (this.#settings.GridSize = value);
  }

  get gridSize() {
    return this.#settings.GridSize;
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
  }

  get status() {
    return this.#status;
  }
}
