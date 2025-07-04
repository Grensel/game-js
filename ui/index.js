import { Game } from "../core/game.js";
import { ShogunNumberUtility } from "../core/shogun-number-utility.js";
import { Controller } from "./controller.js";
import { View } from "./view.js";

const view = new View();

const numberUtil = new ShogunNumberUtility();
const game = new Game(numberUtil);

const controller = new Controller(view, game);
controller.init();
