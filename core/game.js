export class Game {
  #settings;
  #status = "pending";

  async start() {
    if (this.#status === "pending") {
      this.#status = "in-progress";
    }
  }

  set settings(settings) {
    this.#settings = settings;
  }

  get settings() {
    return this.#settings;
  }
  get status() {
    return this.#status;
  }
}
