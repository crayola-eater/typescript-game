import { Shape } from "./shape";

export class MovableShape extends Shape {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    public deltaX: number = 0,
    public deltaY: number = 0,
    public movementAmount: number = 5
  ) {
    super(x, y, width, height);
  }

  moveBy(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
  }

  move() {
    this.x += this.deltaX;
    this.y += this.deltaY;
  }

  moveBack() {
    this.moveBy(-this.deltaX, -this.deltaY);
  }
}
