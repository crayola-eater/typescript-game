import { ComputerPlayer } from "./model/classes/computerPlayer";
import { HumanPlayer } from "./model/classes/humanPlayer";
import { Obstacle } from "./model/classes/obstacle";
import { World } from "./model/classes/world";
import { Health } from "./model/components/health";
import { Shooter } from "./model/components/shooter";
import { Player } from "./model/components/player";
import { Controls } from "./model/components/controls";

const bigGuy = new ComputerPlayer(
  { name: "big_guy1954 (🖥️)", colour: "purple" },
  300,
  300,
  new Health(400),
  new Shooter()
);

const strangeOne = new ComputerPlayer(
  { name: "strangeOne45 (🖥️)", colour: "red" },
  300,
  50,
  new Health(50),
  new Shooter(),
  20,
  20
);

const mainComputer = new ComputerPlayer(
  { name: "0101010101 (🖥️)", colour: "navy" },
  400,
  200,
  new Health(100),
  new Shooter()
);

const humanPlayer = new HumanPlayer(
  { name: "You (🎮)", colour: "olive" },
  0,
  400,
  new Health(200),
  new Controls(document.querySelector("canvas")!, window),
  new Shooter()
);

const players: Player[] = [humanPlayer, bigGuy, strangeOne, mainComputer];

const obstacles = [
  new Obstacle(200, 200, 50, 50, new Health(300)),
  new Obstacle(100, 300, 20, 150, new Health(300)),
  new Obstacle(600, 400, 90, 70, new Health(300)),
];

const world = new World(700, 500);

export const defaultConfig = {
  players,
  obstacles,
  world,
};
