import { Health } from "../components/health";
import { Player } from "../components/player";
import { Shooter } from "../components/shooter";
import { PlayerDetails } from "../interfaces/playerDetails";
import { PositionDetails } from "../interfaces/positionDetails";

export class ComputerPlayer extends Player {
  #lastActions: {
    changedDeltaX: number;
    changedDeltaY: number;
    shot: number;
  };

  constructor(
    public details: PlayerDetails,
    x: number,
    y: number,
    public health: Health,
    public shooter: Shooter,
    width: number = 100,
    height: number = 100
  ) {
    super(details, x, y, health, shooter, width, height);

    const currentTime = new Date().getTime();
    this.#lastActions = {
      changedDeltaX: currentTime,
      changedDeltaY: currentTime,
      shot: currentTime,
    };
  }

  get shouldChangeDirection(): boolean {
    return new Date().getTime() > this.#lastActions.changedDeltaX + 100;
  }

  get shouldShoot(): boolean {
    return new Date().getTime() > this.#lastActions.shot + 500;
  }

  maybeChangeDirection(): void {
    if (this.shouldChangeDirection) {
      const leftOrRight = Math.random() < 0.5 ? -1 : 1;
      this.deltaX = Math.random() * 5 * leftOrRight;

      const upOrDown = Math.random() < 0.5 ? -1 : 1;
      this.deltaY = Math.random() * 5 * upOrDown;

      const currentTime = new Date().getTime();
      this.#lastActions.changedDeltaX = currentTime;
      this.#lastActions.changedDeltaY = currentTime;
    }
  }

  move(): void {
    this.maybeChangeDirection();
    super.move();
  }

  shoot(at: PositionDetails): void {
    if (this.shouldShoot) {
      this.#lastActions.shot = new Date().getTime();
      super.shoot(at);
    }
  }
}
