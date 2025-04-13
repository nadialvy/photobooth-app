"use client";
import Image from "next/image";
import { useState } from "react";
import { filterMap } from "../constants/filterFormula";
import FilterThumbnail from "@/component/FilterThumbnail";
import CameraPreview from "@/component/CameraPreview";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Filter = "none" | "grayscale" | "fairy" | "pinkGlow" | "rio";

const FLASH_INITIAL_DELAY = 250; // Milliseconds to wait before showing the flash effect
const FLASH_DURATION = 100; // Milliseconds that the flash remains fully visible
const FLASH_FADE_DURATION = 50; // Milliseconds for the flash to fade out (must be less than FLASH_DURATION)

export default function Home() {
  const [countdownDisplay, setCountdownDisplay] = useState<number | null>(null);
  const [numberPhotos, setNumberPhotos] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<Filter>("none");

  function onFilterChange(filter: Filter) {
    if (countdownDisplay) return null;
    setSelectedFilter(filter);
  }

  const increasePhotos = () => {
    if (countdownDisplay) return null;
    if (numberPhotos < 4) {
      setNumberPhotos(numberPhotos + 1);
    }
  };
  const decreasePhotos = () => {
    if (countdownDisplay) return null;
    if (numberPhotos > 1) {
      setNumberPhotos(numberPhotos - 1);
    }
  };

  const [timer, setTimer] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const capturePhoto = async () => {
    // prevent photo capture when the timer is active
    if (countdownDisplay) return null;
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

    // Create and setup flash element
    const flash = createFlashElement();
    video.style.position = "relative";
    video.insertAdjacentElement("afterend", flash);

    captureWithFlashEffect(video, flash);
  };

  const createFlashElement = () => {
    const flash = document.createElement("div");
    const flashStyles = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      opacity: "0",
      transition: `opacity ${FLASH_FADE_DURATION}ms ease-in-out`,
      pointerEvents: "none",
    };

    Object.assign(flash.style, flashStyles);
    return flash;
  };

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const captureWithFlashEffect = async (
    videoElement: HTMLVideoElement,
    flash: HTMLDivElement,
  ) => {
    // Play camera sound
    playShutterSound();

    // Execute flash sequence
    await executeFlashSequence(flash);

    // Capture the photo
    const photoData = capturePhotoFromVideo(videoElement);
    if (!photoData) return;

    // Save the captured photo
    savePhotoToState(photoData);

    // Complete flash sequence
    await completeFlashSequence(flash);
  };

  const playShutterSound = () => {
    const audio = new Audio("/audios/cam_snap.mp3");
    audio.play();
  };

  const executeFlashSequence = async (flash: HTMLDivElement) => {
    await wait(FLASH_INITIAL_DELAY);
    requestAnimationFrame(() => (flash.style.opacity = "1"));
    await wait(FLASH_DURATION / 2);
  };

  const capturePhotoFromVideo = (videoElement: HTMLVideoElement) => {
    const canvas = document.createElement("canvas");
    // make photo 4:3
    canvas.width = 960;
    canvas.height = 720;

    const context = canvas.getContext("2d");
    if (!context) return null;

    const sx = (videoElement.videoWidth - canvas.width) / 2;
    const sy = 0;

    // Apply filter
    context.filter = filterMap[selectedFilter];

    // Apply special effects for specific filters
    applySpecialFilterEffects(context, canvas);

    // Flip the image horizontally, trust me the ladies will love it 😆 🏻
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(
      videoElement,
      sx,
      sy,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    context.setTransform(1, 0, 0, 1, 0, 0);
    return canvas.toDataURL("image/jpeg");
  };

  const applySpecialFilterEffects = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
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
  };

  const savePhotoToState = (photoData: string) => {
    setCapturedPhotos((prev) => {
      const emptyIndex = prev.findIndex((photo) => photo === "");
      let newPhotos: string[];

      if (emptyIndex !== -1) {
        newPhotos = [...prev];
        newPhotos[emptyIndex] = photoData;
      } else {
        newPhotos = [...prev, photoData];
      }

      localStorage.setItem("latestPhoto", newPhotos[newPhotos.length - 1]);

      return newPhotos;
    });
  };

  const completeFlashSequence = async (flash: HTMLDivElement) => {
    await wait(FLASH_DURATION / 2);
    flash.style.opacity = "0";
    flash.remove();
  };

  const deletePhoto = (index: number) => {
    setCapturedPhotos((prev) => {
      const newPhotos = [...prev];
      newPhotos[index] = "";

      // Cek apakah foto yang dihapus adalah latestPhoto
      const deletedPhoto = prev[index];
      const latestPhoto = localStorage.getItem("latestPhoto");

      if (latestPhoto === deletedPhoto) {
        localStorage.removeItem("latestPhoto");
      }

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
            className={cn(
              "absolute max-md:w-32 transition-all duration-200 z-50 bottom-[22%] left-[50%] translate-x-[-50%] translate-y-[50%] object-cover",
              countdownDisplay
                ? "hover:cursor-not-allowed brightness-75"
                : "hover:cursor-pointer hover:brightness-75"
            )}
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
                  key={capturedPhotos[idx] || `photo-${idx}`}
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
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') deletePhoto(idx); }}
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
              <div
                className={cn(
                  "flex flex-col gap-2 items-center justify-center",
                  countdownDisplay && "hover:pointer-events-none opacity-60"
                )}
              >
                <div className="flex w-full justify-start gap-2 items-center">
                  <div
                    className={`relative w-[70px] h-[70px] bg-center bg-cover bg-no-repeat hover:cursor-pointer flex justify-end items-end rounded-lg bg-filterNone ${
                      selectedFilter ? "border-2 border-white" : ""
                    }`}
                    onClick={() => onFilterChange("none")}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onFilterChange("none"); }}
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
                    onClick={() => onFilterChange("grayscale")}
                  />
                  <FilterThumbnail
                    label="Fairy"
                    bgClass="bg-filterFairy"
                    selected={selectedFilter === "fairy"}
                    onClick={() => onFilterChange("fairy")}
                  />
                </div>
                <div className=" flex w-full justify-start gap-2 items-center">
                  <FilterThumbnail
                    label="Pink Glow"
                    bgClass="bg-filterPinkGlow"
                    selected={selectedFilter === "pinkGlow"}
                    onClick={() => onFilterChange("pinkGlow")}
                  />
                  <FilterThumbnail
                    label="Rio de Janeiro"
                    bgClass="bg-filterRio"
                    selected={selectedFilter === "rio"}
                    onClick={() => onFilterChange("rio")}
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
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <p
                    onClick={decreasePhotos}
                    className={cn(
                      "text-grape text-[20px]",
                      countdownDisplay
                        ? "cursor-not-allowed opacity-70"
                        : "hover:cursor-pointer"
                    )}
                  >
                    -
                  </p>
                  <p
                    className={cn(
                      "text-grape text-[20px]",
                      countdownDisplay && "opacity-70"
                    )}
                  >
                    {numberPhotos}
                  </p>
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <p
                    onClick={increasePhotos}
                    className={cn(
                      "text-grape text-[20px]",
                      countdownDisplay
                        ? "cursor-not-allowed opacity-70"
                        : "hover:cursor-pointer"
                    )}
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
                    className={cn(
                      "bg-transparent w-full text-grape text-[20px] outline-none",
                      countdownDisplay && "cursor-not-allowed"
                    )}
                    disabled={!!countdownDisplay}
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
          <Link
            href={countdownDisplay ? "/#" : "/print-photo"}
            className="w-full"
          >
            <div
              className={cn(
                "bg-ballet border-4 border-blossom transition-all duration-300 px-4 py-2 rounded-full w-full flex gap-2 justify-center items-center",
                countdownDisplay
                  ? "hover:cursor-not-allowed"
                  : "hover:cursor-pointer hover:bg-mauve"
              )}
            >
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
