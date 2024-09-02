import { FC } from "react";
import { Range } from "../shared/ui/range";

interface PlayerSpeedSettingsProps {
  className?: string;
  values: { speedPlayer: string; speedBalls: string };
  onChangeSettings: (values: {
    speedPlayer: string;
    speedBalls: string;
  }) => void;
}

export const PlayerSpeedSettings: FC<PlayerSpeedSettingsProps> = ({
  values,
  onChangeSettings,
}) => {
  return (
    <div className="w-[150px]">
      <Range
        label="Скорость героя: "
        value={values.speedPlayer}
        min="2"
        max="10"
        onChange={(value) =>
          onChangeSettings({ ...values, speedPlayer: value })
        }
      />
      <Range
        label="Скорость шара: "
        value={values.speedBalls}
        min="1"
        max="5"
        onChange={(value) => onChangeSettings({ ...values, speedBalls: value })}
      />
    </div>
  );
};
