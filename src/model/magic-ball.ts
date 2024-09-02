import { Coordinates } from "../shared/types/types";

type MagicBallMovement = "to left" | "to right";

export class MagicBall {
  private _balls: { x: number; y: number }[] = [];

  private movement: MagicBallMovement;

  private _speed: number = 10;
  private context: CanvasRenderingContext2D;
  private boardWidth: number;

  constructor(context: CanvasRenderingContext2D, movement: MagicBallMovement) {
    this.context = context;
    this.boardWidth = context.canvas.width + 10;
    this.movement = movement;
  }

  addBall(coordinates: Coordinates) {
    this._balls.push(coordinates);
  }

  render() {
    this._balls.forEach((boll) => {
      this.context.beginPath();
      this.context.fillStyle = "red";
      this.context.arc(boll.x, boll.y, 5, 0, 2 * Math.PI, false);
      this.context.fill();
    });
  }

  move() {
    this._balls.forEach((boll) => {
      if (boll.x < this.boardWidth) {
        if (this.movement === "to left") {
          boll.x -= this._speed;
        }
        if (this.movement === "to right") {
          boll.x += this._speed;
        }
      } else {
        this._balls.splice(0, 1);
      }
    });
    this.render();
  }

  get balls() {
    return this._balls;
  }

  set speed(value: number) {
    this._speed = value;
  }
}
