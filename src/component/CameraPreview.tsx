"use client";

import { useEffect, useRef, useState } from "react";

export default function CameraPreview({ className }: { className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setIsCameraReady] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
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
    <div className={`${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-frame"
      />
    </div>
  );
}
