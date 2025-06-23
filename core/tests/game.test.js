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
      getRandomIntegerNumber() {
        return 2;
      },
    };
    const game = new Game(fakeNumberUtil);
    game.gridSize = { columnsCount: 3, rowsCount: 3 };
    game.start();

    expect(game.player1Position).toEqual({ x: 2, y: 2 });
  });
});

const delay = ms => new Promise(res => setTimeout(res, ms));
