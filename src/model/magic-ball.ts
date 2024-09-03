import { Coordinates } from "../shared/types/types";

type MagicBallMovement = "to left" | "to right";

export class MagicBall {
  private movement: MagicBallMovement;
  private _coordinates: Coordinates;

  private speed: number = 10;
  private _radius: number = 5;

  constructor(coordinates: Coordinates, movement: MagicBallMovement) {
    this._coordinates = coordinates;
    this.movement = movement;
  }

  move(endScene: number) {
    if (this._coordinates.x < endScene) {
      if (this.movement === "to left") {
        this._coordinates.x -= this.speed;
      }
      if (this.movement === "to right") {
        this._coordinates.x += this.speed;
      }
    }
  }

  get coordinates() {
    return this._coordinates;
  }

  get radius() {
    return this._radius;
  }
}
