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
import React, { useState, useEffect } from "react";
import SaimCard from "../../../components/saim/card";
import getAllSaim from "@/src/services/saim/getAllSaim";
import Saim from "@/src/models/saim";
import Link from "next/link";
import Feed from "@/src/components/saim/feed";

export default function Page() {
  const [data, setData] = useState<Saim[]>([]);
  const [search, setSearch] = useState("");
  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };
  const filteredData = data.filter(
    (saim) =>
      saim.title.toLowerCase().includes(search.toLowerCase()) ||
      saim.products.some(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.code.toLowerCase().includes(search.toLowerCase())
      )
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getAllSaim();
  //     setData(response);
  //   };

  //   fetchData();
  // }, []);
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
        <div className="relative h-full flex flex-col items-center justify-center px-5 sm:px-0 w-full">
          <div className="gap-3 sm:gap-5 lg:gap-10 my-10 text-[14px] sm:text-lg flex flex-row justify-center items-center flex-wrap lg:flex-nowrap sm:w-8/12">
            <Link
              href={"#Obstaculos"}
              className="bg-black/50 hover:bg-white hover:text-black rounded-full p-3 sm:p-4 duration-300 cursor-pointer text-center"
            >
              Todos
            </Link>
            <Link
              href={"#Oportunidades"}
              className="bg-white text-black font-bold rounded-full p-3 sm:p-4 cursor-pointer text-center"
            >
              Oportunidades
            </Link>
            <Link
              href={"#actualizaciones"}
              className="bg-black/50 hover:bg-white hover:text-black rounded-full p-3 sm:p-4 duration-300 cursor-pointer text-center"
            >
              Actualizaciones
            </Link>
            <Link
              href={"#Amenazas"}
              className="bg-black/50 hover:bg-white hover:text-black rounded-full p-3 sm:p-4 duration-300 cursor-pointer text-center "
            >
              Amenazas
            </Link>
            <Link
              href={"#Obstaculos"}
              className="bg-black/50 hover:bg-white hover:text-black rounded-full p-3 sm:p-4 duration-300 cursor-pointer text-center"
            >
              Obstáculos
            </Link>
          </div>
          <div className="sm:w-8/12 md:w-6/12 xl:w-4/12 text-center text-white text-2xl sm:text-3xl font-bold">
            Descubra Nuevas Oportunidades de Negocio
          </div>
          <div className="sm:w-8/12 md:w-6/12 xl:w-4/12 mt-4 text-center text-sm  sm:text-normal">
            Explore oportunidades emergentes, tendencias y nichos de mercado que
            pueden impulsar su crecimiento empresarial.
          </div>
          <div className="flex flex-row bg-white p-4 sm:p-5 w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12 rounded-full my-10">
            <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500" />
            <input
              placeholder="Producto o código arancelario..."
              className="w-10/12  text-blue-500 outline-none"
              name="search"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <Feed />
    </div>
  );
}
