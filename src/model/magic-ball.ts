export class MagicBall {
  private _balls: { x: number; y: number }[] = [];

  private _speed: number = 10;
  private context: CanvasRenderingContext2D;
  private boardWidth: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.boardWidth = context.canvas.width + 10;
  }

  addBall(x: number, y: number) {
    this._balls.push({ x, y });
  }

  renderBall() {
    this._balls.forEach((boll) => {
      this.context.beginPath();
      this.context.fillStyle = "red";
      this.context.arc(boll.x, boll.y, 5, 0, 2 * Math.PI, false);
      this.context.fill();
    });
  }

  moveBalls(playerPosition: "left" | "right") {
    this._balls.forEach((boll) => {
      if (boll.x < this.boardWidth) {
        if (playerPosition === "left") {
          boll.x += this._speed;
        }
        if (playerPosition === "right") {
          boll.x -= this._speed;
        }
      } else {
        this._balls.splice(0, 1);
      }
    });
    this.renderBall();
  }

  get balls() {
    return this._balls;
  }

  set speed(value: number) {
    this._speed = value;
  }
}
