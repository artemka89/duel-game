import { FC, useEffect, useRef } from "react";
import { DuelGameEngine } from "../model/duel-game-engine";

import { getRelativeCoordinates } from "../shared/lib/get-relative-coordinates";

interface DuelSceneProps {
  isPlaying: boolean;
  currentPlayerColor: { color: string; player: string };
  player1Settings: { speedPlayer: string; speedBalls: string };
  player2Settings: { speedPlayer: string; speedBalls: string };
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<
    React.SetStateAction<{
      player1: number;
      player2: number;
    }>
  >;
  setColorPickerSetting: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      player: string;
      value: string;
      coordinates: { x: number; y: number };
    }>
  >;
}

export const DuelScene: FC<DuelSceneProps> = ({
  isPlaying,
  currentPlayerColor,
  player1Settings,
  player2Settings,
  setIsPlaying,
  setScore,
  setColorPickerSetting,
}) => {
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
    if (
      currentPlayerColor.player === "player1" &&
      duel.current &&
      duel.current.player1
    ) {
      duel.current.player1.playerColor = currentPlayerColor.color;
    }

    if (
      currentPlayerColor.player === "player2" &&
      duel.current &&
      duel.current.player2
    ) {
      duel.current.player2.playerColor = currentPlayerColor.color;
    }
  }, [currentPlayerColor]);

  useEffect(() => {
    if (duel.current) {
      duel.current.player1.speeds = {
        speedPlayer: Number(player1Settings.speedPlayer),
        speedBall: Number(player1Settings.speedBalls),
      };
      duel.current.player2.speeds = {
        speedPlayer: Number(player2Settings.speedPlayer),
        speedBall: Number(player2Settings.speedBalls),
      };
    }
  }, [player1Settings, player2Settings]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRef.current) {
      const { x, y } = getRelativeCoordinates(event, canvasRef.current);
      duel.current?.setCursorPosition({ x, y });
    }
  };

  const setPlayerColor = (
    player: string,
    color: string,
    coordinates: { x: number; y: number }
  ) => {
    setColorPickerSetting({
      player,
      value: color,
      isOpen: true,
      coordinates,
    });
    setIsPlaying(false);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRef.current && isPlaying) {
      const coordinates = getRelativeCoordinates(event, canvasRef.current);
      if (duel.current?.player1.isIntersectedWithCursor) {
        setPlayerColor(
          "player1",
          duel.current.player1.playerColor,
          coordinates
        );
      }
      if (duel.current?.player2.isIntersectedWithCursor) {
        setPlayerColor(
          "player2",
          duel.current.player2.playerColor,
          coordinates
        );
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="border-2 border-blue-600 rounded-md bg-black w-[700px] h-[500px]"
    />
  );
};
