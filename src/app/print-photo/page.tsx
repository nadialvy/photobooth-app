"use client";
import { useEffect, useState } from "react";
import { generateFramedPhoto } from "@/lib/photoUtils";
import { frameConfig } from "@/constants/frameConfig";
import Link from "next/link";
import { ChevronLeft, LoaderCircle } from "lucide-react";

export default function PrintPhotoPage() {
  const [selectedFrame, setSelectedFrame] =
    useState<keyof typeof frameConfig>("polaroid2");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const photo = localStorage.getItem("latestPhoto");
    if (!photo) return;
    generateFramedPhoto(photo, selectedFrame).then(setPreview);
  }, [selectedFrame]);

  const downloadImage = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.download = "photobooth.png";
    link.href = preview;
    link.click();
  };

  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen p-6 bg-gradientCloud bg-cover font-[family-name:var(--font-lilita-one)] bg-center bg-no-repeat">
      <div className="w-full flex-col p-4 lg:w-1/2 flex justify-start items-start">
        <Link
          href="/"
          className="flex justify-start items-center hover:bg-opacity-20 rounded-lg hover:bg-white px-2 py-1 transition-all duration-200"
        >
          <ChevronLeft color="#8f73d1" size={24} />
          <p className="font-quicksand font-medium text-lavender drop-shadow-[0_0.4px_0.2px_rgba(0,0,0,0.8)]">
            {" "}
            Back to photobooth
          </p>
        </Link>
        {preview ? (
          <div className="p-12">
            <img
              src={preview}
              alt="Framed Photo"
              className="max-w-full rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <LoaderCircle
            className="mx-auto h-full animate-spin"
            color="#8f73d1"
            size={32}
          />
        )}
        <button
          onClick={downloadImage}
          className="mt-6 w-full px-4 py-2 bg-wisteria text-white rounded-lg shadow hover:brightness-110 transition"
        >
          Download
        </button>
      </div>
      <div className="w-full lg:w-1/2 max-lg:mt-6 border-[8px] border-blossom p-4 bg-gradientSettings rounded-3xl">
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
      </div>
    </div>
  );
}
