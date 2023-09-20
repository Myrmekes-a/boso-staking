import Image from "next/image";
import React from "react";

const Cards = () => {
  return (
    <div className="py-[22rem] bg-black text-white relative overflow-hidden">
      <Image
        src="/img/cards/BOZO2.png"
        alt="Bozo"
        width={400}
        height={400}
        className="absolute z-30 top-[-1rem] right-[-7rem] origin-center rotate-[220deg] pointer-events-none"
      />
      <Image
        src="/img/cards/BOZO1.png"
        alt="Bozo"
        width={400}
        height={400}
        className="absolute bottom-[-1rem] left-0 right-0 mx-auto z-30 pointer-events-none floating-anim"
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
          <p className="text-[60px] lg:text-[90px] absolute top-[-8rem] left-0 lg:left-[-2rem] rotate-[-22deg] z-40">
            Minting
          </p>
          <p className="text-[60px] lg:text-[90px] absolute bottom-[-8rem] right-0 lg:right-[-2rem] rotate-[-22deg] z-40">
            Details
          </p>
          <div className="bg-primary overflow-hidden rounded-[20px] relative text-black aspect-square group">
            <Image
              src="/img/cards/HOW-MANY.png"
              alt="How Many?"
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-500 relative z-10"
            />
            <p className="text-[30px] lg:text-[50px] text-center uppercase absolute top-6 right-6 leading-none">
              How
              <br />
              many?
            </p>
          </div>

          <div className="bg-primary overflow-hidden rounded-[20px] relative text-black aspect-square group">
            <Image
              src="/img/cards/HOW-MUCH.png"
              alt="How Much?"
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-500 relative z-10"
            />
            <p className="text-[30px] lg:text-[50px] text-center uppercase absolute bottom-6 left-6 leading-none">
              How
              <br />
              much?
            </p>
          </div>

          <div className="bg-primary overflow-hidden rounded-[20px] relative text-black aspect-square group">
            <Image
              src="/img/cards/WEN.png"
              alt="Wen?"
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-500 relative z-10"
            />
            <p className="text-[30px] lg:text-[50px] text-center uppercase absolute bottom-6 right-6 leading-none">
              Wen?
            </p>
          </div>

          <div className="bg-primary overflow-hidden rounded-[20px] relative text-black aspect-square group">
            <Image
              src="/img/cards/WHER.png"
              alt="Wher?"
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-500 relative z-10"
            />
            <p className="text-[30px] lg:text-[50px] text-center uppercase absolute top-6 left-6 leading-none">
              Wher?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
