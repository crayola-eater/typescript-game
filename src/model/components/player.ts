import { PlayerDetails } from "../interfaces/playerDetails";
import { PositionDetails } from "../interfaces/positionDetails";
import { Health } from "./health";
import { MovableShape } from "./movableShape";
import { Shooter } from "./shooter";

export class Player extends MovableShape {
  constructor(
    public details: PlayerDetails,
    x: number,
    y: number,
    public health: Health,
    public shooter: Shooter,
    width: number = 100,
    height: number = 100,
    deltaX: number = 0,
    deltaY: number = 0
  ) {
    super(x, y, width, height, deltaX, deltaY);
  }

  shoot(at: PositionDetails): void {
    this.shooter.shoot(
      {
        x: this.center.x,
        y: this.center.y,
      },
      {
        x: at.x,
        y: at.y,
      }
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Player sprite
    ctx.fillStyle = this.details.colour;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Player HP bar
    ctx.fillStyle = this.health.currentColour;
    ctx.fillRect(
      this.x,
      this.y - 40,
      this.health.currentPercentage * this.width,
      20
    );
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y - 40, this.width, 20);

    // Player name
    ctx.fillStyle = "black";
    ctx.fillText(this.details.name, this.x, this.y - 50);
  }
}
