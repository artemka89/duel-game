import { Coordinates } from "../types/types";

export function getRelativeCoordinates(
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  element: HTMLElement
): Coordinates {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}
