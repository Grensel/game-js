import { MoveDirections } from "./move-directions";
import { ShogunNumberUtility } from "./shogun-number-utility";
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
  #playersPositions = {
    1: null,
    2: null,
  };
  #player1Position = null;
  #player2Position = null;
  /**
   * @type ShogunNumberUtility
   */
  #numberUtility;

  #makeGoogleJump() {
    const newPosition = {
      x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columsCount),
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
  /**
   * Important Player1 must be placed before other player and google
   */
  #placePlayer1ToGrid() {
    const newPosition = {
      x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columsCount),
      y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount),
    };
    if (newPosition.x === this.#player1Position?.x && newPosition.y === this.#player1Position?.y) {
      this.#placePlayer1ToGrid();
      return;
    }
    this.#playersPositions["1"] = newPosition;
  }

  start() {
    this.#status = GameStatuses.inProgress;
    this.#placePlayer1ToGrid();
    this.#makeGoogleJump();
    setInterval(() => {
      this.#makeGoogleJump();
    }, this.#settings.googleJumpInterval);
  }

  constructor(numberUtility) {
    this.#numberUtility = numberUtility;
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
  get player1Position() {
    return this.#playersPositions["1"];
  }
  get gridSize() {
    return this.#settings.gridSize;
  }

  movePlayer(playerNumber, moveDirection) {
    const newPosition = { ...this.#playersPositions[playerNumber] };
    switch (moveDirection) {
      case MoveDirections.UP:
        newPosition.y--;
        break;
      case MoveDirections.DOWN:
        newPosition.y++;
        break;
      case MoveDirections.LEFT:
        newPosition.x--;
        break;
      case MoveDirections.RIGHT:
        newPosition.x++;
        break;
    }
    let isInsideGrid =
      newPosition.x >= 0 &&
      newPosition.x < this.gridSize.columsCount &&
      newPosition.y >= 0 &&
      newPosition.y < this.gridSize.columsCount;
    if (!isInsideGrid) {
      return;
    }
    const isCellFreeFromOtherPlayer = true;
    if (!isCellFreeFromOtherPlayer) {
      return;
    }
    const isGoogleInThisPosition = false;
    if (isGoogleInThisPosition) {
      //this.#cathGoogle(playerNumber)
    }
    this.#playersPositions[playerNumber] = newPosition;
  }
}
