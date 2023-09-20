import Image from "next/image";
import React from "react";

const Description = () => {
  return (
    <div className="mt-20">
      <div className="container mx-auto mb-12">
        <h3 className="text-[30px] lg:text-[35px] text-center max-w-[980px] mx-auto">
          Bozo Collective ia a free Solana project with art inspired by diary of
          a wimpy kid. Holding one of these gloriously ugly mfers will grant you
          access to the Bozo DAO. other than that we don't know what the F*ck to
          tell you
        </h3>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute top-20 left-[10%] hidden lg:block">
          <p className="text-[90px] leading-none rotate-[-15degx] absolute top-0 left-0">
            F*ck
          </p>
          <p className="text-[90px] leading-none rotate-[15deg] absolute top-24 left-20">
            F*ck
          </p>
          <p className="text-[90px] leading-none rotate-[13deg] absolute top-40 left-[-2rem]">
            F*ck
          </p>
        </div>
        <div className="absolute right-[10%] w-full">
          <p className="absolute right-0 hidden lg:block text-[80px] leading-none rotate-[15deg] top-20 text-right">
            Support Us
            <br />
            or GTFO
          </p>
        </div>
        <div className="aspect-square max-w-[600px] mx-auto overflow-hidden">
          <Image
            src="/img/description/desc.png"
            alt="Bozo"
            width={1500}
            height={1500}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
