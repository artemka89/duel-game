import { FC } from "react";
import { PLAYER_COLORS } from "../shared/constants/player-colors";

interface ColorPickerModalProps {
  value?: string;
  modalPosition: { x: number; y: number };
  onChange: (value: string) => void;
  onClose: () => void;
}

export const ColorPickerModal: FC<ColorPickerModalProps> = ({
  value,
  modalPosition,
  onChange,
  onClose,
}) => {
  const onChangeHandler = (value: string) => {
    onChange(value);
    onClose();
  };

  return (
    <div
      className="absolute w-[250px] rounded-lg bg-blue-600/70"
      style={{
        top: modalPosition.y,
        left: modalPosition.x,
      }}>
      <div className="relative pt-2 pb-4">
        <div
          onClick={onClose}
          className=" absolute first-letter:font-bold cursor-pointer top-1 right-2">
          X
        </div>
        <h3 className="text-center font-medium mb-2">Выберите цвет:</h3>
        <div className="grid grid-cols-[repeat(auto-fill,48px)] justify-center  gap-1">
          {PLAYER_COLORS.map((color) => (
            <div
              key={color}
              onClick={() => onChangeHandler(color)}
              className="p-1  rounded-lg cursor-pointer hover:bg-gray-400 transition-colors"
              style={{
                backgroundColor: value === color ? "#9ca3af" : "white",
              }}>
              <div
                className="rounded-md w-10 h-10"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
