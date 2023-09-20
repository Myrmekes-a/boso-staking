import React from "react";
import Marquee from "react-fast-marquee";
import MarqueeCard from "../cards/MarqueeCard";
import images from "@/utils/marquee";

const MarqueeSection = () => {
  function rotateArray(arr: any, count: number) {
    const len = arr.length;
    const start = count % len;
    return [...arr.slice(start), ...arr.slice(0, start)];
  }

  return (
    <div className="my-20">
      <div className="container mx-auto">
        <h2 className="text-center text-[60px] lg:text-[90px]">
          Our degen friends
        </h2>
      </div>
      {[0, 8, 16, 24].map((shift, idx) => (
        <Marquee
          key={idx}
          autoFill
          direction={idx % 2 === 0 ? "left" : "right"}
          speed={20}>
          {rotateArray(images, shift).map((image, index) => (
            <MarqueeCard
              key={index}
              img={`/img/marquee/${image}`}
              name={image.replace(".png", "")}
            />
          ))}
        </Marquee>
      ))}
      {/* <Marquee
        autoFill
        direction="left"
        speed={20}>
        {images.map((image, index) => (
          <MarqueeCard
            key={index}
            img={`/img/marquee/${image}`}
            name={image.replace(".png", "")}
          />
        ))}
      </Marquee>
      <Marquee
        autoFill
        direction="right"
        speed={20}>
        {images.map((image, index) => (
          <MarqueeCard
            key={index}
            img={`/img/marquee/${image}`}
            name={image.replace(".png", "")}
          />
        ))}
      </Marquee>
      <Marquee
        autoFill
        direction="left"
        speed={20}>
        {images.map((image, index) => (
          <MarqueeCard
            key={index}
            img={`/img/marquee/${image}`}
            name={image.replace(".png", "")}
          />
        ))}
      </Marquee>
      <Marquee
        autoFill
        direction="right"
        speed={20}>
        {images.map((image, index) => (
          <MarqueeCard
            key={index}
            img={`/img/marquee/${image}`}
            name={image.replace(".png", "")}
          />
        ))}
      </Marquee> */}
    </div>
  );
};

export default MarqueeSection;
