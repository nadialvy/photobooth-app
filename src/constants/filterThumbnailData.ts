export const filterOptions = [
  { label: "Normal", value: "none", bgClass: "bg-filterNone" },
  { label: "Black & White", value: "grayscale", bgClass: "bg-filterBnW" },
  { label: "Fairy", value: "fairy", bgClass: "bg-filterFairy" },
  { label: "Pink Glow", value: "pinkGlow", bgClass: "bg-filterPinkGlow" },
  { label: "Rio de Janeiro", value: "rio", bgClass: "bg-filterRio" },
];

export type FilterValue = "none" | "grayscale" | "fairy" | "pinkGlow" | "rio";
