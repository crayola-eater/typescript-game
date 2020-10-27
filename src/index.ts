import { defaultConfig } from "./defaultGame";
import { Game } from "./model/classes/game";

const { world, players, obstacles } = defaultConfig;
const canvas = document.querySelector("canvas")!;

const game = new Game(world, players, obstacles, canvas);
game.play();

// Object.assign(window, { game });
