
export type FilterType = "none" | "grayscale" | "fairy" | "pinkGlow" | "rio";

export const filterMap: Record<FilterType, string> = {
  none: "none",
  grayscale: "grayscale(100%)",
  fairy:
    "contrast(80%) grayscale(0%) sepia(1%) hue-rotate(-10deg) brightness(150%) invert(0%) opacity(93%) saturate(120%)",
  pinkGlow: "brightness(1.3) saturate(1.3) hue-rotate(-14deg)",
  rio: "brightness(1.15) saturate(1.4) contrast(0.95) sepia(0.1) hue-rotate(-5deg)",
};