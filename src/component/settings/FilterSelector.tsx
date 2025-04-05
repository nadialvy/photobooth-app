import { filterOptions, FilterValue } from "@/constants/filterThumbnailData";
import React from "react";
import FilterThumbnail from "../filter/FilterThumbnail";

export default function filterSelector({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: FilterValue;
  setSelectedFilter: (filter: FilterValue) => void;
}) {
  return (
    <div className="w-1/2">
      <p className="text-[28px] text-[#8f73d1] drop-shadow-[0_1.2px_1.2px_#ffe1cd]">
        Filter
      </p>
      <div className="flex flex-col gap-2 items-center justify-center">
        {[0, 1].map((rowIndex) => (
          <div
            key={rowIndex}
            className="flex w-full justify-start gap-2 items-center"
          >
            {filterOptions
              .slice(rowIndex * 3, rowIndex * 3 + 3)
              .map((filter) => (
                <FilterThumbnail
                  key={filter.value}
                  label={filter.label}
                  bgClass={filter.bgClass}
                  selected={selectedFilter === filter.value}
                  onClick={() =>
                    setSelectedFilter(
                      filter.value as
                        | "none"
                        | "grayscale"
                        | "fairy"
                        | "pinkGlow"
                        | "rio"
                    )
                  }
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
