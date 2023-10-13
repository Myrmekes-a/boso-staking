"use client";

import { type } from "os";
import React from "react";

export type ButtonProps = {
  text: string;
  onClick?: (e?: any) => void;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  redirect?: string;
  class?: string;
};

const Button = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  redirect = "#",
  class: passedclass = "",
}: ButtonProps) => {
  return (
    <a href={redirect}>
      <button
        type={type}
        disabled={disabled}
        className={` ${
          variant == "primary"
            ? `text-beige ${
                !disabled && " hover:bg-black hover:text-primary"
              }  bg-primary`
            : `text-beige ${!disabled && " hover:text-primary"}  bg-black`
        }   flex center select-none  w-fit text-[22px] leading-none shrink-0 rounded-lg px-6 pt-3 pb-2 border border-black duration-300 transition-colors ${passedclass}`}
        onClick={(e) => {
          /* e.preventDefault(); */
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        {text}
      </button>
    </a>
  );
};

export default Button;
