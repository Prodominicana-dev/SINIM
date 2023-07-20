"use client";
import Image from "next/image";

export default function Card({ image, title, color, tool, changeT }: any) {
  const handleClick = () => {
    changeT(tool);
  };
  return (
    <button
      className={`flex justify-center items-center md:h-full h-36 md:w-full ${color} rounded-lg text-2xl hover:text-3xl duration-300`}
      onClick={handleClick}
    >
      <Image src={`${image}`} width={100} height={100} alt=""></Image>
      <div className="absolute font-custom">{title}</div>
    </button>
  );
}
