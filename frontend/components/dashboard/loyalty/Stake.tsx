"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import DraggableScroll from "./DraggableScroll";
import Image from "next/image";
import { NftType } from "@/app/dashboard/loyalty/page";
import StakePosition from "./StakePosition";

type StakeProps = {
  stakedNfts: NftType[];
  stakeNft: (nft_id: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  unstakeAllNfts: () => void;
};

export type StakePositionType =
  | { type: "filled"; nft: NftType; nextfilled: boolean }
  | { type: "empty"; active: boolean };

const Stake = ({
  stakedNfts,
  stakeNft,
  setIsDragging,
  unstakeAllNfts,
}: StakeProps) => {
  const [positions, setPositions] = useState<StakePositionType[]>([
    {
      type: "empty",
      active: false,
    },
    {
      type: "empty",
      active: false,
    },
    {
      type: "empty",
      active: false,
    },
    {
      type: "empty",
      active: false,
    },
    {
      type: "empty",
      active: false,
    },
    {
      type: "empty",
      active: false,
    },
    {
      type: "empty",
      active: false,
    },
    {
      type: "empty",
      active: false,
    },
    {
      type: "empty",
      active: false,
    },
  ]);

  useEffect(() => {
    const fillerElements: StakePositionType[] = [];
    fillerElements.push({
      type: "empty",
      active: true,
    });
    for (let i = 0; i < 9; i++) {
      fillerElements.push({
        active: false,
        type: "empty",
      });
    }
    const updatedSlots: StakePositionType[] = [];
    stakedNfts.forEach((element, index) => {
      if (stakedNfts[index + 1]) {
        updatedSlots.push({
          type: "filled",
          nft: element,
          nextfilled: true,
        });
      } else {
        updatedSlots.push({
          type: "filled",
          nft: element,
          nextfilled: false,
        });
      }
    });
    const finalSlots = updatedSlots.concat(fillerElements);
    setPositions(finalSlots);
  }, [stakedNfts]);

  return (
    <div className="w-screen ml-[-1.75rem] ">
      <div className="px-7 pb-5 flex justify-between items-center">
        <div className="flex text-[22px] leading-none">
          <p className="">Staked Bozos C</p>
          <div className="relative">
            <p>o</p>
            <Image
              src="/img/dashboard/loyalty/scratch.svg"
              alt="Counter"
              className="absolute bottom-1 left-0 "
              width={19}
              height={19}
            />
          </div>
          <p>unt</p> <p className="ml-2 text-primary ">({stakedNfts.length})</p>
        </div>

        <Button text="Unstake All" onClick={unstakeAllNfts} />
      </div>
      {/* <div className="w-full overflow-x-scroll  flex"> */}

      <DraggableScroll>
        <div className="flex max-w-screen overflow-x-scroll cursor-grab">
          {positions.map((position, index) => (
            <StakePosition
              key={index}
              {...position}
              index={index}
              stakeNft={stakeNft}
              setIsDragging={setIsDragging}
            />
          ))}
        </div>
      </DraggableScroll>
    </div>
  );
};

export default Stake;
