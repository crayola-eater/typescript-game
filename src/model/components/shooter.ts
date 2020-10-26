import { IPosition } from "../interfaces/position";
import { Shot } from "./shot";

export class Shooter {
  shotsFired: Shot[];
  constructor() {
    this.shotsFired = [];
  }

  shoot(from: IPosition, at: IPosition) {
    const shot = new Shot(from, at);
    this.shotsFired.push(shot);
  }

  remove(shotToRemove: Shot) {
    this.shotsFired = this.shotsFired.filter((shot) => shotToRemove !== shot);
  }
}
