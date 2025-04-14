"use client";
import { useEffect, useState } from "react";
import { generateFramedPhoto } from "@/lib/photoUtils";
import { frameConfig } from "@/constants/frameConfig";
import Link from "next/link";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PrintPhotoPage() {
  const [selectedFrame, setSelectedFrame] =
    useState<keyof typeof frameConfig>("polaroid1");
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
      <div className="w-full flex-col border border-green-500 lg:w-2/5 flex justify-start items-start">
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
          <div className="border p-4 flex-1 relative border-pink-400 w-full h-full">
            <Image
              width={frameConfig[selectedFrame].canvasSize.width}
              height={frameConfig[selectedFrame].canvasSize.height}
              src={preview}
              alt="Framed"
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <div className="flex-1 relative w-full h-full">
            <LoaderCircle
              className="mx-auto h-full animate-spin"
              color="#8f73d1"
              size={32}
            />
          </div>
        )}
        <button
          type="button"
          onClick={downloadImage}
          className="mt-6 w-full px-4 py-2 bg-wisteria text-white rounded-lg shadow hover:brightness-110 transition"
        >
          Download
        </button>
      </div>
      <div className="w-full lg:w-3/5 max-lg:mt-6 border-[8px] border-blossom p-4 bg-gradientSettings rounded-3xl">
        <p className="text-[28px] text-[#8f73d1] mb-2">Select Frame</p>
        <div className="flex gap-4">
          {Object.entries(frameConfig).map(([id, frame]) => (
            <div
              key={id}
              onClick={() => setSelectedFrame(id as keyof typeof frameConfig)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedFrame(id as keyof typeof frameConfig);
                }
              }}
              className={cn(
                "w-[75px] h-[100px] text-bl p-1 rounded-lg cursor-pointer transition",
                selectedFrame === id ? "border-4 border-white" : "opacity-60"
              )}
            >
              <Image
                width={frame.canvasSize.width}
                height={frame.canvasSize.height}
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
