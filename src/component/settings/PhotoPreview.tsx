import React from 'react'
import Image from 'next/image'

// add props to photoPreview
export interface PhotoPreviewProps {
  numberPhotos: number
  capturedPhotos: string[]
  deletePhoto: (index: number) => void
}

export default function PhotoPreview({numberPhotos, capturedPhotos, deletePhoto}: PhotoPreviewProps) {
  return (
    <div>
      <p className="text-[28px] text-[#8f73d1] drop-shadow-[0_1.2px_1.2px_#ffe1cd]">
        Photo Preview
      </p>
      <div className="flex gap-3 mt-3 justify-start items-start">
        {Array.from({ length: numberPhotos }, (_, idx) => (
          <div
            key={idx}
            className="bg-[#ffdada] border-2 border-[#efb4e1] w-[120px] h-[120px] rounded-lg overflow-hidden"
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
                  className="p-1 rounded-full absolute z-50 -top-1 right-[2%] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] hover:cursor-pointer text-[#f9cbcb] group"
                  title="Re-take the picture"
                  onClick={() => deletePhoto(idx)}
                >
                  x
                  <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-[#674f9e] text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    Re-take the picture
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
