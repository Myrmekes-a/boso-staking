"use client";

import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { NftType } from "@/app/dashboard/loyalty/page";
import { useLoyalty } from "@/app/context/LoyaltyContext";

const Nft = ({ nft }: { nft: NftType }) => {
  const { setIsGlobalDragging } = useLoyalty();

  const [isDragging, setIsDragging] = useState(false);

  const [mouseDown, setMouseDown] = useState(false);
  return (
    <div
      className={`${
        mouseDown ? "animate-nft-mouse-down" : "animate-nft-mouse-up"
      } w-full h-full  rounded-[0.8rem] flex center cursor-grab z-10   ${
        isDragging ? "opacity-[0.001] cursor-grabbing " : ""
      } `}
      /* ${mouseDown ? "!w-[100px] !h-[100px]" : ""} */
      draggable={true}
      onMouseDown={(e) => {
        e.stopPropagation();
        setMouseDown(true);
      }}
      onMouseUp={(e) => {
        setMouseDown(false);
      }}
      onDragStart={(e) => {
        const element = e.target as HTMLDivElement;
        const { width, height } = element.getBoundingClientRect();

        // Calcola le coordinate del centro rispetto all'elemento
        const offsetX = width / 2;
        const offsetY = height / 2;

        // Imposta i dati da trascinare
        e.dataTransfer.setDragImage(element, offsetX, offsetY);
        setIsDragging(true);
        setIsGlobalDragging(true);

        e.dataTransfer.setData("nft", nft.id.toString());
      }}
      onDragEnd={(e) => {
        setIsGlobalDragging(false);
        setIsDragging(false);
        setMouseDown(false);
      }}
    >
      <div
        className={` w-full h-full relative border-[2.75px] border-black rounded-[0.8rem]  transition-all duration-1000 overflow-hidden`}
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
