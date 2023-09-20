import Image from "next/image";
import React from "react";

const Wallet = () => {
  return (
    <div className="my-64 container mx-auto relative">
      <Image
        src="/img/wallet/leaf.gif"
        width={400}
        height={400}
        alt="Bozo"
        className="absolute top-[-4rem] left-[-4rem]"
      />
      <div className="flex flex-col max-w-[1000px] mx-auto relative z-10">
        <h2 className="text-[60px] lg:text-[90px] text-center">Bozolist</h2>
        <label
          htmlFor="wallet"
          className="text-[22px] lg:text-[32px] text-center mb-4">
          Check if you are on the F*cking Bozolist.
        </label>
        <input
          id="wallet"
          className="bg-beige/80 backdrop-blur-[6px] placeholder:text-black/70 border-black border-[3px] rounded-2xl py-4 px-4 text-[22px] leading-none"
          placeholder="Enter wallet address"
        />
      </div>
    </div>
  );
};

export default Wallet;
