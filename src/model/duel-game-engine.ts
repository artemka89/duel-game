import { Coordinates } from "../shared/types/types";
import { MagicBall } from "./magic-ball";
import { Player } from "./player";

export class DuelGameEngine {
  private context: CanvasRenderingContext2D;
  private sceneHeight: number;
  private sceneWidth: number;
  private frameCount: number;
  private timeStamp: number;
  private internalPlayState: boolean;

  private cursorCoordinates: Coordinates = {
    x: 0,
    y: 0,
  };

  private _players: Player[] = [
    new Player({ x: 100, y: 250 }, "to bottom"),
    new Player({ x: 600, y: 250 }, "to top"),
  ];

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

    this.frameCount = 0;
    this.timeStamp = 1;

    this.internalPlayState = isPlaying;

    this.setScore = setScore;
  }

  get players() {
    return this._players;
  }

  renderPlayers() {
    this._players.forEach((player) => {
      this.context.beginPath();
      this.context.fillStyle = player.color;
      this.context.arc(
        player.coordinates.x,
        player.coordinates.y,
        player.radius,
        0,
        2 * Math.PI
      );
      this.context.fill();
      this.context.closePath();

      const isPointInPath = this.context.isPointInPath(
        this.cursorCoordinates.x,
        this.cursorCoordinates.y
      );

      if (isPointInPath) {
        player.setIsSelected(true);
        this.context.lineWidth = 4;
        this.context.strokeStyle = "red";
        this.context.stroke();
      } else {
        player.setIsSelected(false);
      }

      const isIntersectedBottom =
        player.coordinates.y + player.radius - 10 < this.cursorCoordinates.y &&
        isPointInPath;

      const isIntersectedTop =
        player.coordinates.y - player.radius + 10 > this.cursorCoordinates.y &&
        isPointInPath;

      if (isIntersectedBottom) {
        player.changeMovementOnIntersectedCursor("to top");
      }

      if (isIntersectedTop) {
        player.changeMovementOnIntersectedCursor("to bottom");
      }
    });
  }

  renderShots() {
    this._players.forEach((player) => {
      player.shots.forEach((shot) => {
        this.context.beginPath();
        this.context.fillStyle = shot.color;
        this.context.arc(
          shot.coordinates.x,
          shot.coordinates.y,
          shot.radius,
          0,
          2 * Math.PI
        );
        this.context.fill();
        this.context.closePath();
      });
    });
  }

  movePlayersAndShots() {
    this._players.forEach((player) => {
      player.move();
      player.changeMovement(this.sceneHeight);

      const bulletMovement =
        player.coordinates.x < this.sceneWidth / 2 ? "to right" : "to left";
      player.takeShot(
        new MagicBall(
          { ...player.coordinates },
          bulletMovement,
          player.bulletColor
        )
      );

      const endScene = this.sceneWidth + 15;

      player.shots.forEach((shot) => {
        shot.move(endScene);

        if (shot.coordinates.x > endScene || shot.coordinates.x < 0) {
          player.shots.splice(0, 1);
        }
      });
    });

    this.addScore();
  }

  setCursorCoordinates(coordinates: Coordinates) {
    this.cursorCoordinates = coordinates;
  }

  checkShot(player: Player, shot: MagicBall) {
    const isShot =
      shot.coordinates.x < player.coordinates.x + player.radius &&
      shot.coordinates.x > player.coordinates.x - player.radius &&
      shot.coordinates.y < player.coordinates.y + player.radius &&
      shot.coordinates.y > player.coordinates.y - player.radius;

    return isShot;
  }

  addScore() {
    this._players[0].shots.forEach((shot) => {
      if (this.checkShot(this._players[1], shot)) {
        this.setScore((prev) => ({ ...prev, player1: prev.player1 + 1 }));
        shot.coordinates.x = this.sceneWidth + 15;
      }
    });

    this._players[1].shots.forEach((shot) => {
      if (this.checkShot(this._players[0], shot)) {
        this.setScore((prev) => ({ ...prev, player2: prev.player2 + 1 }));
        shot.coordinates.x = this.sceneWidth + 15;
      }
    });
  }

  animate(isPlaying: boolean) {
    this.internalPlayState = isPlaying;

    if (this.frameCount < this.timeStamp) {
      this.frameCount++;
    } else {
      this.frameCount = 0;

      this.context.clearRect(0, 0, this.sceneWidth, this.sceneHeight);

      this.renderPlayers();
      this.movePlayersAndShots();
      this.renderShots();
    }

    if (this.internalPlayState) {
      requestAnimationFrame(() => this.animate(this.internalPlayState));
    }
  }
}
