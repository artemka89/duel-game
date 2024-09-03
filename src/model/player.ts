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

  private _shots: MagicBall[] = [];
  private _firingRate: number;
  private firingRateTimeStamp = 0;

  constructor(coordinates: Coordinates, movement: PlayerMovements) {
    this._coordinates = coordinates;
    this.movement = movement;
    this._movementSpeed = 5;
    this._color = PLAYER_COLORS[0];
    this._radius = 40;
    this._firingRate = 1;
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

  set movementSpeed(value: number) {
    this._movementSpeed = value;
  }

  get movementSpeed() {
    return this._movementSpeed;
  }

  set color(value: Color) {
    this._color = value;
  }

  get color() {
    return this._color;
  }

  setColor(value: Color) {
    this._color = value;
  }

  get firingRate() {
    return this._firingRate;
  }

  get radius() {
    return this._radius;
  }
}

// export class Player {
//   private context: CanvasRenderingContext2D;
//   private sceneHeight: number;

//   private coordinates: Coordinates;

//   private movement: PlayerMovements;
//   private movementSpeed: number;
//   private playerSidePosition: "left" | "right";

//   private _playerColor: string = PLAYER_COLORS[0];

//   private radius: number;
//   private _isIntersectedWithCursor: boolean = false;

//   private tickMagicBall: number;
//   private timeStampMagicBall: number;

//   shotMagicBall: MagicBall;

//   constructor(
//     context: CanvasRenderingContext2D,
//     playerSidePosition: "left" | "right"
//   ) {
//     this.context = context;
//     this.sceneHeight = this.context.canvas.height;

//     this.playerSidePosition = playerSidePosition;
//     this.movementSpeed = 5;
//     this.movement = playerSidePosition === "left" ? "to bottom" : "to top";

//     this.radius = 40;
//     this.coordinates = {
//       x: playerSidePosition === "left" ? 100 : this.context.canvas.width - 100,
//       y: this.sceneHeight / 2 - this.radius / 2,
//     };

//     this.shotMagicBall = new MagicBall(
//       this.context,
//       this.playerSidePosition === "left" ? "to right" : "to left"
//     );
//     this.tickMagicBall = 1;
//     this.timeStampMagicBall = 0;
//   }

//   render(cursorPositionX: number, cursorPositionY: number) {
//     this.context.beginPath();
//     this.context.fillStyle = this.playerColor;
//     this.context.arc(
//       this.coordinates.x,
//       this.coordinates.y,
//       this.radius,
//       0,
//       2 * Math.PI
//     );
//     this.context.fill();
//     this.move();
//     this.changeMovementThenIntersectedWithCursor(
//       cursorPositionX,
//       cursorPositionY
//     );
//     this.addMagicBallShot();
//   }

//   private move() {
//     if (this.movement === "to bottom") {
//       this.coordinates.y += this.movementSpeed;
//     }

//     if (this.movement === "to top") {
//       this.coordinates.y -= this.movementSpeed;
//     }

//     if (this.coordinates.y > this.sceneHeight - this.radius) {
//       this.movement = "to top";
//     }

//     if (this.coordinates.y < this.radius) {
//       this.movement = "to bottom";
//     }
//   }

//   private addMagicBallShot() {
//     if (this.timeStampMagicBall < 50) {
//       this.timeStampMagicBall += this.tickMagicBall;
//     } else {
//       this.timeStampMagicBall = 0;
//       this.shotMagicBall.addBall({
//         x: this.coordinates.x,
//         y: this.coordinates.y,
//       });
//     }
//   }

//   private changeMovementThenIntersectedWithCursor(
//     cursorPositionX: number,
//     cursorPositionY: number
//   ) {
//     if (cursorPositionX && cursorPositionY) {
//       const distance = Math.sqrt(
//         (cursorPositionX - this.coordinates.x) ** 2 +
//           (cursorPositionY - this.coordinates.y) ** 2
//       );

//       const isIntersected = distance <= this.radius;
//       this._isIntersectedWithCursor = isIntersected;

//       if (isIntersected) {
//         const isIntersectedBottom =
//           this.coordinates.y + this.radius - 10 < cursorPositionY;
//         const isIntersectedTop =
//           this.coordinates.y - this.radius + 10 > cursorPositionY;
//         if (isIntersectedBottom) {
//           this.movement = "to top";
//         }
//         if (isIntersectedTop) {
//           this.movement = "to bottom";
//         }
//       }
//     }
//   }
//   get playerPosition() {
//     return {
//       x: this.coordinates.x,
//       y: this.coordinates.y,
//     };
//   }

//   getBallsPositions() {
//     return this.shotMagicBall.balls;
//   }

//   set speeds({
//     speedPlayer,
//     speedBall,
//   }: {
//     speedPlayer: number;
//     speedBall: number;
//   }) {
//     this.movementSpeed = speedPlayer;
//     this.tickMagicBall = speedBall;
//   }

//   get isIntersectedWithCursor() {
//     return this._isIntersectedWithCursor;
//   }
//   set playerColor(color: string) {
//     this._playerColor = color;
//   }
//   get playerColor() {
//     return this._playerColor;
//   }
// }
