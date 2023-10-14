"use client";

import React from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Button from "./Button";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import WalletButton from "./WalletButton";
import PointCounter from "./PointCounter";

const WalletComponents = () => {
  const wallet = useWallet();

  /* console.log(wallet); */
  return (
    <div className="relative flex gap-2 h-fit">
      {wallet.connected && <PointCounter />}
      <WalletButton />
    </div>
  );
};

export default WalletComponents;
