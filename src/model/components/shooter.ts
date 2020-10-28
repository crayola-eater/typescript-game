import { IPosition } from "../interfaces/position";
import { Shot } from "./shot";

type filterPredicate = (shot: Shot, index: number, array: Shot[]) => boolean;

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
    this.shotsFired = this.shotsFired.filter((shot) => shot !== shotToRemove);
  }

  removeShots(...shotsToRemove: Shot[]) {
    this.shotsFired = this.shotsFired.filter(
      (shot) => !shotsToRemove.includes(shot)
    );
  }

  keepShotsWhere(predicate: filterPredicate) {
    this.shotsFired = this.shotsFired.filter(predicate);
  }
}
