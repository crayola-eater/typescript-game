import { Controls } from "../components/controls";
import { Health } from "../components/health";
import { Player } from "../components/player";
import { Shooter } from "../components/shooter";

export class HumanPlayer extends Player {
  constructor(
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
    super(x, y, health, shooter, width, height, deltaX, deltaY);
    this.controls.onInputHandler = (input, newState, event) => {
      if ("LMB" === input && newState) {
        super.shoot({
          x: (event as MouseEvent).x,
          y: (event as MouseEvent).y,
        });
      }
    };
    this.movementAmount = 5;
  }

  move() {
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

function createDefaultHumanPlayer() {
  const health = new Health(100);
  const controls = new Controls(document.querySelector("canvas")!, window);
  const shooter = new Shooter();
  return new HumanPlayer(300, 100, health, controls, shooter);
}

export const defaultHumanPlayer = createDefaultHumanPlayer();
