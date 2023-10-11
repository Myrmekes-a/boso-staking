"use client";

import React from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Button from "./Button";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

const WalletButton = () => {
  const { setVisible } = useWalletModal();
  const wallet = useWallet();

  const connect = () => {
    setVisible(true);
  };

  const clampPublicKey = (publicKey: string) => {
    //return only the first 4 characters than ... and the last 3 characters
    return publicKey.slice(0, 4) + "..." + publicKey.slice(-3);
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={connect}
        text={
          wallet.connecting
            ? "Connecting..."
            : wallet.connected
            ? clampPublicKey(wallet.publicKey?.toString()!)
            : "Connect Wallet"
        }
        class="max-w-[300px]"
      />
      {!wallet.connected && (
        <Image
          src="/img/dashboard/arrow.png"
          width={95}
          height={131}
          alt="Arrow"
          className="absolute right-[60%] top-[110%]"
        />
      )}
    </>
  );
};

export default WalletButton;
