import { FC } from "react";

interface PlayerScoreProps {
  playerName: string;
  score: number;
}

export const PlayerScore: FC<PlayerScoreProps> = ({ playerName, score }) => {
  return (
    <div className="bg-blue-600/50 px-6 h-10 flex items-center justify-center rounded-lg">
      {playerName}:
      <span className="text-orange-400 ml-2 font-bold text-xl">{score}</span>
    </div>
  );
};
