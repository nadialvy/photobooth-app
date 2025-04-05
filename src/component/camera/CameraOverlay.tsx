"use client";

type OverlayType = "none" | "rio";

export default function CameraOverlay({ type }: { type: OverlayType }) {
  if (type === "none") return null;

  return (
    <>
      {type === "rio" && (
        <div className="absolute inset-0 pointer-events-none z-20 rounded-lg bg-[linear-gradient(135deg,_rgba(255,94,58,0.2),_rgba(218,68,83,0.2),_rgba(143,38,196,0.2),_rgba(50,94,189,0.2))] mix-blend-overlay" />
      )}
    </>
  );
}
