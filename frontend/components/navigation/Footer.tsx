import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="container mb-8 mx-auto">
      <div className="bg-black text-primary overflow-hidden rounded-[40px] relative px-12 py-6">
        <Image
          src="/img/footer/footer.png"
          alt="Bozo"
          width={300}
          height={300}
          className="absolute left-0 bottom-0 hidden lg:block"
        />
        <div className="absolute top-20 left-[20%] hidden lg:block text-[50px]">
          <p className="leading-none rotate-[-15deg] absolute top-0 left-0">
            F*ck
          </p>
          <p className="leading-none rotate-[-20deg] absolute top-12 left-16">
            F*ck
          </p>
          <p className="leading-none rotate-[13deg] absolute top-16 left-[-2rem]">
            F*ck
          </p>
        </div>
        <div className="flex center pb-8 pt-8 md:pt-24 lg:pt-36">
          <Image
            src="/img/hero/logo-bozo.png"
            alt="Bozo"
            width={500}
            height={200}
            className=""
          />
        </div>
        <div className="flex center gap-2">
          <a
            href="https://discord.com/invite/bozodao"
            target="_blank"
            className="rounded-2xl bg-primary hover:bg-black hover:text-primary transition-colors text-white aspect-square shrink-0 w-[50px] flex center">
            <i className="text-3xl bi bi-discord leading-[0]"></i>
          </a>
          <a
            href="https://twitter.com/BozoCollective"
            target="_blank"
            className="rounded-2xl bg-primary hover:bg-black hover:text-primary transition-colors text-white aspect-square shrink-0 w-[50px] flex center">
            <i className="text-2xl bi bi-twitter-x leading-[0]"></i>
          </a>
        </div>
        <div className="mt-6 text-[18px] lg:text-right text-center">
          Made with love by Syndra
        </div>
      </div>
    </div>
  );
};

export default Footer;
