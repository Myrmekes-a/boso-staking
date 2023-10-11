import React from "react";
import Image from "next/image";
import Button from "./Button";
import { type } from "os";

type DashboardSectionProps = {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  image: string;
  redirect: string;
};

const DashboardSection = ({
  text,
  disabled = false,
  image,
  redirect,
}: DashboardSectionProps) => {
  /* return (
    <div className="relative">
      <Image
        src={image}
        width={400}
        height={184}
        alt={text}
        className={`${
          disabled && "filter grayscale"
        } w-[400px] border border-black h-[184px] rounded-xl`}
      />
      <div className="absolute bottom-2 left-2">
        {disabled ? (
          <Button text={text} variant="secondary" disabled />
        ) : (
          <Button text={text} />
        )}
      </div>
    </div>
  ); */

  return (
    <div className="relative h-[24%] hover:scale-[101%] hover:shadow-lg transition-all duration-300 group rounded-xl">
      <Image
        src={image}
        width={400}
        height={184}
        alt={text}
        className={`${
          disabled ? "filter grayscale" : " "
        } border border-black h-full w-auto rounded-xl transform  transition-all duration-300 ease-in-out `}
      />
      <div className="absolute bottom-2 left-2">
        {disabled ? (
          <Button text={text} variant="secondary" disabled />
        ) : (
          <Button text={text} redirect={redirect} />
        )}
      </div>
    </div>
  );
};
{
  //QUESTO MANTIENE LE DIMENSIONI DELL'IMMAGINE
  /* <div className="relative">
      <Image
        src={image}
        width={400}
        height={184}
        alt="Loyalty Program"
        className={`${
          disabled && "filter grayscale"
        } w-[400px] border border-black h-[184px] rounded-xl`}
      />
      <div className="absolute bottom-2 left-2">
        {disabled ? (
          <Button text={text} variant="secondary" disabled />
        ) : (
          <Button text={text} />
        )}
      </div>
    </div> */
}
export default DashboardSection;
