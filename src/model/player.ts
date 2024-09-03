import { PLAYER_COLORS } from "../shared/constants/player-colors";
import { Color, Coordinates } from "../shared/types/types";
import { MagicBall } from "./magic-ball";

type PlayerMovements = "to bottom" | "to top";

export class Player2 {
  private _coordinates: Coordinates;

  private movement: PlayerMovements;
  private _movementSpeed: number;

  private _color: Color;
  private _radius: number;
  private _isSelected: boolean = false;
  private _bulletColor: Color = PLAYER_COLORS[0];

  private _shots: MagicBall[] = [];
  private _firingRate: number;
  private firingRateTimeStamp = 50;

  constructor(coordinates: Coordinates, movement: PlayerMovements) {
    this._coordinates = coordinates;
    this.movement = movement;
    this._movementSpeed = 5;
    this._color = PLAYER_COLORS[0];
    this._radius = 40;
    this._firingRate = 10;
  }

  setIsSelected(value: boolean) {
    this._isSelected = value;
  }

  get isSelected() {
    return this._isSelected;
  }

  move() {
    if (this.movement === "to bottom") {
      this.coordinates.y += this.movementSpeed;
    }

    if (this.movement === "to top") {
      this.coordinates.y -= this.movementSpeed;
    }
  }

  changeMovementOnIntersectedCursor(movement: PlayerMovements) {
    if (movement === "to bottom") {
      this.movement = "to bottom";
    }

    if (movement === "to top") {
      this.movement = "to top";
    }
  }
  changeMovement(maxHeight: number) {
    if (this.coordinates.y > maxHeight - this._radius) {
      this.movement = "to top";
    }

    if (this.coordinates.y < this._radius) {
      this.movement = "to bottom";
    }
  }

  get shots() {
    return this._shots;
  }

  takeShot(bullet: MagicBall) {
    if (this.firingRateTimeStamp < 60) {
      this.firingRateTimeStamp += this._firingRate;
    } else {
      this.firingRateTimeStamp = 0;
      this._shots.push(bullet);
    }
  }

  get coordinates() {
    return this._coordinates;
  }

  seMovementSpeed(value: number) {
    this._movementSpeed = value;
  }

  get movementSpeed() {
    return this._movementSpeed;
  }

  get color() {
    return this._color;
  }

  setBulletColor(value: Color) {
    this._bulletColor = value;
  }

  get bulletColor() {
    return this._bulletColor;
  }

  get firingRate() {
    return this._firingRate;
  }

  setFiringRate(value: number) {
    this._firingRate = value;
  }

  get radius() {
    return this._radius;
  }
}
