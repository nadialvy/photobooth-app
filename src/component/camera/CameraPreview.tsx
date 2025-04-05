"use client";

import { useEffect, useRef, useState } from "react";
import CameraOverlay from "./CameraOverlay";

export default function CameraPreview({
  className = "",
  filter = "none",
}: {
  className?: string;
  filter?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setIsCameraReady] = useState(false);
  const filterMap: Record<string, string> = {
    none: "none",
    grayscale: "grayscale(100%)",
    fairy:
      "contrast(80%) grayscale(0%) sepia(1%) hue-rotate(-10deg) brightness(150%) invert(0%) opacity(93%) saturate(120%)",
    pinkGlow: "brightness(1.3) saturate(1.3) hue-rotate(-14deg)",
    grain: "brightness(1.3) saturate(1.3) hue-rotate(-14deg)", // kalau ada grain
    rio: "brightness(1.15) saturate(1.4) contrast(0.95) sepia(0.1) hue-rotate(-5deg)", // kalau kamu pakai rio juga
  };

  const cssFilter = filterMap[filter] || "none";

  useEffect(() => {
    const videoElement = videoRef.current;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (videoElement) {
          videoElement.srcObject = stream;
          setIsCameraReady(true);
        }
      } catch (error) {
        console.error("Failed to access camera:", error);
      }
    };

    startCamera();

    return () => {
      if (videoElement?.srcObject) {
        const tracks = (videoElement.srcObject as MediaStream).getTracks();
        for (const track of tracks) {
          track.stop();
        }
      }
    };
  }, []);

  return (
    <div className={`${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-frame"
        style={{ filter: cssFilter }}
      />
      <CameraOverlay type={filter as "none" | "rio"} />
    </div>
  );
}
