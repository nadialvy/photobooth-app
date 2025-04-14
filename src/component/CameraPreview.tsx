"use client";

import { useEffect, useRef, useState } from "react";

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
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 720 },
            height: { ideal: 960 },
            aspectRatio: { ideal: 4 / 3 },
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraReady(true);
        }
      } catch (error) {
        console.error("Failed to access camera:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        for (const track of tracks) {
          track.stop();
        }
      }
    };
  }, []);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-frame"
        style={{
          filter: cssFilter,
          aspectRatio: "3/4",
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
      {filter === "rio" && (
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none rio-overlay" />
      )}
    </div>
  );
}
