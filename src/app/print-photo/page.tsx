import React from "react";

export default function PrintPhotoPage() {
  return (
    <div className="w-full p-6 flex flex-col justify-center items-center bg-gradientCloud bg-cover bg-center bg-no-repeat min-h-screen font-[family-name:var(--font-lilita-one)]">
      <div className="w-full lg:w-1/2">
        {/* preview photo with selected frame */}
      </div>
      <div className="w-full lg:w-1/2 mt-6">
        {/* frame selection with print photo -> download automatically and cta button to share to x */}
      </div>
    </div>
  );
}
