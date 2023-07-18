import React from "react"
import { Suspense } from "react"
import ListSongs from "./components/list-songs"
import LoadingGhost from "./components/LoadingGhost"

export default async function Home() {
  return (
    <div className="w-full min-h-full flex flex-col">
      <div className="flex w-full h-full">
        <Suspense fallback={<LoadingGhost count={4} />}>
          <ListSongs />
        </Suspense>
      </div>
    </div>
  )
}

{
  /* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`
            flex w-full h-full bg-white justify-center items-center p-[5%] md:p-[15%] text-xs
            ${
              (i - 2) % 3 === 0 // 2, 6, 10, 14, 18, 22
                ? "row-span-2 col-span-2 md:row-span-1 md:col-span-1 lg:row-span-1 lg:col-span-1"
                : ""
            }
            ${
              (i - 3) % 6 === 0 // 3, 9, 15, 21
                ? "row-span-1 col-span-1 md:row-span-2 md:col-span-2 lg:row-span-1 lg:col-span-1"
                : ""
            }
            ${
              (i - 4) % 9 === 0 // 4, 13, 22
                ? "row-span-1 col-span-1 md:row-span-1 md:col-span-1 lg:row-span-2 lg:col-span-2"
                : ""
            }
          `}
            >
              <div className="flex flex-col justify-center items-center">
                <img
                  src={`https://artwork.anotherblock.io/medium/drop_2.png`}
                  alt="Random unsplash img"
                  className="object-cover w-full h-full"
                />

                <div className="flex flex-row justify-between w-full mt-2">
                  <div>Aqquainted</div>
                  <div>346k total streams</div>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div>Aqquainted</div>
                  <div>346k total streams</div>
                </div>
              </div>
            </div>
          ))}
        </div> */
}
