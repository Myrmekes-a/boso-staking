"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface WalletRecord {
  id: string;
  fields: {
    walletColumn: string;
  };
}

const Wallet = () => {
  const [wallets, setWallets] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState("");
  const [isInWallet, setIsInWallet] = useState(false);

  const [h3InView, setH3InView] = useState(false);
  const [leftBlockInView, setLeftBlockInView] = useState(false);

  const { ref: walletRef, inView: h3IsInView } = useInView({
    threshold: 0.7,
    triggerOnce: false,
  });

  const { ref: leftBlockRef, inView: leftBlockIsInView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  if (h3IsInView && !h3InView) {
    setH3InView(true);
  } else if (!h3IsInView && h3InView) {
    setH3InView(false);
  }

  if (leftBlockIsInView && !leftBlockInView) {
    setLeftBlockInView(true);
  }

  const API_KEY =
    "pateHx3UedWCaS5xp.10aa2785cf67395b8d1d85959921b0e58cf9cf6ccd898c9ad4621d10d4e7864b";
  /* const API_URL = "https://api.airtable.com/v0/appOLxCqzLpnpcTku/Wallets";

  useEffect(() => {
    const data = fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: { records: WalletRecord[] }) => {
        const records = data.records;
        const fetchedWallets = records.map(
          (record) => record.fields.walletColumn
        );
        setWallets(fetchedWallets);
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  }, []); */

  const API_URL = "https://api.airtable.com/v0/appOLxCqzLpnpcTku/Wallets";
  const HEADERS = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  const fetchAllWallets: any = async (offset?: string) => {
    let url = API_URL;

    if (offset) {
      url += `?offset=${offset}`;
    }

    const response = await fetch(url, { method: "GET", headers: HEADERS });
    const data = await response.json();

    if (data.offset) {
      return data.records.concat(await fetchAllWallets(data.offset));
    } else {
      return data.records;
    }
  };

  useEffect(() => {
    fetchAllWallets().then((allWallets: any) => {
      const fetchedWallets = allWallets.map(
        (record: any) => record.fields.walletColumn
      );
      setWallets(fetchedWallets);
    });
  }, []);

  console.log(wallets);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 3) {
      setIsInWallet(wallets.includes(value));
    } else {
      setIsInWallet(false);
    }
  };

  return (
    <div className="my-64 container mx-auto relative">
      <Image
        src="/img/wallet/leaf.gif"
        width={400}
        height={400}
        alt="Bozo"
        className={`${
          leftBlockInView
            ? "animate-fadeUp"
            : "opacity-0 transform translate-y-4"
        } absolute top-[-4rem] left-[-4rem]`}
        ref={leftBlockRef}
      />
      <div
        ref={walletRef}
        className={`${
          h3InView ? "animate-fadeUp" : "opacity-0 transform translate-y-4"
        } flex flex-col max-w-[1000px] mx-auto relative z-10`}>
        <h2 className="text-[60px] lg:text-[90px] text-center">Bozolist</h2>
        <label
          htmlFor="wallet"
          className="text-[22px] lg:text-[32px] text-center mb-4">
          Check if you are on the F*cking Bozolist.
        </label>
        <div className="w-full relative">
          <input
            id="wallet"
            className="bg-beige/80 backdrop-blur-[10px] placeholder:text-black/70 border-black border-[3px] rounded-2xl py-4 px-4 text-[22px] leading-none w-full"
            placeholder="Enter wallet address"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="min-h-[80px]">
        {inputValue.length > 3 ? (
          <>
            {isInWallet ? (
              <div className="flex center relative z-20">
                <div className="flex center gap-2 mt-4 select-none bg-[#9CECAE] border-[3px] border-[#004E11] text-[#004E11] w-fit rounded-[10px] px-4 pt-4 pb-3">
                  <p className="text-[20px] lg:text-[25px] leading-none">
                    You&apos;re in mf!
                  </p>
                  <div className="w-5 aspect-square rounded-full bg-[#44DA6E] relative flex center before:bg-[#44DA6E] outer-circle">
                    <div className="absolute z-10 w-4 bg-[#6FFE7D] aspect-square rounded-full" />
                    <div className="absolute z-20 w-2 bg-[#A0FFE8] aspect-square rounded-full" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex center relative z-20">
                <div className="flex center gap-2 mt-4 select-none bg-[#EC9C9C] border-[3px] border-[#4E0000] text-[#4E0000] w-fit rounded-[10px] px-4 pt-4 pb-3">
                  <p className="text-[20px] lg:text-[25px] leading-none">
                    You&apos;re out mf!
                  </p>
                  <div className="w-5 aspect-square rounded-full bg-[#DA4444] relative flex center before:bg-[#DA4444] outer-circle">
                    <div className="absolute z-10 w-4 bg-[#FE6F6F] aspect-square rounded-full" />
                    <div className="absolute z-20 w-2 bg-[#FFA0A0] aspect-square rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Wallet;
