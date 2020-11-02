import { PositionDetails } from "../interfaces/positionDetails";
import { Shot } from "./shot";

type filterPredicate = (shot: Shot, index: number, array: Shot[]) => boolean;

export class Shooter {
  shotsFired: Shot[];
  constructor() {
    this.shotsFired = [];
  }

  shoot(from: PositionDetails, at: PositionDetails): void {
    const shot = new Shot(from, at);
    this.shotsFired.push(shot);
  }

  remove(shotToRemove: Shot): void {
    this.shotsFired = this.shotsFired.filter((shot) => shot !== shotToRemove);
  }

  removeShots(...shotsToRemove: Shot[]): void {
    this.shotsFired = this.shotsFired.filter(
      (shot) => !shotsToRemove.includes(shot)
    );
  }

  keepShotsWhere(predicate: filterPredicate): void {
    this.shotsFired = this.shotsFired.filter(predicate);
  }
}
