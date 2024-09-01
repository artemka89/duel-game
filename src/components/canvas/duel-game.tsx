import { useEffect, useRef, useState } from "react";
import { DuelGameEngine } from "../duel-game-engine";

import { PlayerSpeedSettings } from "../player-speed-settings";
import { Button } from "../../shared/button";
import { PickerColorModal } from "../picker-color-modal";

export const DuelGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const [player1Settings, setPlayer1Settings] = useState({
    range: "5",
    balls: "7",
  });

  const [player2Settings, setPlayer2Settings] = useState({
    range: "5",
    balls: "7",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalPositionRef = useRef<{ x: number; y: number } | null>(null);

  const cursorPosRef = useRef<Uint16Array>(new Uint16Array(2));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const duel = useRef<DuelGameEngine | null>(null);

  const isMount = useRef(false);

  const canvasHeight = 500;
  const canvasWidth = 700;

  useEffect(() => {
    if (isMount.current) {
      if (canvasRef.current === null) {
        return;
      }

      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;
      context.current = canvasRef.current.getContext("2d");

      if (context.current) {
        const ctx = context.current;

        duel.current = new DuelGameEngine(
          ctx,
          canvasHeight,
          canvasWidth,
          isPlaying,
          setScore
        );
      }
    }

    isMount.current = true;

    return () => {
      if (!isMount.current) {
        canvasRef.current = null;
        context.current = null;
        duel.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (duel.current) {
      duel.current.animate(isPlaying);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (duel.current) {
      duel.current.player1.speeds = {
        speedPlayer: Number(player1Settings.range),
        speedBall: Number(player1Settings.balls),
      };
      duel.current.player2.speeds = {
        speedPlayer: Number(player2Settings.range),
        speedBall: Number(player2Settings.balls),
      };
    }
  }, [player1Settings, player2Settings]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRef.current) {
      const { x, y } = getRelativeCoordinates(event, canvasRef.current);
      duel.current?.setCursorPosition({ x, y });
      cursorPosRef.current[0] = x;
      cursorPosRef.current[1] = y;
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRef.current) {
      modalPositionRef.current = getRelativeCoordinates(
        event,
        canvasRef.current
      );
    }

    if (duel.current?.player1.isIntersectedWithCursor) {
      setIsModalOpen(true);
      setIsPlaying(false);
      console.log("player1");
    }
    if (duel.current?.player2.isIntersectedWithCursor) {
      setIsModalOpen(true);
      setIsPlaying(false);
      console.log("player2");
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <Button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "Pause" : "Play"}
        </Button>
      </div>

      <div className="flex justify-between gap-2 py-3 text-xl">
        <div className="bg-blue-600/50 px-6 h-10 flex items-center justify-center rounded-lg">
          Герой 1:
          <span className="text-orange-400 ml-2 font-bold text-xl">
            {score.player1}
          </span>
        </div>
        <div className="bg-blue-600/50 px-6 h-10 flex items-center justify-center rounded-lg">
          Герой 2:
          <span className="text-orange-400 ml-2 font-bold text-xl">
            {score.player2}
          </span>
        </div>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          className="border-2 border-blue-600 rounded-md bg-black w-[700px] h-[500px]"
        />
        {isModalOpen && (
          <PickerColorModal
            value={duel.current?.player1.playerColor}
            modalPosition={modalPositionRef.current!}
            onChange={(value) => {
              if (duel.current) {
                duel.current.player1.playerColor = value;
              }
            }}
            onClose={() => {
              setIsModalOpen(false);
              setIsPlaying(true);
            }}
          />
        )}
      </div>
      <div className="flex justify-between">
        <PlayerSpeedSettings
          values={player1Settings}
          onChangeSettings={setPlayer1Settings}
        />
        <PlayerSpeedSettings
          values={player2Settings}
          onChangeSettings={setPlayer2Settings}
        />
      </div>
    </div>
  );
};

function getRelativeCoordinates(
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  element: HTMLElement
) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}
