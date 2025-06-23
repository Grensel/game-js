export const GameStatuses = {
  settings: "SETTINGS",
  inProgress: "IN-PROGRESS",
  win: "WIN",
  lose: "LOSE",
};

export class GridSize {
  constructor(rowsCount = 4, columnsCount = 4) {
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
  }
}
