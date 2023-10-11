"use client";

import React from "react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";

const SkeletonImage = () => {
  const { connected } = useWallet();
  return (
    <>
      <Image
        src="/img/dashboard/skull.png"
        width={594}
        height={626}
        alt="Skeleton"
        className="md:min-w-[594px] md:h-[626px] min-w-[100vw] h-auto absolute bottom-0 md:bottom-[-1.75rem]"
      />
      {!connected && (
        <p className="absolute bottom-[75vw]  md:bottom-[400px] text-[28px] md:text-[35px]">
          Connect Your F*cking Wallet
        </p>
      )}
    </>
  );
};

export default SkeletonImage;
