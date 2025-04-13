export function convertFigmaToCanvasArea(figmaArea: { x: number; y: number; width: number; height: number; }, figmaSize: { width: number; height: number; }, canvasSize: { width: number; height: number; }) {
  const scaleX = canvasSize.width / figmaSize.width;
  const scaleY = canvasSize.height / figmaSize.height;

  return {
    x: Math.round(figmaArea.x * scaleX),
    y: Math.round(figmaArea.y * scaleY),
    width: Math.round(figmaArea.width * scaleX),
    height: Math.round(figmaArea.height * scaleY),
  };
}
