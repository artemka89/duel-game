import { MagicBall } from "./magic-ball";

type PlayerMovements = "to bottom" | "to top";

export class Player {
  private playerSidePosition: "left" | "right";
  private movement: PlayerMovements;
  private movementSpeed: number = 5;
  private _playerColor: string = "green";

  private context: CanvasRenderingContext2D;
  private sceneHeight: number;

  shotMagicBall: MagicBall;

  private coordinateY: number;
  private coordinateX: number;
  private radius: number;
  private _isIntersectedWithCursor: boolean = false;

  tickBall: number = 0;

  constructor(
    context: CanvasRenderingContext2D,
    boardSidesLength: number,
    playerSidePosition: "left" | "right"
  ) {
    this.context = context;
    this.playerSidePosition = playerSidePosition;
    this.movement = playerSidePosition === "left" ? "to bottom" : "to top";
    this.radius = 40;
    this.sceneHeight = boardSidesLength;
    this.coordinateY = this.sceneHeight / 2 - this.radius / 2;
    this.coordinateX =
      playerSidePosition === "left" ? 100 : this.context.canvas.width - 100;

    this.shotMagicBall = new MagicBall(this.context);
  }
  render(cursorPositionX: number, cursorPositionY: number) {
    this.context.beginPath();
    this.context.fillStyle = this.playerColor;
    this.context.arc(
      this.coordinateX,
      this.coordinateY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    this.context.fill();
    this.move();
    this.changeMovementThenIntersectedWithCursor(
      cursorPositionX,
      cursorPositionY
    );
    this.shotMagicBall.moveBalls(this.playerSidePosition);
  }

  private move() {
    if (this.movement === "to bottom") {
      this.coordinateY += this.movementSpeed;
    }

    if (this.movement === "to top") {
      this.coordinateY -= this.movementSpeed;
    }

    if (this.coordinateY > this.sceneHeight - this.radius) {
      this.movement = "to top";
    }

    if (this.coordinateY < this.radius) {
      this.movement = "to bottom";
    }

    if (this.tickBall < 50) {
      this.tickBall += 1;
    } else {
      this.tickBall = 0;
      this.shotMagicBall.addBall(this.coordinateX, this.coordinateY);
    }
  }

  private changeMovementThenIntersectedWithCursor(
    cursorPositionX: number,
    cursorPositionY: number
  ) {
    if (cursorPositionX && cursorPositionY) {
      const distance = Math.sqrt(
        (cursorPositionX - this.coordinateX) ** 2 +
          (cursorPositionY - this.coordinateY) ** 2
      );

      const isIntersected = distance <= this.radius;
      this._isIntersectedWithCursor = isIntersected;

      if (isIntersected) {
        const isIntersectedBottom =
          this.coordinateY + this.radius - 10 < cursorPositionY;
        const isIntersectedTop =
          this.coordinateY - this.radius + 10 > cursorPositionY;
        if (isIntersectedBottom) {
          this.movement = "to top";
        }
        if (isIntersectedTop) {
          this.movement = "to bottom";
        }
      }
    }
  }
  get playerPosition() {
    return {
      x: this.coordinateX,
      y: this.coordinateY,
    };
  }

  getBallsPositions() {
    return this.shotMagicBall.balls;
  }

  set speeds({
    speedPlayer,
    speedBall,
  }: {
    speedPlayer: number;
    speedBall: number;
  }) {
    this.movementSpeed = speedPlayer;
    this.shotMagicBall.speed = speedBall;
  }

  get isIntersectedWithCursor() {
    return this._isIntersectedWithCursor;
  }
  set playerColor(color: string) {
    this._playerColor = color;
  }
  get playerColor() {
    return this._playerColor;
  }
}
