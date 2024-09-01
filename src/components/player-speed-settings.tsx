import { FC } from "react";
import { Range } from "../shared/range";

interface PlayerSpeedSettingsProps {
  className?: string;
  values: { range: string; balls: string };
  onChangeSettings: (values: { range: string; balls: string }) => void;
}

export const PlayerSpeedSettings: FC<PlayerSpeedSettingsProps> = ({
  values,
  onChangeSettings,
}) => {
  return (
    <div className="w-[150px]">
      <Range
        label="Скорость героя: "
        value={values.range}
        min="3"
        max="10"
        onChange={(value) => onChangeSettings({ ...values, range: value })}
      />
      <Range
        label="Скорость шара: "
        value={values.balls}
        min="3"
        max="15"
        onChange={(value) => onChangeSettings({ ...values, balls: value })}
      />
    </div>
  );
};
