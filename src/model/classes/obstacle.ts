import { Health } from "../components/health";
import { Shape } from "../components/shape";

export class Obstacle extends Shape {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    public health: Health
  ) {
    super(x, y, width, height);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Obstacle
    ctx.fillStyle = "#704300";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Obstacle HP bar
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
  }
}
