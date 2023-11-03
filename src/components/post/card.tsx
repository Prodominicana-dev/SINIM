import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card() {
  return (
    <>
      <div className="flex flex-col items-center justify-between p-4 space-y-3 rounded-lg shadow-lg w-full h-[30rem]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image
            width={1920}
            height={1080}
            src={`https://images.unsplash.com/photo-1698726018988-b46c9e9324d7?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt="image"
            className="object-cover w-64 h-72 rounded-lg shadow-md"
          />
          <div className="flex flex-col items-center justify-center w-11/12">
            <div className="text-2xl font-semibold text-center text-black truncate line-clamp-1">
              {"Eliam bañate"}
            </div>
            <div className="text-base font-thin text-center text-black truncate line-clamp-1">
              {"Inmigracion"}
            </div>
          </div>
        </div>
        <Link
          href={""}
          target="_blank"
          className="flex flex-row items-center justify-center w-11/12 h-10 space-x-1 text-white duration-300 rounded-lg bg-navy hover:shadow-lg hover:text-white/80"
        >
          Descargar
        </Link>
      </div>
    </>
  );
}
