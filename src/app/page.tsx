"use client";
import Image from "next/image";
import { useState } from "react";
import CameraPreview from "@/component/camera/CameraPreview";
import FilterSelector from "@/component/settings/FilterSelector";
import Options from "@/component/settings/Options";
import PhotoPreview from "@/component/settings/PhotoPreview";
import { getVideoElement, takePhoto } from "@/lib/photoUtils";
export default function Home() {
  const [countdownDisplay, setCountdownDisplay] = useState<number | null>(null);
  const [numberPhotos, setNumberPhotos] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<
    "none" | "grayscale" | "fairy" | "pinkGlow" | "rio"
  >("none");
  const [timer, setTimer] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);

  const increasePhotos = () => {
    if (numberPhotos < 4) {
      setNumberPhotos(numberPhotos + 1);
    }
  };
  const decreasePhotos = () => {
    if (numberPhotos > 1) {
      setNumberPhotos(numberPhotos - 1);
    }
  };

  const capturePhoto = async () => {
    if (timer > 0) {
      let currentCount = timer;
      const countdownInterval = setInterval(() => {
        currentCount -= 1;
        if (currentCount === 0) {
          clearInterval(countdownInterval);
          doTakePhoto();
          setCountdownDisplay(null);
        } else {
          setCountdownDisplay(currentCount);
        }
      }, 1000);

      setCountdownDisplay(timer);
      return;
    }

    doTakePhoto();
  };

  const doTakePhoto = () => {
    const video = getVideoElement();
    if (!video) return;

    const photoData = takePhoto(video, selectedFilter);
    if (!photoData) return;

    setCapturedPhotos((prev) => {
      const emptyIndex = prev.findIndex((photo) => photo === "");
      if (emptyIndex !== -1) {
        const newPhotos = [...prev];
        newPhotos[emptyIndex] = photoData;
        return newPhotos;
      }
      return [...prev, photoData];
    });
  };

  const deletePhoto = (index: number) => {
    setCapturedPhotos((prev) => {
      const newPhotos = [...prev];
      newPhotos[index] = "";
      return newPhotos;
    });
  };

  return (
    <div className="w-full p-6 flex flex-col justify-center items-center bg-gradientCloud bg-cover bg-center bg-no-repeat h-screen font-[family-name:var(--font-lilita-one)]">
      <div className="inset-0 absolute bg-black bg-opacity-5 z-0 h-screen w-full"></div>
      <p
        className="text-[48px] text-[#fcd3d2] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
"
      >
        Self Photobooth
      </p>
      <div className="w-full z-10 h-full flex justify-center items-center">
        <div className="w-1/2 h-full relative">
          <div className="relative w-full h-full flex justify-center items-center">
            <Image
              src="/images/frame.png"
              alt="Photobooth"
              width={500}
              height={500}
              className="w-full h-full z-10"
            />
            <CameraPreview
              filter={selectedFilter}
              className="absolute top-[13%] z-0 left-[13%] w-[450px] h-[430px]"
            />
          </div>
          <Image
            onClick={capturePhoto}
            src="/images/camera-button.png"
            alt="button"
            width={240}
            height={240}
            className="absolute hover:cursor-pointer hover:brightness-75 transition-all duration-200 z-50 bottom-[22%] left-[50%] translate-x-[-50%] translate-y-[50%] object-cover"
          />
          <div className="absolute top-0 z-0 right-0 w-[450px] h-[430px] flex justify-center items-center">
            {countdownDisplay && (
              <span className="text-[40px] font-bold text-white bg-[#8f73d1] bg-opacity-70 rounded-full w-[90px] h-[90px] flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-pulse">
                {countdownDisplay}
              </span>
            )}
          </div>
        </div>
        <div className="w-1/2 gap-4 bg-gradientSettings border-[8px]  border-[#efb4e1] bg-cover bg-center bg-no-repeat rounded-3xl p-6 h-full flex flex-col justify-start items-start">
          <PhotoPreview
            numberPhotos={numberPhotos}
            capturedPhotos={capturedPhotos}
            deletePhoto={deletePhoto}
          />
          <div className="flex gap-4 w-full justify-center items-start">
            <FilterSelector
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <Options
              numberPhotos={numberPhotos}
              timer={timer}
              setTimer={setTimer}
              increasePhotos={increasePhotos}
              decreasePhotos={decreasePhotos}
            />
          </div>
          <div className="bg-[#fddeea] border-4 border-[#efb4e1] hover:cursor-pointer transition-all duration-300 hover:bg-[#efcdda] px-4 py-2 rounded-full w-full flex gap-2 justify-center items-center">
            <p className="font-lilita text-[20px] text-[#a285e4]">
              Print your photos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
