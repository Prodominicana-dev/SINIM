"use client";
import { productAtom } from "@/src/state/products";
import { Divider, Select } from "@mantine/core";
import { Button, IconButton } from "@material-tailwind/react";
import { IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React from "react";

export default function Page() {
  const products = useAtom(productAtom);
  return (
    <div className="w-full h-[90vh]">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            src="/videos/connection.mp4"
            typeof="video/mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-navy/50 border-0"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-5 sm:px-0 w-full">
          <div className="sm:w-8/12 md:w-6/12 xl:w-4/12 text-center text-white text-3xl sm:text-5xl font-bold">
            ¿Ya sabes qué necesitas para exportar?
          </div>
          <div className="sm:w-8/12 md:w-6/12 xl:w-4/12 mt-4 text-center text-white">
            Selecciona tu producto y el país de destino, y descubre al instante
            los requisitos específicos de exportación. Dando un salto seguro
            hacia el éxito internacional.
          </div>
          <div className="sm:flex  my-5 w-4/12 h-24 bg-white rounded-lg">
            <div className="flex space-x-5 p-5">
              <Select
                className="w-full"
                variant="unstyled"
                size="lg"
                radius="md"
                rightSection={<></>}
                placeholder="Producto"
                data={["React", "Angular", "Vue", "Svelte"]}
                searchable
                nothingFoundMessage="Nothing found..."
              />
              <Divider
                orientation="vertical"
                size="md"
                color="black"
                className="rounded-full"
              />
              <Select
                className="w-full text-center"
                variant="unstyled"
                size="lg"
                radius="md"
                rightSection={<></>}
                placeholder="Pais"
                data={["React", "Angular", "Vue", "Svelte"]}
                searchable
                nothingFoundMessage="Nothing found..."
              />
            </div>
            <button className="flex justify-center items-center w-2/12 h-full bg-navy text-white p-0 rounded-r-lg ">
              <IconSearch />
            </button>
          </div>

          {/* <div className="sm:flex space-x-5 my-5 w-4/12">
            <Select
              className="w-full"
              size="lg"
              radius="md"
              rightSection={<></>}
              placeholder="Producto"
              data={["React", "Angular", "Vue", "Svelte"]}
              searchable
              nothingFoundMessage="Nothing found..."
            />
            <Select
              className="w-full"
              size="lg"
              radius="md"
              rightSection={<></>}
              placeholder="Pais"
              data={["React", "Angular", "Vue", "Svelte"]}
              searchable
              nothingFoundMessage="Nothing found..."
            />
          </div>
          <Button size="lg" className="w-4/12 bg-white text-black">
            Buscar
          </Button> */}
        </div>
      </div>
    </div>
  );
}
