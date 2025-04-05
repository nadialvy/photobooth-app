import { filterMap } from "@/constants/filterFormula";

export const takePhoto = (
  video: HTMLVideoElement,
  selectedFilter: keyof typeof filterMap
): string | null => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");
  if (!context) return null;

  // Apply filter from map
  context.filter = filterMap[selectedFilter];

  // rio pake css anjai zzz
  if (selectedFilter === "rio") {
    const gradient = context.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "rgba(255, 94, 58, 0.5)");
    gradient.addColorStop(0.33, "rgba(220, 148, 155, 0.5)");
    gradient.addColorStop(0.66, "rgba(146, 101, 169, 0.5)");
    gradient.addColorStop(1, "rgba(152, 184, 255, 0.5)");

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalCompositeOperation = "overlay";
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Flip horizontally, trust me ladies will love this xixixi
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(video, 0, 0);
  context.setTransform(1, 0, 0, 1, 0, 0);

  return canvas.toDataURL("image/jpeg");
};

export const getVideoElement = (): HTMLVideoElement | null => {
  return document.querySelector("video");
};
