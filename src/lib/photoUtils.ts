import { frameConfig } from "@/constants/frameConfig";
import html2canvas from "html2canvas";

export async function generateFramedPhoto(
  photoURL: string,
  frameId: keyof typeof frameConfig,
) {
  const frame = frameConfig[frameId];
  if (!frame) throw new Error("Invalid frame ID");

  const container = document.createElement("div");
  const photoDiv = document.createElement("div");
  const frameDiv = document.createElement("div");

  // Set common styles
  const commonStyles: Partial<CSSStyleDeclaration> = {
    position: "absolute",
    width: "100%",
    height: "100%",
  };

  // Apply styles to container. canvas size
  Object.assign(container.style, {
    position: "relative",
    width: `${frame.canvasSize.width}px`,
    height: `${frame.canvasSize.height}px`,
  });

  // Apply styles to photo div
  Object.assign(photoDiv.style, {
    ...commonStyles,
    left: `${frame.photoArea.x}px`,
    top: `${frame.photoArea.y}px`,
    width: `${frame.photoArea.width}px`,
    height: `${frame.photoArea.height}px`,
    backgroundImage: `url(${photoURL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  // Apply styles to frame div
  Object.assign(frameDiv.style, {
    ...commonStyles,
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${frame.path})`,
    backgroundSize: " cover",
    backgroundRepeat: "no-repeat",
  });

  // Assemble and render
  container.append(photoDiv, frameDiv);
  document.body.appendChild(container);

  const canvas = await html2canvas(container, {
    width: frame.canvasSize.width,
    height: frame.canvasSize.height,
    backgroundColor: null,
  });

  document.body.removeChild(container);
  return canvas.toDataURL("image/png");
}
