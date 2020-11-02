import { MovableShape } from "./movableShape";
import { PositionDetails } from "../interfaces/positionDetails";

export class Shot extends MovableShape {
  constructor(
    from: PositionDetails,
    to: PositionDetails,
    width: number = 5,
    height: number = 5,
    public speed: number = 15,
    public damage: number = 10
  ) {
    super(from.x, from.y, width, height, 0, 0);

    const originalDelta = {
      deltaX: to.x - from.x, // A in CAH
      deltaY: to.y - from.y, // O in SOH
    };

    const radians = Math.atan2(originalDelta.deltaY, originalDelta.deltaX);
    this.deltaX = Math.cos(radians) * speed; // CAH
    this.deltaY = Math.sin(radians) * speed; // SOH
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "goldenrod";
    ctx.fillRect(this.x, this.y, 7, 7);
  }
}
