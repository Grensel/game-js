import { GameStatuses } from "../core/types/types.js";

export class View {
  onStart = null;
  onPlayerMove = null;

  constructor() {
    document.addEventListener("keyup", e => {
      console.log(e.code);

      switch (e.code) {
        case "ArrowUp":
          this.onPlayerMove?.(1, "UP");
          break;
        case "ArrowDown":
          this.onPlayerMove?.(1, "DOWN");
          break;
        case "ArrowLeft":
          this.onPlayerMove?.(1, "LEFT");
          break;
        case "ArrowRight":
          this.onPlayerMove?.(1, "RIGHT");
          break;
        default:
          return;
      }
    });
  }

  render(dto) {
    const rootElement = document.getElementById("root");

    rootElement.innerHTML = "";

    rootElement.append("status: " + dto.status);
    if (dto.status === GameStatuses.settings) {
      const settingsComponent = new SettingsComponent({ onStart: this.onStart });
      const settingsElement = settingsComponent.render(dto);
      rootElement.append(settingsElement);
    } else if (dto.status === GameStatuses.inProgress) {
      const gridComponent = new GridComponent({ onPlayerMove: this.onPlayerMove });
      const gridElement = gridComponent.render(dto);
      rootElement.append(gridElement);
    }
  }
}

class SettingsComponent {
  #props;
  constructor(props) {
    this.#props = props;
  }
  render({ dto }) {
    const container = document.createElement("div");
    container.classList.add("container");

    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.append("START GAME");
    button.addEventListener("click", () => {
      this.#props?.onStart?.();
    });
    container.append(button);
    return container;
  }
}

class GridComponent {
  render(dto) {
    const container = document.createElement("table");
    for (let y = 0; y < dto.gridSize.rowsCount; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < dto.gridSize.columnsCount; x++) {
        const cell = document.createElement("td");
        if (dto.player1Position.x === x && dto.player1Position.y === y) {
          cell.textContent = "🏃";
        } else if (dto.googlePosition.x === x && dto.googlePosition.y === y) {
          cell.textContent = "💸";
        } else {
          cell.textContent = "";
        }

        container.append(cell);
      }
      container.append(row);
    }
    return container;
  }
}
