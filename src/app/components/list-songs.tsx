"use client"
import { Song } from "../types"
import { useQuery } from "@tanstack/react-query"
import React, { useState, useEffect } from "react"
import bgblack from "../assets/images/bgblack.png"
import bgred from "../assets/images/bgred.png"
import Image from "next/image"
import { motion } from "framer-motion"
import LoadingGhost from "./LoadingGhost"
import SongItem from "./SongItem"
import Placeholder from "./Placeholder"

async function getSongs() {
  return (await fetch("https://cdn.anotherblock.io/mock-data.json").then(
    (res) => res.json()
  )) as Song[]
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
  const [numPlaceholders, setNumPlaceholders] = useState<number>(0)

  function calculatePlaceholders(numItems: number): number {
    let placeholders: number = 0

    if (typeof window !== "undefined") {
      if (numItems === 0) {
        if (window.innerWidth <= 768) {
          placeholders = 3
        } else if (window.innerWidth <= 1280) {
          placeholders = 6
        } else {
          placeholders = 9
        }
      } else {
        let remainder: number

        if (window.innerWidth <= 768) {
          remainder = numItems % 5
          placeholders = [0, 3, 1, 2, 0][remainder]
        } else if (window.innerWidth <= 1280) {
          remainder = numItems % 3
          placeholders = [0, 2, 1][remainder]
        } else {
          remainder = numItems % 9
          placeholders = [0, 8, 7, 1, 0, 4, 3, 2, 1][remainder]
        }
      }
    }

    return placeholders
  }

  useEffect(() => {
    function handleResize() {
      setNumPlaceholders(calculatePlaceholders(filteredSongs.length))
    }

    window.addEventListener("resize", handleResize)
    // Call handleResize immediately to calculate the number of placeholders on component mount
    handleResize()

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [filteredSongs.length])

  useEffect(() => {
    if (data) {
      let results = data
      if (searchTerm) {
        results = data.filter(
          (song) =>
            song.artist
              .toLowerCase()
              .trim()
              .includes(searchTerm.toLowerCase().trim()) ||
            song.track
              .toLowerCase()
              .trim()
              .includes(searchTerm.toLowerCase().trim())
        )
      }
      setFilteredSongs(results)
      setIsDataLoaded(true)
    }
  }, [data, searchTerm])

  const list = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-[100px] bg-black flex-col items-center justify-center flex fixed top-0 z-[9999]">
        <div className="flex w-[80%] h-[50%] border-b-2 border-white justify-center items-center ">
          <input
            type="text"
            placeholder="filter on artist or track"
            value={searchTerm}
            className="w-full h-full bg-transparent text-white text-left text-2xl placeholder:text-white mb-5"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      <div className="mt-[100px]">
        {error ? (
          <p>Oh no, there was an error fetching our tracks</p>
        ) : //client side loading
        isFetching || isLoading ? (
          <LoadingGhost count={calculatePlaceholders(0)} header={false} />
        ) : filteredSongs ? (
          <motion.div
            key={searchTerm} // re render on search term change vilket leder till ny staggerin animation
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 text-white"
            variants={list}
            initial="hidden"
            animate={isDataLoaded ? "show" : "hidden"}
          >
            {filteredSongs.map((song, i) => (
              <SongItem song={song} i={i} key={song.id} item={item} />
            ))}
            {searchTerm == "" &&
              Array.from({ length: numPlaceholders }).map((_, i) => (
                <Placeholder i={filteredSongs.length + i} item={item} key={i} />
              ))}
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}
