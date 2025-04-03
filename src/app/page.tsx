import Image from "next/image";
export default function Home() {
  return (
    <div className="w-full p-6 flex flex-col justify-center items-center bg-gradientCloud bg-cover bg-center bg-no-repeat h-screen font-[family-name:var(--font-lilita-one)]">
      <div className="inset-0 absolute bg-black bg-opacity-15 z-0 h-screen w-full">
        {}
      </div>

      <p
        className="text-[48px] text-[#fcd3d2] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
"
      >
        Self Photobooth
      </p>
      <div className="w-full gap-4 z-10 h-full flex justify-center items-center">
        <div className="w-1/2 h-full relative">
          <Image
            src="/images/frame.png"
            alt="Photobooth"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          <Image
            src="/images/camera-button.png"
            alt="button"
            width={240}
            height={240}
            className="absolute bottom-[22%] left-[50%] translate-x-[-50%] translate-y-[50%] object-cover"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <div>
            <p className="text-[36px] text-[#8f73d1] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Frame
            </p>
            <div className="w-full h-full gap-3 flex justify-start items-start">
              <div className="w-[150px] h-[250px] border bg-purple-200">{}</div>
              <div className="w-[150px] h-[250px] border bg-purple-200">{}</div>
              <div className="w-[150px] h-[250px] border bg-purple-200">{}</div>
            </div>
          </div>
          <div className="flex w-full justify-center items-start">
            <div className="w-1/2">
              <p className="text-[36px] text-[#8f73d1] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Filter
              </p>
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="border flex w-full justify-around gap-2 items-center border-green-300">
                  <div className="bg-purple-500 rounded-lg w-[100px] h-[100px]">
                    1
                  </div>
                  <div className="bg-purple-500 rounded-lg w-[100px] h-[100px]">
                    2
                  </div>
                </div>
                <div className="border flex w-full justify-around gap-2 items-center border-green-300">
                  <div className="bg-purple-500 rounded-lg w-[100px] h-[100px]">
                    3
                  </div>
                  <div className="bg-purple-500 rounded-lg w-[100px] h-[100px]">
                    4
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <p className="text-[36px] text-[#8f73d1] ">
                Options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
