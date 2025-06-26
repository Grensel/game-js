import { ShogunNumberUtility } from "../shogun-number-utility";
import { Game } from "../game";
import { GameStatuses } from "../types/types";

describe("game", () => {
  it("game shouid be created and return status", () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);

    expect(game.status).toBe(GameStatuses.settings);
  });

  it("game should be started", async () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);

    await game.start();

    expect(game.status).toBe(GameStatuses.inProgress);
  });

  it("google should be in the Grid after start", async () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);

    expect(game.googlePosition).toBeNull();

    await game.start();

    expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnsCount);
    expect(game.googlePosition.x).toBeGreaterThanOrEqual(0);
    expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount);
    expect(game.googlePosition.y).toBeGreaterThanOrEqual(0);
  });

  it("google should be in the Grid but in new position after jump", async () => {
    const numberUtil = new ShogunNumberUtility();
    const game = new Game(numberUtil);
    game.googleJumpInterval = 1;
    game.start();

    for (let i = 0; i < 100; i++) {
      const prevGooglePosition = game.googlePosition;
      await delay(1);
      const currentGooglePosition = game.googlePosition;
      expect(prevGooglePosition).not.toEqual(currentGooglePosition);
    }
  });

  it("player should be in the Grid after start", async () => {
    const numberUtil = new ShogunNumberUtility();

    for (let i = 0; i < 100; i++) {
      const game = new Game(numberUtil);

      expect(game.player1Position).toBeNull();

      await game.start();

      expect(game.player1Position.x).toBeLessThan(game.gridSize.columnsCount);
      expect(game.player1Position.x).toBeGreaterThanOrEqual(0);
      expect(game.player1Position.y).toBeLessThan(game.gridSize.rowsCount);
      expect(game.player1Position.y).toBeGreaterThanOrEqual(0);
    }
  });

  it("player should be move in correct direction", async () => {
    const fakeNumberUtil = {
      *numberGenerator() {
        yield 2;
        yield 2;
        yield 1;
        yield 2;
        yield 0;
        yield 0;
        while (true) {
          yield 0;
        }
      },
      iterator: null,
      getRandomIntegerNumber(from, to) {
        if (!this.iterator) {
          this.iterator = this.numberGenerator();
        }
        return this.iterator.next().value;
      },
    };
    const game = new Game(fakeNumberUtil);
    game.gridSize = { columnsCount: 3, rowsCount: 3 };
    game.start();

    expect(game.player1Position).toEqual({ x: 2, y: 2 });

    game.movePlayer(1, "RIGHT");
    expect(game.player1Position).toEqual({ x: 2, y: 2 });
    game.movePlayer(1, "DOWN");
    expect(game.player1Position).toEqual({ x: 2, y: 2 });
    game.movePlayer(1, "UP");
    expect(game.player1Position).toEqual({ x: 2, y: 1 });
    game.movePlayer(1, "LEFT");
    expect(game.player1Position).toEqual({ x: 1, y: 1 });
    game.movePlayer(1, "UP");
    expect(game.player1Position).toEqual({ x: 1, y: 0 });
    game.movePlayer(1, "UP");
    expect(game.player1Position).toEqual({ x: 1, y: 0 });
    game.movePlayer(1, "LEFT");
    expect(game.player1Position).toEqual({ x: 0, y: 0 });
    game.movePlayer(1, "LEFT");
    expect(game.player1Position).toEqual({ x: 0, y: 0 });
    game.movePlayer(1, "DOWN");
    expect(game.player1Position).toEqual({ x: 0, y: 1 });
    game.movePlayer(1, "RIGHT");
    expect(game.player1Position).toEqual({ x: 1, y: 1 });
  });
});

const delay = ms => new Promise(res => setTimeout(res, ms));
