import { defaultComputerPlayer } from "./model/classes/computerPlayer";
import { defaultHumanPlayer } from "./model/classes/humanPlayer";
import { Obstacle } from "./model/classes/obstacle";
import { World } from "./model/classes/world";
import { Health } from "./model/components/health";

const players = [defaultHumanPlayer, defaultComputerPlayer];

const obstacles = [
  new Obstacle(200, 200, 50, 50, new Health(200)),
  new Obstacle(300, 300, 20, 150, new Health(200)),
  new Obstacle(600, 400, 90, 70, new Health(200)),
];

const world = new World();

export const defaultConfig = {
  players,
  obstacles,
  world,
};
