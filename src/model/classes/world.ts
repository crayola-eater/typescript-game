import { Shape } from "../components/shape";

export class World extends Shape {
  constructor(width: number, height: number) {
    super(0, 0, width, height);
  }

  draw() {}
}
