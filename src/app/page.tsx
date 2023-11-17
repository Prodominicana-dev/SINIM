"use client";
import Link from "next/link";
import Image from "next/image";
import Card from "@/src/components/home/card";
import Background from "@/src/components/home/background";
import InfoTool from "@/src/components/home/infoTool";
import { useState } from "react";
import React from "react";

export default function Home() {
  const sinim = {
    title: "SINIM",
    description:
      "Bienvenido al Sistema Nacional de Inteligencia de Mercados (SINIM) de ProDominicana, una plataforma integral de subsistemas especializados en comercio internacional e inversión extranjera directa (IED), con el objetivo de impulsar las exportaciones y la atracción de IED en República Dominicana.",
    color:
      "bg-gradient-to-br from-45% from-[#062381] via-[#2997F2]/50 to-[#1AD25D]",
    background: "/videos/charts.mp4",
    logo: "/sinim.svg",
    root: "/",
  };

  const tools = [
    {
      title: "DATA MARKET",
      description:
        "Analice datos y estadísticas de comercio internacional e inversión extranjera directa con Data Market. Conozca las tendencias en compras internacionales y las oportunidades para su negocio mediante la inteligencia de mercado.",
      color: "bg-gradient-to-tr from-green-500 from-[30%] to-sky-600/80",
      boxColor: "bg-gradient-to-b from-green-500 to-sky-600",
      fromColor: "green-500",
      toColor: "sky-600",
      background: "/videos/datamarket.mp4",
      icon: "/svg/datamarket/datamarketicon.svg",
      logo: "/svg/datamarket/datamarket.svg",
      root: "/dashboard/datamarket/1",
      gradientPos: "br",
      visible: true,
    },
    {
      title: "RAMI",
      description:
        "Inicia tus exportaciones explorando la herramienta Requisitos de Acceso a Mercados Internacionales (RAMI). Consulta las medidas, requisitos y regulaciones establecidas por cada país para admitir la entrada y la comercialización de mercancías importadas desde República Dominicana.",
      color: "bg-gradient-to-tr from-[30%] from-orange-500 to-yellow-400/60",
      boxColor: "bg-gradient-to-b from-yellow-400 to-orange-500",
      fromColor: "yellow-400",
      toColor: "red-500",
      background: "/videos/connection.mp4",
      icon: "/svg/rami/ramiicon.svg",
      logo: "/svg/rami/rami.svg",
      root: "/dashboard/rami",
      gradientPos: "br",
      visible: true,
    },
    {
      title: "Alertas Comerciales",
      description:
        "Las Alertas Comerciales del SINIM brindan a los exportadores información actualizada sobre oportunidades emergentes y desafíos en el comercio internacional. Impulsa tus exportaciones de manera más inteligente al mantenerte al tanto de las tendencias recientes en el mercado global.",
      color: "bg-gradient-to-tr from-[40%] from-sky-500 to-purple-700/60",
      boxColor: "bg-gradient-to-b from-sky-500 to-purple-700",
      fromColor: "sky-500",
      toColor: "purple-700",
      background: "/videos/rami.mp4",
      icon: "/svg/saim/saimicon.svg",
      logo: "/svg/saim/saim.svg",
      root: "/dashboard/saim",
      gradientPos: "br",
      visible: true,
    },
    {
      title: "Alertas de IED",
      description:
        "Las Alertas de Inversión Extranjera Directa (IED) del SINIM proporcionan información estratégica sobre las últimas novedades en IED, incluyendo oportunidades y tendencias tanto a nivel nacional como internacional. Facilitamos la gestión, promoción y atracción de la IED en República Dominicana.",
      color: "bg-gradient-to-tr from-[40%] from-pink-600 to-violet-800/60",
      boxColor: "bg-gradient-to-b from-pink-600 to-violet-800",
      fromColor: "pink-600",
      toColor: "violet-800",
      background: "/videos/graph.mp4",
      icon: "/svg/sied/siedicon.svg",
      logo: "/svg/sied/sied.svg",
      root: "/dashboard/sied",
      gradientPos: "br",
      visible: true,
    },
  ];

  //const tools = config.tools;
  const [tool, setTool] = useState(sinim);

  const changeTool = (t: any) => {
    setTool(t);
  };

  return (
    <main className="relative ">
      <Background video={tool.background} color={tool.color} />

      <nav className="z-10 flex w-full p-8 bg-transparent lg:absolute sm:p-12 md:items-center md:justify-between">
        <div className="flex items-center justify-center w-full sm:justify-between">
          <div className="flex items-center">
            <button
              onClick={() => {
                setTool(sinim);
              }}
              className="flex w-32 mx-2 md:w-full"
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
          <div className="items-center hidden space-x-5 sm:flex">
            <Link href="/dashboard/rami" className="hidden md:block">
              <div className="px-5 py-2 text-lg text-center text-white duration-500 border-2 border-white rounded-full w-28 hover:shadow-button">
                Acceder
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <InfoTool
        title={tool.title}
        logo={tool.logo}
        description={tool.description}
        link={tool.root}
      />

      <div className="flex flex-col items-center justify-center w-full lg:h-screen sm:flex-row sm:flex-wrap lg:flex-nowrap lg:items-end sm:mt-8 lg:mt-0">
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
