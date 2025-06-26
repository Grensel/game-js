export class Controller {
  #view;
  #model;
  #render() {
    const dto = {
      status: this.#model.status,
      gridSize: this.#model.gridSize,
      googlePosition: this.#model.googlePosition,
      player1Position: this.#model.player1Position,
      player2Position: this.#model.player2Position,
    };
    this.#view.render(dto);
  }
  constructor(view, model) {
    this.#view = view;
    this.#model = model;

    this.#model.subscribe(() => {
      this.#render();
    });

    this.#model.subscribe(() => {
      console.log("state of game changed");
    });

    this.#view.onPlayerMove = (playerNumber, direction) => {
      this.#model.movePlayer(playerNumber, direction);
    };

    this.#view.onStart = () => {
      this.#model.start();
    };
  }
  init() {
    this.#render();
  }
}
