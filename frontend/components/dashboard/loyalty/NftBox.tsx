"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "../Button";
import Nft from "./Nft";
import { NftType } from "@/app/dashboard/loyalty/page";

type NftBoxProps = {
  nfts: NftType[];
  unstakeNft: (nft_id: number) => void;
  isGlobalDragging: boolean;
  stakeAllNfts: () => void;
};

const NftBox = ({
  nfts,
  unstakeNft,
  isGlobalDragging,
  stakeAllNfts,
}: NftBoxProps) => {
  const boxRef = useRef<HTMLImageElement | null>(null);

  const [boxWidth, setBoxWidth] = React.useState(300);
  const [boxHeight, setBoxHeight] = React.useState(300);

  const [bounds, setBounds] = React.useState({} as DOMRect);

  const [isOvering, setIsOvering] = React.useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (box) {
      const boxW = box.clientWidth;
      const boxH = box.clientHeight;

      const boxBounds = box.getBoundingClientRect();

      setBoxWidth(boxW);
      setBoxHeight(boxH);
      setBounds(boxBounds);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOvering(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("drop", e);
    console.log("box", bounds);
    /* console.log("data", e.dataTransfer.getData("nft")); */
    const nft_id = parseInt(e.dataTransfer.getData("nft"));
    unstakeNft(nft_id);
    setIsOvering(false);
  };

  return (
    <div className=" w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <p className=" text-[22px] leading-none">Non Staked Bozos</p>
          <p className="ml-2 text-primary text-[22px] leading-none">
            ({nfts.length})
          </p>
        </div>
        <Button text="Stake All" onClick={stakeAllNfts} />
      </div>
      <div
        className="relative w-auto"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragExit={() => setIsOvering(false)}
      >
        <div className="relative min-h-[35vh] w-full ">
          {isGlobalDragging && (
            <div className="absolute z-10 top-0 left-0  w-full h-full  overflow-hidden py-1">
              <div className="w-full h-full bg-primary/60 rounded-[2rem] flex center text-center">
                <p className="text-[3rem] text-beige w-1/2">
                  Drop here to unstake
                </p>
              </div>
            </div>
          )}
          <Image
            src="/img/dashboard/loyalty/boxnfts.svg"
            alt="nftsbox"
            fill
            ref={boxRef}
            objectFit="fill"
          />
        </div>

        {nfts.map((nft, index) => {
          return (
            <div
              key={index}
              className="w-[100px] h-[100px] absolute top-0 left-0"
              style={{
                top: `calc(${nft.boxY} * (100% - 120px) + 10px)`,
                left: `calc(${nft.boxX} * (100% - 120px) + 10px)`,
              }}
            >
              <Nft nft={nft} setGlobalDragging={(bool: boolean) => {}} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NftBox;
