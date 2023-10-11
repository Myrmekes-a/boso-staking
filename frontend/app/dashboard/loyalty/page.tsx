"use client";

import Button from "@/components/dashboard/Button";
import Header from "@/components/dashboard/Header";
import WalletComponents from "@/components/dashboard/WalletComponents";
import NftBox from "@/components/dashboard/loyalty/NftBox";
import Stake from "@/components/dashboard/loyalty/Stake";
import Image from "next/image";
import { useEffect, useState } from "react";

export type NftType = {
  id: number;
  image: string;
  boxX: string;
  boxY: string;
};

const fakentfs = [
  {
    id: 3,
    image: "/img/dashboard/loyalty/placeholdernft.jpeg",
  },
  {
    id: 4,
    image: "/img/dashboard/loyalty/placeholdernft.jpeg",
  },
  {
    id: 5,
    image: "/img/dashboard/loyalty/placeholdernft.jpeg",
  },
  {
    id: 6,
    image: "/img/dashboard/loyalty/placeholdernft.jpeg",
  },
];

const fakentfsstaked = [
  {
    id: 1,
    image: "/img/dashboard/loyalty/placeholdernft.jpeg",
  },
  {
    id: 2,
    image: "/img/dashboard/loyalty/placeholdernft.jpeg",
  },
];

const parseNft = (nft: any) => {
  return {
    id: nft.id,
    image: nft.image,
    boxX: (Math.random() * 1).toFixed(2),
    boxY: (Math.random() * 1).toFixed(2),
  } as NftType;
};

export default function Loyalty() {
  const [stakedNfts, setStakedNfts] = useState<NftType[]>([]);
  const [nfts, setNfts] = useState<NftType[]>([]);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const tmpnfts: NftType[] = [];
    const tmpstakednfts: NftType[] = [];
    fakentfs.forEach((nft) => {
      tmpnfts.push(parseNft(nft));
    });
    fakentfsstaked.forEach((nft) => {
      tmpstakednfts.push(parseNft(nft));
    });
    setNfts(tmpnfts);
    setStakedNfts(tmpstakednfts);
  }, []);

  const stakeNft = (nft_id: number) => {
    const nft = nfts.find((nft) => nft.id === nft_id);
    if (nft) {
      setStakedNfts([...stakedNfts, nft]);
      setNfts(nfts.filter((nft) => nft.id !== nft_id));
    }
  };

  const unstakeAllNfts = () => {
    setNfts([...nfts, ...stakedNfts]);
    setStakedNfts([]);
  };

  const stakeAllNfts = () => {
    setStakedNfts([...stakedNfts, ...nfts]);
    setNfts([]);
  };

  const unstakeNft = (nft_id: number) => {
    const nft = stakedNfts.find((nft) => nft.id === nft_id);
    if (nft) {
      setNfts([...nfts, nft]);
      setStakedNfts(stakedNfts.filter((nft) => nft.id !== nft_id));
    }
  };

  const onDragEnd = (result: any) => {
    console.log(result);
  };

  return (
    <main>
      <div className="w-screen h-screen overflow-hidden p-7 ">
        <div className="w-full flex mb-7">
          <div className="w-1/3">
            <ul className="list-disc text-[20px] ml-4 w-fit">
              <li className="w-fit">1 Bozo gives 10 point / day</li>
              <li className="w-fit">Every 5 Bozos give a bonus</li>
            </ul>
          </div>
          <div className="w-1/3">
            <Header title="Loyalty" />
          </div>
          <div className="w-1/3 flex justify-end">
            <WalletComponents />
          </div>
        </div>
        <Stake
          stakedNfts={stakedNfts}
          stakeNft={stakeNft}
          setIsDragging={setIsDragging}
          unstakeAllNfts={unstakeAllNfts}
        />
        <div className="flex">
          <div className="w-1/3">
            <NftBox
              nfts={nfts}
              unstakeNft={unstakeNft}
              isGlobalDragging={isDragging}
              stakeAllNfts={stakeAllNfts}
            />
          </div>
          <div className="w-1/3 flex center">
            <div className="w-fit m-auto flex flex-col justify-center items-center text-center gap-2">
              <p className="text-[40px]">Your Stupid Points</p>
              <div className="relative w-full pt-2">
                <Image
                  src="/img/dashboard/loyalty/circlepoints.svg"
                  alt="livellobozo1"
                  className="min-w-full absolute mx-auto"
                  fill
                />
                <p className="text-[40px] text-primary">162.12</p>
              </div>
              <Button text="Claim" />
            </div>
          </div>
          <div className="w-1/3">
            <Image
              src="/img/dashboard/loyalty/livellobozo1.png"
              alt="livellobozo1"
              className="max-h-[40vh] w-auto absolute right-0 bottom-0 -z-10"
              width={1052}
              height={652}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
