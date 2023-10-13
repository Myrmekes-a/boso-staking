"use client";

import React, { useEffect } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Button from "./Button";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const WalletButton = () => {
  const { setVisible } = useWalletModal();
  const wallet = useWallet();

  const connect = () => {
    setVisible(true);
  };

  const disconnect = () => {
    wallet.disconnect();
  };

  const clampPublicKey = (publicKey: string) => {
    if (!publicKey) return "";
    //return only the first 4 characters than ... and the last 3 characters
    return publicKey.slice(0, 4) + "..." + publicKey.slice(-3);
  };

  useEffect(() => {
    if (!wallet.connected) return;
    console.log("signing in");
    signIn("credentials", {
      wallet: wallet.publicKey?.toString()!,
      redirect: false,
    });
    setButtonText(clampPublicKey(wallet.publicKey?.toString()!));
  }, [wallet.connected]);

  const [buttonText, setButtonText] = React.useState(
    clampPublicKey(wallet.publicKey?.toString()!)
  );

  return (
    <>
      {!wallet.connected ? (
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
          <Image
            src="/img/dashboard/arrow.png"
            width={95}
            height={131}
            alt="Arrow"
            className="absolute right-[11.5rem] top-[110%]"
          />
        </>
      ) : (
        <div
          onMouseOver={() => setButtonText("Disconnect?")}
          onMouseOut={() =>
            setButtonText(clampPublicKey(wallet.publicKey?.toString()!))
          }
        >
          <Button
            variant="secondary"
            onClick={disconnect}
            text={buttonText}
            class="max-w-[300px] min-w-[141px]"
          />
        </div>
      )}
    </>
  );
};

export default WalletButton;
