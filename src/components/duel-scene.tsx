import { FC, useEffect, useRef } from "react";
import { DuelGameEngine } from "../model/duel-game-engine";

import { getRelativeCoordinates } from "../shared/lib/get-relative-coordinates";
import { Player2 } from "../model/player";
import { Coordinates } from "../shared/types/types";

interface DuelSceneProps {
  isPlaying: boolean;
  player1Settings: { speedPlayer: string; firingRate: string };
  player2Settings: { speedPlayer: string; firingRate: string };
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
      value: string;
      player: Player2 | null;
      coordinates: Coordinates;
    }>
  >;
}

export const DuelScene: FC<DuelSceneProps> = ({
  isPlaying,
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
    if (duel.current) {
      const player1 = duel.current.players[0];
      player1.setFiringRate(Number(player1Settings.firingRate));
      player1.seMovementSpeed(Number(player1Settings.speedPlayer));

      const player2 = duel.current.players[1];
      player2.setFiringRate(Number(player2Settings.firingRate));
      player2.seMovementSpeed(Number(player2Settings.speedPlayer));
    }
  }, [player1Settings, player2Settings]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasRef.current) {
      const coordinates = getRelativeCoordinates(event, canvasRef.current);
      duel.current?.setCursorCoordinates(coordinates);
    }
  };

  const handleClick = () => {
    if (duel.current && isPlaying) {
      const player = duel.current.players.find(
        (player) => player.isSelected === true
      );
      if (!player) return;

      setIsPlaying(false);

      setColorPickerSetting((prev) => ({
        ...prev,
        isOpen: true,
        value: player.bulletColor,
        player: player,
        coordinates: player.coordinates,
      }));
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
