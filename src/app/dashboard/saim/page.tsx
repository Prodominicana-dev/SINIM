"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";
import SaimCard from "../../../components/saim/card";
import getData from "@/src/services/saim/getData";

export default async function Page() {
  const data = await getData();
  const saimFilters = [
    {
      name: "Oportunidades",
      title: "Descubra Nuevas Oportunidades de Negocio",
      description:
        "Explore oportunidades emergentes, tendencias y nichos de mercado que pueden impulsar su crecimiento empresarial.",
    },
    {
      name: "Actualizaciones",
      title: "Explore las Novedades más Recientes en su Industria",
      description:
        "Mantenga una ventaja competitiva al estar informado sobre las últimas actualizaciones en regulaciones, políticas y tendencias relevantes para su industria.",
    },
    {
      name: "Amenazas",
      title: "Esté al Pendiente de las Amenazas Potenciales",
      description:
        "Manténgase al tanto de las amenazas potenciales y tome medidas preventivas para garantizar la seguridad y el éxito de su empresa. ",
    },
    {
      name: "Oportunidades",
      title: "Descubra Estrategias para Sortear los Obstáculos",
      description:
        "Aprenda a eludir obstáculos y encontrar atajos inteligentes en su búsqueda hacia el logro de sus objetivos.",
    },
  ];
  return (
    <div className="w-full h-full">
      <div className="relative w-full sm:h-4/6">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            src="/videos/rami.mp4"
            typeof="video/mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-black opacity-60 border-0"></div>
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="inline-flex space-x-10 my-10">
            <div className="bg-white text-black font-bold rounded-full p-4 cursor-pointer">
              <a href="">Oportunidades</a>
            </div>
            <div className="bg-black/50 hover:bg-white hover:text-black rounded-full p-4 duration-300 cursor-pointer">
              <a href="">Actualizaciones</a>
            </div>
            <div className="bg-black/50 hover:bg-white hover:text-black rounded-full p-4 duration-300 cursor-pointer">
              <a href="">Amenazas</a>
            </div>
            <div className="bg-black/50 hover:bg-white hover:text-black rounded-full p-4 duration-300 cursor-pointer">
              <a href="">Obstaculos</a>
            </div>
          </div>
          <div className="sm:w-6/12 lg:w-4/12 text-center text-white text-3xl font-bold">
            Descubra Nuevas Oportunidades de Negocio
          </div>
          <div className="sm:w-6/12 lg:w-4/12 mt-4 text-center text-normal">
            Explore oportunidades emergentes, tendencias y nichos de mercado que
            pueden impulsar su crecimiento empresarial.
          </div>
          <div className="flex flex-row bg-white p-3 w-4/12 rounded-full my-10">
            <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500" />
            <input
              placeholder="Producto o código arancelario..."
              className="w-10/12 text-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="text-black">{}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        {data.map((saim) => (
          <SaimCard {...saim} />
        ))}
      </div>
    </div>
  );
}
