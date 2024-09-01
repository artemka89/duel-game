import { FC } from "react";

interface PickerColorModalProps {
  value?: string;
  modalPosition: { x: number; y: number };
  onChange: (value: string) => void;
  onClose: () => void;
}

export const PickerColorModal: FC<PickerColorModalProps> = ({
  value,
  modalPosition,
  onChange,
  onClose,
}) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className="absolute w-[200px] h-[150px] rounded-lg bg-blue-600/70"
      style={{
        top: modalPosition.y,
        left: modalPosition.x,
      }}>
      <div onClick={onClose} className="font-bold cursor-pointer ml-[105%]">
        X
      </div>
      <div>Выберите цвет:</div>
      <input type="color" value={value} onChange={onChangeHandler} />
    </div>
  );
};
