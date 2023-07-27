"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/home/card";
import Background from "@/components/home/background";
import InfoTool from "@/components/home/infoTool";
import { useEffect, useState } from "react";
import config from "@/public/config.json";

export default function Home() {
  const sinim = {
    title: "SINIM",
    description:
      "El Sistema Nacional de Inteligencia de Mercados de la Dirección de Inteligencia de Mercados de ProDominicana, es un conjunto de subsistemas de alertas, oportunidades, amenazas y obstaculos que pueda enfrentar el comercio exterior y la atraccién de inversion extranjera directa (IED) de la Republica Dominicana.",
    color:
      "bg-gradient-to-br from-45% from-[#062381] via-[#2997F2]/50 to-[#1AD25D]",
    background: "/videos/charts.mp4",
    logo: "/images/logo/sinim.png",
    root: "/",
  };

  const tools = [
    {
      title: "DATA MARKET",
      description:
        "Analice estadísicas en materia de exportación e inversión en el pais.",
      color: "bg-gradient-to-tr from-green-500 from-[30%] to-sky-600/80",
      boxColor: "bg-gradient-to-b from-green-500 to-sky-600",
      fromColor: "green-500",
      toColor: "sky-600",
      background: "/videos/datamarket.mp4",
      icon: "/svg/datamarketicon.svg",
      logo: "/images/logo/datamarket.svg",
      root: "/",
      gradientPos: "br",
      visible: true,
    },
    {
      title: "SIED",
      description:
        "Analice oportunidades, tendencias, normativas y amenazas del contexto global de inversión.",
      color: "bg-gradient-to-tr from-[40%] from-pink-600 to-violet-800/60",
      boxColor: "bg-gradient-to-b from-pink-600 to-violet-800",
      fromColor: "pink-600",
      toColor: "violet-800",
      background: "/videos/graph.mp4",
      icon: "/svg/siedicon.svg",
      logo: "/images/logo/sied.svg",
      root: "/",
      gradientPos: "br",
      visible: true,
    },
    {
      title: "SAIM",
      description:
        "Consulte oportunidades, amenazas, obstáculos y actualizaciones de interés para el sector exportador.",
      color: "bg-gradient-to-tr from-[40%] from-sky-500 to-purple-700/60",
      boxColor: "bg-gradient-to-b from-sky-500 to-purple-700",
      fromColor: "sky-500",
      toColor: "purple-700",
      background: "/videos/rami.mp4",
      icon: "/svg/saimicon.svg",
      logo: "/images/logo/saim.svg",
      root: "/",
      gradientPos: "br",
      visible: true,
    },
    {
      title: "RAMI",
      description:
        "Consulte medidas, requisitos y regulaciones para las mercancías exportadas desde República Dominicana.",
      color: "bg-gradient-to-tr from-[30%] from-orange-500 to-yellow-400/60",
      boxColor: "bg-gradient-to-b from-yellow-400 to-orange-500",
      fromColor: "yellow-400",
      toColor: "red-500",
      background: "/videos/connection.mp4",
      icon: "/svg/ramiicon.svg",
      logo: "/images/logo/rami.svg",
      root: "/",
      gradientPos: "br",
      visible: true,
    },
  ];

  //const tools = config.tools;
  const [tool, setTool] = useState(sinim);

  const changeTool = (t) => {
    setTool(t);
    console.log(tool);
  };

  console.log(tool);
  return (
    <main className="relative ">
      <Background video={tool.background} color={tool.color} />

      <nav className="lg:absolute w-full sm:p-12 p-8  flex md:items-center md:justify-between  bg-transparent z-10">
        <div className="flex sm:justify-between justify-center items-center w-full">
          <div className="flex items-center">
            <button
              onClick={() => {
                setTool(sinim);
              }}
              className="flex mx-2 md:w-full w-32"
            >
              <Image
                width={150}
                height={150}
                alt=""
                draggable={false}
                src="/images/logo/prodominicana.png"
              />
            </button>
          </div>
          <div className="hidden sm:flex items-center space-x-5">
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

      <InfoTool
        logo={tool.logo}
        description={tool.description}
        link={tool.root}
      />

      <div className="lg:h-screen flex sm:flex-row sm:flex-wrap lg:flex-nowrap flex-col w-full justify-center items-center lg:items-end sm:mt-8 lg:mt-0">
        {tools.map((tool, index) =>
          tool.visible ? (
            <Card
              title={tool.title}
              image={tool.icon}
              color={tool.boxColor}
              key={index}
              tool={tool}
              changeT={changeTool}
            />
          ) : null
        )}
      </div>
    </main>
  );
}
