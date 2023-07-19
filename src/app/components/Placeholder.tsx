"use client"
import { Song } from "../types"
import { useQuery } from "@tanstack/react-query"
import React, { useState, useEffect } from "react"
import bgblack from "../assets/images/bgblack.png"
import Image from "next/image"
import { motion } from "framer-motion"
import AnimationText from "./AnimationText"

type AnimationProps = {
  opacity: number
  x?: number
}

type ItemType = {
  show: AnimationProps
  hidden: AnimationProps
}

type PlaceHolderItemProps = {
  i: number
  item: ItemType
}

const Placeholder: React.FC<PlaceHolderItemProps> = ({ i, item }) => {
  return (
    <motion.div
      variants={item}
      key={i}
      className={`
          flex w-full h-full justify-center items-center p-[5%] md:p-[15%] text-xs relative aspect-square
          ${
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
          }
        `}
    >
      <div className="w-full h-full absolute top-0 left-0 z-0">
        <Image src={bgblack} alt="bg" layout="fill" />
      </div>
      <div className="flex flex-col justify-center items-center z-10 relative">
        <div className="flex flex-row justify-between w-full mt-2 overflow-clip">
          <AnimationText />
        </div>
      </div>
    </motion.div>
  )
}

export default Placeholder
