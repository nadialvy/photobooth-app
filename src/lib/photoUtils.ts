import { frameConfig } from "@/constants/frameConfig";
import { drawImageCover } from "@/helper/drawImageCover";

export async function generateFramedPhoto(photoURL: string, frameId: keyof typeof frameConfig) {
  const frame = frameConfig[frameId];
  if (!frame) throw new Error("Invalid frame ID");

  const canvas = document.createElement("canvas");
  canvas.width = frame.canvasSize.width;
  canvas.height = frame.canvasSize.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context error");

  const [photoImg, frameImg] = await Promise.all([
    loadImage(photoURL),
    loadImage(frame.path),
  ]);

  drawImageCover(
    ctx,
    photoImg,
    frame.photoArea.x,
    frame.photoArea.y,
    frame.photoArea.width,
    frame.photoArea.height
  );

  const { x, y, width, height } = frame.photoArea;
  ctx.drawImage(photoImg, x, y, width, height);

  ctx.drawImage(frameImg, 0, 0);

  return canvas.toDataURL("image/png");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // img.crossOrigin = "anonymous"; 
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
