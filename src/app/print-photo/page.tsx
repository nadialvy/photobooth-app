"use client";
import { useEffect, useState } from "react";
import { generateFramedPhoto } from "@/lib/photoUtils";
import { frameConfig } from "@/constants/frameConfig";

export default function PrintPhotoPage() {
  const [photo] = useState<string>(
    () => localStorage.getItem("latestPhoto") ?? ""
  );
  const [selectedFrame, setSelectedFrame] =
    useState<keyof typeof frameConfig>("polaroid2");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) return;
    generateFramedPhoto(photo, selectedFrame).then(setPreview);
  }, [photo, selectedFrame]);

  const downloadImage = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.download = "photobooth.png";
    link.href = preview;
    link.click();
  };

  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen p-6 bg-gradientCloud bg-cover bg-center bg-no-repeat">
      <div className="w-full p-12 lg:w-1/2 flex justify-center items-center">
        {preview ? (
          <img
            src={preview}
            alt="Framed Photo"
            className="max-w-full rounded-lg shadow-lg"
          />
        ) : (
          <p>Loading preview...</p>
        )}
      </div>
      <div className="w-full lg:w-1/2 mt-6 p-4 bg-gradientSettings rounded-xl">
        <p className="text-[28px] text-[#8f73d1] mb-2">Select Frame</p>
        <div className="flex gap-4">
          {Object.entries(frameConfig).map(([id, frame]) => (
            <div
              key={id}
              onClick={() => setSelectedFrame(id as keyof typeof frameConfig)}
              className={`w-[100px] h-[100px] p-1 rounded-lg cursor-pointer transition ${
                selectedFrame === id ? "border-4 border-white" : "opacity-60"
              }`}
            >
              <img
                src={frame.path}
                alt={id}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
        <button
          onClick={downloadImage}
          className="mt-6 px-4 py-2 bg-wisteria text-white rounded-lg shadow hover:brightness-110 transition"
        >
          Download
        </button>
      </div>
    </div>
  );
}
