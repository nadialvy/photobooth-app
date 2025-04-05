"use client";
import Image from "next/image";
import { useState } from "react";
import { filterMap } from "../constant/filterFormula";
import FilterThumbnail from "@/component/FilterThumbnail";
import CameraPreview from "@/component/CameraPreview";
import Link from "next/link";
export default function Home() {
  const [countdownDisplay, setCountdownDisplay] = useState<number | null>(null);
  const [numberPhotos, setNumberPhotos] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<
    "none" | "grayscale" | "fairy" | "pinkGlow" | "rio"
  >("none");

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

  const [timer, setTimer] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const capturePhoto = async () => {
    if (timer > 0) {
      let currentCount = timer;
      const countdownInterval = setInterval(() => {
        currentCount -= 1;
        if (currentCount === 0) {
          clearInterval(countdownInterval);
          takePhoto();
          setCountdownDisplay(null);
        } else {
          setCountdownDisplay(currentCount);
        }
      }, 1000);

      setCountdownDisplay(timer);
      return;
    }

    // If no timer, take photo immediately
    takePhoto();
  };

  const takePhoto = () => {
    const video = document.querySelector("video");
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;
    const audio = new Audio("/audios/cam_snap.mp3");
    audio.play();

    // Apply filter
    context.filter = filterMap[selectedFilter];
    if (selectedFilter === "rio") {
      const gradient = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(255, 94, 58, 0.5)");
      gradient.addColorStop(0.33, "rgba(220, 148, 155, 0.5)");
      gradient.addColorStop(0.66, "rgba(146, 101, 169, 0.5)");
      gradient.addColorStop(1, "rgba(152, 184, 255, 0.5)");

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.globalCompositeOperation = "overlay";
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Flip the image horizontally, trust me the ladies will love it 😆✌🏻
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0);

    context.setTransform(1, 0, 0, 1, 0, 0);
    const photoData = canvas.toDataURL("image/jpeg");

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
    <div className="w-full p-6 flex flex-col justify-center items-center bg-gradientCloud bg-cover bg-center bg-no-repeat min-h-screen font-[family-name:var(--font-lilita-one)]">
      <p
        className="text-[48px] max-md:text-[30px] text-center text-blush drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
"
      >
        Self Photobooth
      </p>
      <div className="w-full flex-col lg:flex-row min-w-fit z-10 h-full flex justify-center items-center">
        <div className="lg:w-1/2 w-full h-full relative">
          <div className="relative w-full h-full flex justify-center items-center">
            <Image
              src="/images/frame.png"
              alt="Photobooth"
              width={500}
              height={500}
              className="w-full h-full z-10"
            />
            <div className="w-[70%] h-[70%] absolute left-[15%] top-[18%] z-0">
              <CameraPreview
                filter={selectedFilter}
                className="absolute top-0 z-0 left-0 w-full h-full"
              />
            </div>
          </div>
          <Image
            onClick={capturePhoto}
            src="/images/camera-button.png"
            alt="button"
            width={240}
            height={240}
            className="absolute max-md:w-32 hover:cursor-pointer hover:brightness-75 transition-all duration-200 z-50 bottom-[22%] left-[50%] translate-x-[-50%] translate-y-[50%] object-cover"
          />
          <div className="absolute top-0 z-0 right-0 w-[450px] h-[430px] flex justify-center items-center">
            {countdownDisplay && (
              <span className="text-[40px] font-bold text-white bg-lavender bg-opacity-70 rounded-full w-[90px] h-[90px] flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] animate-pulse">
                {countdownDisplay}
              </span>
            )}
          </div>
        </div>
        <div className="lg:w-1/2 w-full gap-4 bg-gradientSettings border-[8px] border-blossom bg-cover bg-center bg-no-repeat rounded-3xl p-6 h-full flex flex-col justify-start items-start">
          <div>
            <p className="text-[28px] max-md:text-[22px] text-lavender drop-shadow-[0_1.2px_1.2px_peach]">
              Photo Preview
            </p>
            <div className="flex gap-3 mt-3 justify-start max-md:flex-wrap items-start">
              {Array.from({ length: numberPhotos }, (_, idx) => (
                <div
                  key={idx}
                  className="bg-cotton border-2 border-blossom w-[60px] h-[60px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] rounded-lg overflow-hidden"
                >
                  {capturedPhotos[idx] && (
                    <div className="relative w-full h-full">
                      <Image
                        src={capturedPhotos[idx]}
                        alt={`Photo ${idx + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover z-30"
                      />
                      <div
                        className="p-1 rounded-full absolute z-50 -top-1 right-[2%] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] hover:cursor-pointer text-petal group"
                        title="Re-take the picture"
                        onClick={() => deletePhoto(idx)}
                      >
                        x
                        <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-grape text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                          Re-take the picture
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4 w-full justify-center items-start">
            <div className="w-full md:w-1/2">
              <p className="text-[28px] max-md:text-[22px] text-lavender drop-shadow-[0_1.2px_1.2px_peach]">
                Filter
              </p>
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="flex w-full justify-start gap-2 items-center">
                  <div
                    className={`relative w-[70px] h-[70px] bg-center bg-cover bg-no-repeat hover:cursor-pointer flex justify-end items-end rounded-lg bg-filterNone ${
                      selectedFilter ? "border-2 border-white" : ""
                    }`}
                    onClick={() => setSelectedFilter("none")}
                  >
                    <p className="text-white z-10 text-[12px] font-semibold mx-auto text-center font-quicksand">
                      {"Normal"}
                    </p>
                    {selectedFilter === "none" && (
                      <div className="absolute inset-0 bg-black rounded-lg bg-opacity-35 z-0 h-full w-full" />
                    )}
                  </div>
                  <FilterThumbnail
                    label="Black & White"
                    bgClass="bg-filterBnW"
                    selected={selectedFilter === "grayscale"}
                    onClick={() => setSelectedFilter("grayscale")}
                  />
                  <FilterThumbnail
                    label="Fairy"
                    bgClass="bg-filterFairy"
                    selected={selectedFilter === "fairy"}
                    onClick={() => setSelectedFilter("fairy")}
                  />
                </div>
                <div className=" flex w-full justify-start gap-2 items-center">
                  <FilterThumbnail
                    label="Pink Glow"
                    bgClass="bg-filterPinkGlow"
                    selected={selectedFilter === "pinkGlow"}
                    onClick={() => setSelectedFilter("pinkGlow")}
                  />
                  <FilterThumbnail
                    label="Rio de Janeiro"
                    bgClass="bg-filterRio"
                    selected={selectedFilter === "rio"}
                    onClick={() => setSelectedFilter("rio")}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[28px] text-lavender max-md:text-[22px]">
                Options
              </p>
              <div>
                <p className="text-lavender max-md:text-[16px] font-quicksand font-bold text-[20px]">
                  Number of Photos
                </p>
                <div className="flex bg-ballet border-4 border-blossom px-4 py-2 max-md:py-0 rounded-full gap-2 justify-between items-center">
                  <p
                    onClick={decreasePhotos}
                    className="hover:cursor-pointer text-grape text-[20px]"
                  >
                    -
                  </p>
                  <p className="text-grape text-[20px]">{numberPhotos}</p>
                  <p
                    onClick={increasePhotos}
                    className="hover:cursor-pointer text-grape text-[20px]"
                  >
                    +
                  </p>
                </div>
              </div>
              <div className="">
                <p className="text-lavender font-quicksand mt-2 max-md:text-[16px] font-bold text-[20px]">
                  Timer
                </p>
                <div className="flex bg-ballet border-4 border-blossom max-md:py-0 px-4 py-2 rounded-full gap-2 justify-between items-center">
                  <select
                    className="bg-transparent w-full text-grape text-[20px] outline-none"
                    value={timer}
                    onChange={(e) => setTimer(Number.parseInt(e.target.value))}
                  >
                    <option value={0}>0</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <Link href="/print-photo" className="w-full">
            <div className="bg-ballet border-4 border-blossom hover:cursor-pointer transition-all duration-300 hover:bg-mauve px-4 py-2 rounded-full w-full flex gap-2 justify-center items-center">
              <p className="font-lilita text-[20px] text-wisteria">
                Print your photos
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
