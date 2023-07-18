import React from "react"

interface LoadingGhostProps {
  count: number
}

const LoadingGhost: React.FC<LoadingGhostProps> = ({ count }) => {
  const items = Array.from({ length: count })

  return (
    <div className="flex w-full h-[90vh] p-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white w-full h-full ">
        {items.map((_, i) => (
          <div
            key={i}
            className={`bg-gray-600 m-2 aspect-square rounded-xl"${
              (i - 2) % 3 === 0
                ? "row-span-2 col-span-2 md:row-span-1 md:col-span-1 lg:row-span-1 lg:col-span-1 aspect-square"
                : ""
            }
          ${
            (i - 3) % 6 === 0
              ? "row-span-1 col-span-1 md:row-span-2 md:col-span-2 lg:row-span-1 lg:col-span-1 aspect-square"
              : ""
          }
          ${
            (i - 4) % 9 === 0
              ? "row-span-1 col-span-1 md:row-span-1 md:col-span-1 lg:row-span-2 lg:col-span-2 aspect-square"
              : ""
          }`}
          >
            <div className="flex justify-center items-center w-full h-full">
              Hello
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingGhost
