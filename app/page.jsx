"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/home/card";

import Background from "@/components/home/background";
import InfoTool from "@/components/home/infoTool";
import { useState } from "react";

export default function Home() {
  const config = require("@/public/config.json");
  const tools = config.tools;
  const [tool, setTool] = useState(tools[0]);

  const changeTool = (t) => {
    setTool(t);
    console.log(tool);
  };

  console.log(tool);
  return (
    <main className="min-h-screen h-screen relative">
      <Background
        video={tool.background}
        color={`bg-gradient-to-${tool.gradientPos} from-${tool.fromColorPercentaje} from-${tool.fromColor} via-${tool.viaColor} to-${tool.toColor}`}
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
                onClick={() => {
                  setTool(tools[0]);
                }}
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

      <InfoTool
        logo={tool.logo}
        description={tool.description}
        link={tool.root}
      />

      <div className="h-screen flex justify-center items-end">
        <div className="flex md:flex-row flex-col w-full md:h-40 h-full md:space-x-5 m-10 md:space-y-0 space-y-10 overflow-y-auto">
          {tools.map((tool, index) =>
            tool.visible ? (
              <Card
                title={tool.title}
                image={tool.icon}
                color={`bg-gradient-to-b from-${tool.fromColor} to-${tool.toColor}`}
                key={index}
                tool={tool}
                changeT={changeTool}
              />
            ) : null
          )}
        </div>
      </div>
    </main>
  );
}
