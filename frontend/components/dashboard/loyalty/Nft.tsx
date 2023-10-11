"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { NftType } from "@/app/dashboard/loyalty/page";

const Nft = ({
  nft,
  setGlobalDragging,
}: {
  nft: NftType;
  setGlobalDragging: (isDragging: boolean) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div
      className={`w-full h-full  rounded-[0.8rem] flex center cursor-grab z-10 nftdraggable ${
        isDragging ? "opacity-[0.001] cursor-grabbing" : ""
      }`}
      draggable={true}
      onMouseDown={(e) => {
        e.stopPropagation();
        console.log("mouse down");
      }}
      onDragStart={(e) => {
        setIsDragging(true);
        setGlobalDragging(true);
        console.log("drag enter");
        e.dataTransfer.setData("nft", nft.id.toString());
      }}
      onDragEnd={(e) => {
        console.log("drag leave");
        setGlobalDragging(false);
        setIsDragging(false);
      }}
    >
      <div
        className={`w-full h-full relative border-[2.75px] border-black rounded-[0.8rem]  transition-all duration-1000 overflow-hidden`}
      >
        <Image
          src={nft.image}
          alt="nft"
          className={``}
          fill
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Nft;
