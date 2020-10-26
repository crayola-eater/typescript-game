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
}
