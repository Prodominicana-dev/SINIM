"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/home/card";
import TypeWriterEffect from "react-typewriter-effect";

export default function Home() {
  const desc = `El Sistema Nacional de Inteligencia de Mercados de la Dirección de
            Inteligencia de Mercados de ProDominicana, es un conjunto de
            subsistemas de alertas, oportunidades, amenazas y obstaculos que
            pueda enfrentar el comercio exterior y la atraccién de inversion
            extranjera directa (IED) de la Republica Dominicana.`;

  return (
    <main className="min-h-screen h-screen relative">
      <div className="absolute inset-0 z-[-1]">
        <video
          autoPlay
          loop
          muted
          className="w-full h-screen fixed object-cover transition-opacity duration-500"
        >
          <source src="/videos/world.mp4" type="video/mp4"></source>
        </video>
        <div className="fixed inset-0 bg-gradient-to-br from-45% from-navy via-sky-blue to-mint object-cover"></div>
      </div>
      <nav className="absolute w-full md:p-12 p-5 flex md:items-center md:justify-between  bg-transparent">
        <div className="flex md:justify-between justify-start items-center w-full">
          <div className="flex items-center">
            <Link href="/" className="flex mx-2 md:w-full w-32">
              <Image
                width={200}
                height={200}
                alt=""
                src="/images/logo/prodominicana.png"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <Link href="/" className="md:block hidden">
              <div className="w-32 text-center text-xl rounded-full border-2 border-white px-5 py-2 hover:shadow-button duration-500">
                Log in
              </div>
            </Link>
            <Link href="/" className="md:block hidden">
              <div className="w-32 text-center text-xl rounded-full border-2 border-white px-5 py-2 hover:shadow-button duration-500">
                Sign in
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex h-full md:h-5/6 md:p-5 ml-0 md:justify-start justify-center items-center md:absolute">
        <div className="flex flex-col space-y-4 mx-10 ">
          <Image
            src={"/images/logo/sinim.png"}
            width={300}
            height={300}
            alt=""
          ></Image>
          <p className="md:w-[32rem] md:text-base text-xs md:block hidden">
            <TypeWriterEffect
              startDelay={100}
              cursorColor="white"
              text={desc}
              typeSpeed={20}
              className="w-full"
            />
          </p>
          <Link href="/" className="md:block hidden">
            <div className="w-32 text-center text-xl bg-white text-black rounded-full px-5 py-1 duration-500">
              Ver mas
            </div>
          </Link>
        </div>
      </div>
      <div className="h-screen flex justify-center items-end">
        <div className="flex md:flex-row flex-col w-full md:h-44 h-full md:space-x-5 m-10 md:space-y-0 space-y-10 overflow-y-auto">
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
