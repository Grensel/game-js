import { Game } from "./game";

it("init test", () => {
  const game = new Game();

  game.settings = {
    gridSize: {
      x: 4,
      y: 5,
    },
  };

  expect(game.settings.gridSize.x).toBe(4);
  expect(game.settings.gridSize.y).toBe(5);
});

it("start game", async () => {
  const game = new Game();
  game.settings = {
    gridSize: {
      x: 4,
      y: 5,
    },
  };

  expect(game.status).toBe("pending");
  await game.start();
  expect(game.status).toBe("in-progress");
});
