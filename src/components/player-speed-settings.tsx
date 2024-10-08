import { FC } from "react";
import { Range } from "../shared/ui/range";

interface PlayerSpeedSettingsProps {
  className?: string;
  values: { speedPlayer: string; firingRate: string };
  onChangeSettings: (values: {
    speedPlayer: string;
    firingRate: string;
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
        label="Частота стрельбы: "
        value={values.firingRate}
        min="1"
        max="5"
        onChange={(value) => onChangeSettings({ ...values, firingRate: value })}
      />
    </div>
  );
};
