import { Game } from "../game";
import { GameStatuses } from "../types/types";

describe("game", () => {
  it("should have Pending status after creating", () => {
    const game = new Game();
    expect(game.status).toBe(GameStatuses.pending);
  });
  it("should have inProgres status after start", () => {
    const game = new Game();
    game.start();
    expect(game.status).toBe(GameStatuses.inProgress);
  });
  it("should have inProgres status after start", () => {
    const game = new Game();
    game.start();
    expect(game.status).toBe(GameStatuses.inProgress);
  });
  it("google should be on the Grid after start", () => {
    const game = new Game();
    game.start();
    expect(game.googlePosition.x).toBeLessThan(game.gridSize.columsCount);
    expect(game.googlePosition.x).toBeGreaterThanOrEqual(0);
    expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount);
    expect(game.googlePosition.y).toBeGreaterThanOrEqual(0);
  });
  it("google should be on the Grid but in new position after jump", async () => {
    const game = new Game();
    game.googleJumpInterval = 1;
    game.start();
    for (let i = 0; i < 100; i++) {
      const prevGooglePosition = game.googlePosition;
      await delay(1);
      const currentGooglePosition = game.googlePosition;
      expect(prevGooglePosition).not.toEqual(currentGooglePosition);
    }
  });
});
const delay = ms => new Promise(res => setTimeout(res, ms));
