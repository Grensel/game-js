import { Game } from "../game";
import { MoveDirections } from "../move-directions";
import { ShogunNumberUtility } from "../shogun-number-utility";
import { GameStatuses } from "../types/types";

describe("game", () => {
  it("should have Pending status after creating", () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);
    expect(game.status).toBe(GameStatuses.pending);
  });
  it("should have inProgres status after start", () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);
    game.start();
    expect(game.status).toBe(GameStatuses.inProgress);
  });
  it("google should be on the Grid after start", () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);
    game.start();
    expect(game.googlePosition.x).toBeLessThan(game.gridSize.columsCount);
    expect(game.googlePosition.x).toBeGreaterThanOrEqual(0);
    expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount);
    expect(game.googlePosition.y).toBeGreaterThanOrEqual(0);
  });
  it("google should be in the Grid but in new position after jump", async () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);
    game.googleJumpInterval = 10;
    game.start();

    for (let i = 0; i < 100; i++) {
      const prevGooglePosition = game.googlePosition;
      await delay(10);
      const currentGooglePosition = game.googlePosition;
      expect(prevGooglePosition).not.toEqual(currentGooglePosition);
    }
  });
  it("players should be on the grid after start", () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);
    game.start();
    expect(game.player1Position.x).toBeGreaterThanOrEqual(0);
    expect(game.player1Position.x).toBeLessThan(game.gridSize.columsCount);
    expect(game.player1Position.y).toBeGreaterThanOrEqual(0);
    expect(game.player1Position.y).toBeLessThan(game.gridSize.rowsCount);
  });

  it("player should be in the Grid after start", async () => {
    const numberUtil = new ShogunNumberUtility();

    for (let i = 0; i < 100; i++) {
      const game = new Game(numberUtil);

      expect(game.player1Position).toBeNull();

      game.start();

      expect(game.player1Position.x).toBeLessThan(game.gridSize.columsCount);
      expect(game.player1Position.x).toBeGreaterThanOrEqual(0);
      expect(game.player1Position.y).toBeLessThan(game.gridSize.rowsCount);
      expect(game.player1Position.y).toBeGreaterThanOrEqual(0);
    }
  });
  it("player should be move in correct direction", () => {
    //composition root
    const FakenumberUtility = {
      _callCounter: 0,
      returnValues: [3, 3, 2, 2],
      getRandomIntegerNumber() {
        const returnValue = this.returnValues[this._callCounter];
        if (returnValue === undefined) throw new Error("set more values for test");
        this._callCounter++;
        return returnValue;
      },
    };
    const game = new Game(FakenumberUtility);
    game.start();
    expect(game.player1Position).toEqual({ x: 3, y: 3 });
    game.movePlayer(1, MoveDirections.RIGHT);
    expect(game.player1Position).toEqual({ x: 3, y: 3 });
    game.movePlayer(1, MoveDirections.DOWN);
    expect(game.player1Position).toEqual({ x: 3, y: 3 });
    game.movePlayer(1, MoveDirections.UP);
    expect(game.player1Position).toEqual({ x: 3, y: 2 });
    game.movePlayer(1, MoveDirections.LEFT);
    expect(game.player1Position).toEqual({ x: 2, y: 2 });
    game.movePlayer(1, MoveDirections.LEFT);
    expect(game.player1Position).toEqual({ x: 1, y: 2 });
    game.movePlayer(1, MoveDirections.LEFT);
    expect(game.player1Position).toEqual({ x: 0, y: 2 });
    game.movePlayer(1, MoveDirections.LEFT);
    expect(game.player1Position).toEqual({ x: 0, y: 2 });
    game.movePlayer(1, MoveDirections.UP);
    expect(game.player1Position).toEqual({ x: 0, y: 1 });
    game.movePlayer(1, MoveDirections.UP);
    expect(game.player1Position).toEqual({ x: 0, y: 0 });
    game.movePlayer(1, MoveDirections.UP);
    expect(game.player1Position).toEqual({ x: 0, y: 0 });
  });
});
const delay = ms => new Promise(res => setTimeout(res, ms));
