"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/home/card";

import Background from "@/components/home/background";
import InfoTool from "@/components/home/infoTool";
import { useState } from "react";
import { tools } from "@/public/config.json";

export default function Home() {
  const [tool, setTool] = useState(tools[0]);
  console.log(tool.viaColor);

  const desc =
    "El Sistema Nacional de Inteligencia de Mercados de la Dirección de Inteligencia de Mercados de ProDominicana, es un conjunto de subsistemas de alertas, oportunidades, amenazas y obstaculos que pueda enfrentar el comercio exterior y la atraccién de inversion extranjera directa (IED) de la Republica Dominicana.";

  return (
    <main className="min-h-screen h-screen relative">
      <Background
        video={tool.background}
        color={`bg-gradient-to-br from-${tool.fromColorPercentaje} from-${tool.fromColor} via-${tool.viaColor} to-${tool.toColor}`}
      />

      <nav className="absolute w-full md:p-12 p-5 flex md:items-center md:justify-between  bg-transparent">
        <div className="flex md:justify-between justify-start items-center w-full">
          <div className="flex items-center">
            <Link href="/" className="flex mx-2 md:w-full w-32">
              <Image
                width={150}
                height={150}
                alt=""
                draggable={false}
                src="/images/logo/prodominicana.png"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <Link href="/" className="md:block hidden">
              <div className="w-28 text-center text-lg rounded-full border-2 border-white px-5 py-2 hover:shadow-button duration-500">
                Log in
              </div>
            </Link>
            <Link href="/" className="md:block hidden">
              <div className="w-28 text-center text-lg rounded-full border-2 border-white px-5 py-2 hover:shadow-button duration-500">
                Sign in
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <InfoTool logo={`sinim`} description={desc} />
      {/* <div className="flex h-full md:h-5/6 md:p-5 ml-0 md:justify-start justify-center items-center md:absolute">
        <div className="flex flex-col space-y-6 mx-10 ">
          <Image
            src={"/images/logo/sinim.png"}
            width={200}
            height={200}
            draggable={false}
            alt=""
          ></Image>
          <p className="md:w-[32rem] md:text-sm text-xs md:block hidden">
            <TypeWriterEffect
              startDelay={100}
              cursorColor="white"
              text={desc}
              typeSpeed={20}
            />
          </p>
          <Link href="/" className="md:block hidden">
            <div className="w-28 text-center text-sm bg-white text-black rounded-full px-5 py-1 duration-500">
              Ver mas
            </div>
          </Link>
        </div>
      </div> */}
      <div className="h-screen flex justify-center items-end">
        <div className="flex md:flex-row flex-col w-full md:h-40 h-full md:space-x-5 m-10 md:space-y-0 space-y-10 overflow-y-auto">
          <Card
            title={"DATA MARKET"}
            image={`/svg/datamarketicon.svg`}
            color={`bg-gradient-to-b from-green-500 to-sky-600`}
          />
          <Card
            title={"SIED"}
            image={`/svg/siedicon.svg`}
            color={`bg-gradient-to-b from-pink-600 to-violet-800`}
          />
          <Card
            title={"SAIM"}
            image={`/svg/saimicon.svg`}
            color={`bg-gradient-to-b from-sky-500 to-purple-700`}
          />
          <Card
            title={"RAMI"}
            image={`/svg/ramiicon.svg`}
            color={`bg-gradient-to-b from-yellow-400 to-red-500`}
          />
        </div>
      </div>
    </main>
  );
}
