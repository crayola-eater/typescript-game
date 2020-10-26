import { IPosition } from "../interfaces/position";

export interface ShapeOptions {
  x: number;
  y: number;
  height: number;
  width: number;
}

export class Shape {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  collidesWith(otherShape: Shape): boolean {
    return (
      this.topLeft.x < otherShape.bottomRight.x &&
      this.bottomRight.x > otherShape.topLeft.x &&
      this.topLeft.y < otherShape.bottomRight.y &&
      this.bottomRight.y > otherShape.topRight.y
    );
  }

  extendsBeyond(otherShape: Shape): boolean {
    return (
      this.topLeft.x < otherShape.topLeft.x ||
      this.bottomRight.x > otherShape.bottomRight.x ||
      this.topLeft.y < otherShape.topLeft.y ||
      this.bottomRight.y > otherShape.bottomRight.y
    );
  }

  get topLeft(): IPosition {
    return {
      x: this.x,
      y: this.y,
    };
  }

  get topRight(): IPosition {
    return {
      x: this.x + this.width,
      y: this.y,
    };
  }

  get bottomLeft(): IPosition {
    return {
      x: this.x,
      y: this.y + this.height,
    };
  }

  get bottomRight(): IPosition {
    return {
      x: this.x + this.width,
      y: this.y + this.height,
    };
  }

  get center(): IPosition {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }
}