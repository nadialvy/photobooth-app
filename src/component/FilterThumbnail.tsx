"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";

interface FilterThumbnailProps {
  label: string;
  bgClass: string;
  selected: boolean;
  onClick: () => void;
}

const FilterThumbnail: FC<FilterThumbnailProps> = ({
  label,
  bgClass,
  selected,
  onClick,
}) => {
  return (
    <div
      className={cn("relative w-[70px] h-[70px] bg-center bg-cover bg-no-repeat hover:cursor-pointer flex justify-end items-end rounded-lg",
        bgClass, selected ? "border-2 border-white" : "")}
      onClick={onClick}
    >
      <p className="text-white z-10 text-[12px] font-semibold mx-auto text-center font-quicksand">
        {label}
      </p>
      {selected && (
        <div className="absolute inset-0 bg-black rounded-lg bg-opacity-35 z-0 h-full w-full" />
      )}
    </div>
  );
};

export default FilterThumbnail;
