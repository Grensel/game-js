import { MoveDirections } from "./move-directions.js";
import { GameStatuses } from "./types/types.js";

export class View {
  #callbacks = {};
  constructor() {
    document.addEventListener("keyup", e => {
      switch (e.code) {
        case "ArrowUp":
          this.#callbacks.onMove(1, MoveDirections.UP);
          break;
        case "ArrowDown":
          this.#callbacks.onMove(1, MoveDirections.DOWN);
          break;
        case "ArrowLeft":
          this.#callbacks.onMove(1, MoveDirections.LEFT);
          break;
        case "ArrowRight":
          this.#callbacks.onMove(1, MoveDirections.RIGHT);
          break;
      }
    });
  }
  setCallbacks(callbacks) {
    this.#callbacks = callbacks;
  }
  render(dto) {
    const rootElement = document.getElementById("root");

    rootElement.innerHTML = "";

    if (dto.status === GameStatuses.pending) {
      const startButtonElement = this.#settingScreen();
      rootElement.append(startButtonElement);
    } else if (dto.status === GameStatuses.inProgress) {
      const tableElement = this.#gridScreen(dto);
      rootElement.append(tableElement);
    }
  }

  #settingScreen() {
    const startButtonElement = document.createElement("button");
    startButtonElement.classList.add("btn");
    startButtonElement.append("START");
    startButtonElement.addEventListener("click", () => {
      this.#callbacks.onStart();
    });
    return startButtonElement;
  }
  #gridScreen(dto) {
    const tableElement = document.createElement("table");
    for (let y = 0; y < dto.rowsCount; y++) {
      const rowElement = document.createElement("tr");
      for (let x = 0; x < dto.columnsCount; x++) {
        const cellElement = document.createElement("td");
        if (x === dto.googlePosition.x && y === dto.googlePosition.y) {
          cellElement.append("G_");
        }
        if (x === dto.player1Position.x && y === dto.player1Position.y) {
          cellElement.append("P1_");
        }
        cellElement.append(x, "/", y);
        rowElement.append(cellElement);
      }
      tableElement.append(rowElement);
    }
    return tableElement;
  }
}
