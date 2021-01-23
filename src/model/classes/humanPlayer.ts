import { Controls } from "../components/controls";
import { Health } from "../components/health";
import { Player } from "../components/player";
import { Shooter } from "../components/shooter";
import { PlayerDetails } from "../interfaces/playerDetails";

export class HumanPlayer extends Player {
  constructor(
    public details: PlayerDetails,
    x: number,
    y: number,
    public health: Health,
    public controls: Controls,
    public shooter: Shooter,
    width: number = 100,
    height: number = 100,
    deltaX: number = 0,
    deltaY: number = 0
  ) {
    super(details, x, y, health, shooter, width, height, deltaX, deltaY);
    this.controls.onInputHandler = (input, newState, event) => {
      if ("LMB" === input && newState) {
        super.shoot({
          x: (event as MouseEvent).offsetX,
          y: (event as MouseEvent).offsetY,
        });
      }
    };
    this.movementAmount = 5;
  }

  move(): void {
    if (this.controls.inputs.KeyW) {
      this.deltaY = -this.movementAmount;
    } else if (this.controls.inputs.KeyS) {
      this.deltaY = this.movementAmount;
    } else {
      this.deltaY = 0;
    }

    if (this.controls.inputs.KeyA) {
      this.deltaX = -this.movementAmount;
    } else if (this.controls.inputs.KeyD) {
      this.deltaX = this.movementAmount;
    } else {
      this.deltaX = 0;
    }
    super.move();
  }
}
