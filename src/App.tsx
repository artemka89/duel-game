import { useState } from "react";
import { DuelScene } from "./components/duel-scene";
import { Button } from "./shared/ui/button";
import { PlayerScore } from "./components/player-score";
import { ColorPickerModal } from "./components/color-picker-modal";
import { PlayerSpeedSettings } from "./components/player-speed-settings";
import { PLAYER_COLORS } from "./shared/constants/player-colors";
import { Player2 } from "./model/player";
import { Coordinates } from "./shared/types/types";

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const [colorPickerSetting, setColorPickerSetting] = useState<{
    isOpen: boolean;
    value: string;
    player: Player2 | null;
    coordinates: Coordinates;
  }>({
    isOpen: false,
    value: PLAYER_COLORS[0],
    player: null,
    coordinates: { x: 0, y: 0 },
  });

  const [player1Settings, setPlayer1Settings] = useState({
    speedPlayer: "6",
    speedBalls: "1",
  });

  const [player2Settings, setPlayer2Settings] = useState({
    speedPlayer: "6",
    speedBalls: "1",
  });

  return (
    <div className="min-h-screen container flex items-center flex-col">
      <h1 className="text-3xl font-bold my-10">Дуэль</h1>
      <div>
        <div className="flex justify-center mb-4">
          <Button onClick={() => setIsPlaying((prev) => !prev)}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>
        <div className="flex justify-between gap-2 py-3">
          <PlayerScore playerName="Герой 1" score={score.player1} />
          <PlayerScore playerName="Герой 2" score={score.player2} />
        </div>
        <div className="relative">
          <DuelScene
            isPlaying={isPlaying}
            colorPickerSetting={colorPickerSetting}
            setColorPickerSetting={setColorPickerSetting}
            player1Settings={player1Settings}
            player2Settings={player2Settings}
            setIsPlaying={setIsPlaying}
            setScore={setScore}
          />
          {colorPickerSetting.isOpen && (
            <ColorPickerModal
              value={colorPickerSetting.value}
              modalPosition={colorPickerSetting.coordinates}
              onChange={(value) => {
                setColorPickerSetting((prev) => ({ ...prev, value }));
                colorPickerSetting.player?.setColor(value);
              }}
              onClose={() => {
                setColorPickerSetting((prev) => ({ ...prev, isOpen: false }));
                setIsPlaying(true);
              }}
            />
          )}
          {!isPlaying && !colorPickerSetting.isOpen && (
            <div className="absolute top-1 left-1 bottom-1 right-1 bg-black/80 rounded-lg flex justify-center items-center">
              <h2 className="text-white text-2xl font-medium">
                Нажмите кнопку "Play"
              </h2>
            </div>
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
    </div>
  );
};
