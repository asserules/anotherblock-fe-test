"use client"
import { Song } from "../types"
import { useQuery } from "@tanstack/react-query"
import React, { useState, useEffect } from "react"
import bgblack from "../assets/images/bgblack.png"
import bgred from "../assets/images/bgred.png"
import Image from "next/image"
import { motion } from "framer-motion"

const formatStreams = (streams: number): string => {
  if (streams < 1000) {
    return streams.toString()
  } else if (streams < 1000000) {
    return Math.floor(streams / 1000) + "k"
  } else if (streams < 10000000) {
    return (streams / 1000000).toFixed(1) + "m"
  } else {
    return Math.floor(streams / 1000000) + "m"
  }
}

const formatString = (input: string, maxLength: number = 12): string => {
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
              ? "row-span-2 col-span-2 md:row-span-1 md:col-span-1 xl:row-span-1 xl:col-span-1"
              : ""
          }
          ${
            (i - 3) % 6 === 0
              ? "row-span-1 col-span-1 md:row-span-2 md:col-span-2 xl:row-span-1 xl:col-span-1"
              : ""
          }
          ${
            (i - 4) % 9 === 0
              ? "row-span-1 col-span-1 md:row-span-1 md:col-span-1 xl:row-span-2 xl:col-span-2"
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
          <div className="text-[8px] sm:text-[14px] md:text-[11px] xl:text-[14px] font-bold">
            {formatString(song.track)}
          </div>
          <div className="text-[7px] sm:text-[12px] md:text-[9px] xl:text-[12px]">
            {formatStreams(song.streams.total)} total streams
          </div>
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="  text-[7px] sm:text-[10px] md:text-[7px] xl:text-[10px]">
            /{formatString(song.artist)}
          </div>
          <div className="  text-[7px] sm:text-[12px] md:text-[9px] xl:text-[12px] text-[#8D8D8D]">
            {formatStreams(song.streams.monthly)} monthly
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SongItem
