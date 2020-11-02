import { PositionDetails } from "../interfaces/positionDetails";

export abstract class Shape {
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

  collidesWithAny(...otherShapes: Shape[]): boolean {
    return otherShapes.some((otherShape) => this.collidesWith(otherShape));
  }

  extendsBeyond(otherShape: Shape): boolean {
    return (
      this.topLeft.x < otherShape.topLeft.x ||
      this.bottomRight.x > otherShape.bottomRight.x ||
      this.topLeft.y < otherShape.topLeft.y ||
      this.bottomRight.y > otherShape.bottomRight.y
    );
  }

  getAllCollisionsWith<T extends Shape>(...otherShapes: T[]): T[] {
    return otherShapes.filter((otherShape) => this.collidesWith(otherShape));
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  get topLeft(): PositionDetails {
    return {
      x: this.x,
      y: this.y,
    };
  }

  get topRight(): PositionDetails {
    return {
      x: this.x + this.width,
      y: this.y,
    };
  }

  get bottomLeft(): PositionDetails {
    return {
      x: this.x,
      y: this.y + this.height,
    };
  }

  get bottomRight(): PositionDetails {
    return {
      x: this.x + this.width,
      y: this.y + this.height,
    };
  }

  get center(): PositionDetails {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }
}
