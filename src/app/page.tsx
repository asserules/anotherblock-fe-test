import React from "react"
import { Suspense } from "react"
import ListSongs from "./components/list-songs"
import LoadingGhost from "./components/LoadingGhost"

export default async function Home() {
  return (
    <div className="w-full min-h-full flex flex-col">
      <div className="flex w-full h-full">
        {/* server side loading */}
        <Suspense fallback={<LoadingGhost count={4} header={true} />}>
          <ListSongs />
        </Suspense>
      </div>
    </div>
  )
}
