import React from "react";

// make props of options
export interface OptionsProps {
  numberPhotos: number;
  timer: number;
  setTimer: (number: number) => void;
  increasePhotos: () => void;
  decreasePhotos: () => void;
}

export default function Options({
  numberPhotos,
  timer,
  setTimer,
  increasePhotos,
  decreasePhotos,
}: OptionsProps) {
  return (
    <div className="w-1/2">
      <p className="text-[28px] text-[#8f73d1] ">Options</p>
      <div>
        <p className="text-[#8f73d1] font-quicksand font-bold text-[20px]">
          Number of Photos
        </p>
        <div className="flex bg-[#fddeea] border-4 border-[#efb4e1] px-4 py-2 rounded-full gap-2 justify-between items-center">
          <p
            onClick={decreasePhotos}
            className="hover:cursor-pointer text-[#674f9e] text-[20px]"
          >
            -
          </p>
          <p className="text-[#674f9e] text-[20px]">{numberPhotos}</p>
          <p
            onClick={increasePhotos}
            className="hover:cursor-pointer text-[#674f9e] text-[20px]"
          >
            +
          </p>
        </div>
      </div>
      <div className="">
        <p className="text-[#8f73d1] font-quicksand font-bold text-[20px]">
          Timer
        </p>
        <div className="flex bg-[#fddeea] border-4 border-[#efb4e1] px-4 py-2 rounded-full gap-2 justify-between items-center">
          <select
            className="bg-transparent w-full text-[#674f9e] text-[20px] outline-none"
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
  );
}
