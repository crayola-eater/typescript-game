import { Shape } from "../components/shape";

export class World extends Shape {
  constructor(width: number = 800, height: number = 500) {
    super(0, 0, width, height);
  }
}
