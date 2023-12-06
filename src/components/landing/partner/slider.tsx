"use client";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import React from "react";

export default function Slider({ logo }: { logo: string }) {
  return (
    <Carousel.Slide className="flex items-center justify-center w-10/12 h-56 text-black bg-white">
      <Image
        src={`/images/landing/partners/${logo}`}
        width={600}
        height={600}
        alt={logo}
        className="h-32 text-black bg-white w-36 "
      />
    </Carousel.Slide>
  );
}
