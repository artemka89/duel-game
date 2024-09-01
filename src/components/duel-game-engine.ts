import { Player } from "./player";

export class DuelGameEngine {
  private context: CanvasRenderingContext2D;
  private sceneHeight: number;
  private sceneWidth: number;
  private frameCount: number;
  private timeStamp: number;
  private playState: boolean;

  private cursorPositionX: number = 0;
  private cursorPositionY: number = 0;

  player1: Player;
  player2: Player;

  private setScore: React.Dispatch<
    React.SetStateAction<{ player1: number; player2: number }>
  >;

  constructor(
    context: CanvasRenderingContext2D,
    sceneHeight: number,
    sceneWidth: number,
    isPlaying: boolean,
    setScore: React.Dispatch<
      React.SetStateAction<{ player1: number; player2: number }>
    >
  ) {
    this.context = context;
    this.sceneHeight = sceneHeight;
    this.sceneWidth = sceneWidth;

    this.player1 = new Player(this.context, this.sceneHeight, "left");
    this.player2 = new Player(this.context, this.sceneHeight, "right");

    this.frameCount = 0;
    this.timeStamp = 1;

    this.playState = isPlaying;

    this.setScore = setScore;
  }

  setCursorPosition({ x, y }: { x: number; y: number }) {
    this.cursorPositionX = x;
    this.cursorPositionY = y;
  }

  checkShots() {
    const { x: player1X, y: player1Y } = this.player1.playerPosition;
    const player2BallsPosition = this.player2.shotMagicBall.balls;

    player2BallsPosition.forEach((ball) => {
      if (
        player1Y + 40 > ball.y &&
        player1Y - 40 < ball.y &&
        player1X + 40 > ball.x &&
        player1X - 40 < ball.x
      ) {
        this.setScore((prev) => ({ ...prev, player2: prev.player2 + 1 }));
        ball.x = this.sceneWidth + 10;
      }
    });

    const { x: player2X, y: player2Y } = this.player2.playerPosition;
    const player1BallsPosition = this.player1.shotMagicBall.balls;

    player1BallsPosition.forEach((ball) => {
      if (
        player2Y + 40 > ball.y &&
        player2Y - 40 < ball.y &&
        player2X + 40 > ball.x &&
        player2X - 40 < ball.x
      ) {
        this.setScore((prev) => ({ ...prev, player1: prev.player1 + 1 }));
        ball.x = this.sceneWidth + 10;
      }
    });
  }

  animate(isPlaying: boolean) {
    this.playState = isPlaying;

    if (this.frameCount < this.timeStamp) {
      this.frameCount++;
    } else {
      this.frameCount = 0;

      this.context.clearRect(0, 0, this.sceneWidth, this.sceneHeight);

      this.player1.render(this.cursorPositionX, this.cursorPositionY);
      this.player2.render(this.cursorPositionX, this.cursorPositionY);
      this.checkShots();
    }

    if (this.playState) {
      requestAnimationFrame(() => this.animate(this.playState));
    }
  }

  getMouseCoordinates() {
    return {
      x: this.cursorPositionX,
      y: this.cursorPositionY,
    };
  }
}
