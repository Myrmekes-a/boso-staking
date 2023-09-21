"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const Wallet = () => {
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
  } /* else if (!leftBlockIsInView && leftBlockInView) {
    setLeftBlockInView(false);
  }
 */
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
