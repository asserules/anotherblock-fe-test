"use client"

import { Song } from "../types"
import { useQuery } from "@tanstack/react-query"
import React, { useState, useEffect } from "react"
import bgblack from "../assets/images/bgblack.png"
import bgred from "../assets/images/bgred.png"
import Image from "next/image"
import { motion } from "framer-motion"
import LoadingGhost from "./LoadingGhost"

async function getSongs() {
  return (await fetch("https://cdn.anotherblock.io/mock-data.json").then(
    (res) => res.json()
  )) as Song[]
}

// async function getSongs() {
//   const response = await fetch("https://cdn.anotherblock.io/mock-data.json")
//   const data = await response.json()

//   // Artificial delay
//   await new Promise((resolve) => setTimeout(resolve, 8000))

//   return data as Song[]
// }

const formatStreams = (streams: number): string => {
  if (streams < 1000) {
    return streams.toString()
  } else if (streams < 1000000) {
    return Math.floor(streams / 1000) + "k"
  } else {
    return (streams / 1000000).toFixed(1) + "m"
  }
}

const formatString = (input: string, maxLength: number = 15): string => {
  if (input.length <= maxLength) {
    return input.toUpperCase()
  }

  return input.slice(0, maxLength).toUpperCase() + "..."
}

type AnimationProps = {
  opacity: number
  x?: number
}

type ItemType = {
  show: AnimationProps
  hidden: AnimationProps
}

type SongItemProps = {
  song: Song
  i: number
  item: ItemType
}

const SongItem: React.FC<SongItemProps> = ({ song, i, item }) => {
  const [isHovered, setIsHovered] = useState(false)
  song.color = i % 3 === 0 ? "red" : "black"

  return (
    <motion.div
      variants={item}
      key={song.id}
      className={`
        flex w-full h-full justify-center items-center p-[5%] md:p-[15%] text-xs relative
        ${
          (i - 2) % 3 === 0
            ? "row-span-2 col-span-2 md:row-span-1 md:col-span-1 lg:row-span-1 lg:col-span-1"
            : ""
        }
        ${
          (i - 3) % 6 === 0
            ? "row-span-1 col-span-1 md:row-span-2 md:col-span-2 lg:row-span-1 lg:col-span-1"
            : ""
        }
        ${
          (i - 4) % 9 === 0
            ? "row-span-1 col-span-1 md:row-span-1 md:col-span-1 lg:row-span-2 lg:col-span-2"
            : ""
        }
      `}
    >
      <div className="w-full h-full absolute top-0 left-0 z-0">
        <Image
          src={song.color === "red" ? bgred : bgblack}
          alt="bg"
          layout="fill"
        />
      </div>
      <div
        className="flex flex-col justify-center items-center z-10 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <video
            src={song.video}
            autoPlay
            loop
            muted
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src={song.image}
            alt="Random unsplash img"
            className="object-cover w-full h-full"
          />
        )}

        <div className="flex flex-row justify-between w-full mt-2">
          <div className="text-[14px] font-bold">
            {formatString(song.track)}
          </div>
          <div className="text-[12px]">
            {formatStreams(song.streams.total)} total streams
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="text-[10px]">/{formatString(song.artist)}</div>
          <div className="text-[12px] text-[#8D8D8D]">
            {formatStreams(song.streams.monthly)} monthly
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ListSongs() {
  const { data, isLoading, isFetching, error } = useQuery<Song[]>({
    queryKey: ["hydrate-users"],
    queryFn: () => getSongs(),
    suspense: true,
    staleTime: 5 * 1000,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [searchUpdated, setSearchUpdated] = useState(false)

  useEffect(() => {
    if (data) {
      let results = data
      if (searchTerm) {
        results = data.filter(
          (song) =>
            song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.track.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      setFilteredSongs(results)
      setSearchUpdated(true)
    }
  }, [data, searchTerm])

  useEffect(() => {
    if (data) {
      setIsDataLoaded(true)
    }
  }, [data])

  useEffect(() => {
    if (isDataLoaded || searchUpdated) {
      const timeoutId = setTimeout(() => {
        setSearchUpdated(false)
      }, 500) // Adjust delay to match animation duration
      return () => clearTimeout(timeoutId)
    }
  }, [isDataLoaded, searchUpdated])

  const list = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // here you control the delay between each child's animation start
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-[100px] bg-black flex-col items-center justify-center flex">
        <div className="flex w-[80%] h-[50%] border-b-2 border-white justify-center items-center">
          <input
            type="text"
            placeholder="filter on artist or track"
            value={searchTerm}
            className="w-full h-full bg-transparent text-white text-left text-2xl placeholder:text-white mb-5"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      {error ? (
        <p>Oh no, there was an error</p>
      ) : !isFetching || !isLoading ? (
        <LoadingGhost count={12} />
      ) : filteredSongs ? (
        <motion.div
          key={searchTerm} // re render on search term change vilket leder till ny staggerin animation
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white"
          variants={list}
          initial="hidden"
          animate={isDataLoaded ? "show" : "hidden"}
        >
          {filteredSongs.map((song, i) => (
            <SongItem song={song} i={i} key={song.id} item={item} />
          ))}
        </motion.div>
      ) : null}
    </div>
  )
}
