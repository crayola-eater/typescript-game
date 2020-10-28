import { Health } from "../components/health";
import { Player } from "../components/player";
import { Shooter } from "../components/shooter";
import { IPosition } from "../interfaces/position";

export class ComputerPlayer extends Player {
  #lastActions: {
    changedDeltaX: number;
    changedDeltaY: number;
    shot: number;
  };

  constructor(
    x: number,
    y: number,
    public health: Health,
    public shooter: Shooter,
    width: number = 100,
    height: number = 100
  ) {
    super(x, y, health, shooter, width, height);

    const currentTime = new Date().getTime();
    this.#lastActions = {
      changedDeltaX: currentTime,
      changedDeltaY: currentTime,
      shot: currentTime,
    };
  }

  get shouldChangeDirection() {
    return new Date().getTime() > this.#lastActions.changedDeltaX + 100;
  }

  get shouldShoot() {
    return new Date().getTime() > this.#lastActions.shot + 2000;
  }

  maybeChangeDirection() {
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

  move() {
    this.maybeChangeDirection();
    super.move();
  }

  shoot(at: IPosition) {
    if (this.shouldShoot) {
      super.shoot(at);
    }
  }
}

function createDefaultComputerPlayer() {
  const health = new Health(100);
  const shooter = new Shooter();
  return new ComputerPlayer(600, 200, health, shooter);
}

export const defaultComputerPlayer = createDefaultComputerPlayer();
