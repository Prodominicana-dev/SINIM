"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import React from "react";

export default function Page() {
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
      <div className="relative w-full h-[40%]">
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
        <div className="relative flex flex-col items-center justify-center">
          <div className="inline-flex space-x-10 py-10">
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
          <div className="w-3/12 text-center text-white text-2xl font-bold">
            Descubra Nuevas Oportunidades de Negocio
          </div>
          <div className="w-4/12 my-4 text-center text-normal">
            Explore oportunidades emergentes, tendencias y nichos de mercado que
            pueden impulsar su crecimiento empresarial.
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
        <Card className="mt-6 w-full">
          <CardHeader color="blue-gray" className="relative h-46x">
            <img
              src="https://fruittoday.com/wp-content/uploads/2022/02/conservar-aguacate-correctamente.jpg"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography>Oportunidad</Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Nuevo Mercado de aguacate en Puerto Rico
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-full">
          <CardHeader color="blue-gray" className="relative h-46x">
            <img
              src="https://fruittoday.com/wp-content/uploads/2022/02/conservar-aguacate-correctamente.jpg"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography>Oportunidad</Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Nuevo Mercado de aguacate en Puerto Rico
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-full">
          <CardHeader color="blue-gray" className="relative h-46x">
            <img
              src="https://fruittoday.com/wp-content/uploads/2022/02/conservar-aguacate-correctamente.jpg"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography>Oportunidad</Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Nuevo Mercado de aguacate en Puerto Rico
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-full">
          <CardHeader color="blue-gray" className="relative h-46x">
            <img
              src="https://fruittoday.com/wp-content/uploads/2022/02/conservar-aguacate-correctamente.jpg"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography>Oportunidad</Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Nuevo Mercado de aguacate en Puerto Rico
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-full">
          <CardHeader color="blue-gray" className="relative h-46x">
            <img
              src="https://fruittoday.com/wp-content/uploads/2022/02/conservar-aguacate-correctamente.jpg"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography>Oportunidad</Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Nuevo Mercado de aguacate en Puerto Rico
            </Typography>
          </CardBody>
        </Card>
        <Card className="mt-6 w-full">
          <CardHeader color="blue-gray" className="relative h-46x">
            <img
              src="https://fruittoday.com/wp-content/uploads/2022/02/conservar-aguacate-correctamente.jpg"
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography>Oportunidad</Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Nuevo Mercado de aguacate en Puerto Rico
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
