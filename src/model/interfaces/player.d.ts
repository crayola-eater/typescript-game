import { Health } from "../components/health";
import { MovableShape } from "../components/movableShape";
import { Shooter } from "../components/shooter";

export interface Player extends MovableShape {
  health: Health;
  shooter: Shooter;
}
