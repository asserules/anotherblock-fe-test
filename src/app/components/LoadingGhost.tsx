"use client"
import React from "react"
import SpinningLogo from "./SpinningLogo"

interface LoadingGhostProps {
  count: number
  header?: boolean
}

const LoadingGhost: React.FC<LoadingGhostProps> = ({ count, header }) => {
  const items = Array.from({ length: count })

  return (
    <div className="flex w-full h-full flex-col items-center">
      (header &&{" "}
      <div className="w-full h-[100px] bg-black flex-col items-center justify-center flex fixed top-0 z-[9999]">
        <div className="flex w-[80%] h-[50%] border-b-2 border-white justify-center items-center ">
          <input
            type="text"
            placeholder="Loading..."
            className="w-full h-full bg-transparent text-white text-left text-2xl placeholder:text-white mb-5"
            disabled
          />
        </div>
      </div>
      )
      <div className="flex w-full h-[90vh] p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 text-white w-full h-full ">
          {items.map((_, i) => (
            <div
              key={i}
              className={`bg-gray-600 m-2 aspect-square rounded-xl"${
                (i - 2) % 3 === 0
                  ? "row-span-2 col-span-2 md:row-span-1 md:col-span-1 xl:row-span-1 xl:col-span-1 aspect-square"
                  : ""
              }
          ${
            (i - 3) % 6 === 0
              ? "row-span-1 col-span-1 md:row-span-2 md:col-span-2 xl:row-span-1 xl:col-span-1 aspect-square"
              : ""
          }
          ${
            (i - 4) % 9 === 0
              ? "row-span-1 col-span-1 md:row-span-1 md:col-span-1 xl:row-span-2 xl:col-span-2 aspect-square"
              : ""
          }`}
            >
              <div className="flex justify-center items-center w-full h-full">
                <SpinningLogo />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingGhost
