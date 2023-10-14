"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import DraggableScroll from "./DraggableScroll";
import Image from "next/image";
import { NftType } from "@/app/dashboard/loyalty/page";
import StakePosition from "./StakePosition";

type StakeProps = {
  stakedNfts: NftType[];
  stakeNft: (nft_id: string) => void;
  unstakeAllNfts: () => void;
};

export type StakePositionType =
  | { type: "filled"; nft: NftType; nextfilled: boolean }
  | { type: "empty"; active: boolean };

const Stake = ({ stakedNfts, stakeNft, unstakeAllNfts }: StakeProps) => {
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
      <div className="px-7 md:pb-5 flex justify-between items-center">
        <div className="flex text-[22px] leading-none">
          <p className="">Staked Bozos C</p>
          <div className="relative">
            <p>o</p>

            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-[-5px] "
            >
              <path
                d="M1.00006 15.4624C4.12517 12.8052 11.3928 6.19252 15.4625 0.999999"
                stroke="#C8453B"
                stroke-width="1.12639"
                stroke-linecap="round"
              />
              <path
                d="M11.1632 5.90105C9.28086 8.83947 5.26045 15.0844 3.68737 16.7858C1.721 18.9126 10.1121 10.3611 14.0761 6.39704C18.0133 2.45981 13.5465 8.08943 9.71967 12.8387"
                stroke="#C8453B"
                stroke-width="1.12639"
                stroke-linecap="round"
              />
            </svg>
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
            />
          ))}
        </div>
      </DraggableScroll>
    </div>
  );
};

export default Stake;
