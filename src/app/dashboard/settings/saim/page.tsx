"use client";
import Saim from "@/src/models/saim";
import getAllSaim from "@/src/services/saim/getAllSaim";
import { useCallback, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import SCard from "@/src/components/settings/saim/card";
import SaimDialog from "@/src/components/saim/Create/saimDialog";
import React from "react";
import { useAtom } from "jotai";
import { saimAtom } from "@/src/state/saim";

export default function Page() {
  const [data, setData] = useAtom(saimAtom)
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center w-full h-full my-10">
        <div className="flex flex-row items-center justify-between w-8/12 ">
          <Button
            variant="outlined"
            className="duration-300 rounded-full cursor-pointer w-44 hover:bg-gray-200"
          >
            Oportunidades
          </Button>
          <Button
            variant="outlined"
            className="rounded-full cursor-pointer w-44"
          >
            Actualizaciones
          </Button>
          <Button
            variant="outlined"
            className="rounded-full cursor-pointer w-44"
          >
            Amenazas
          </Button>
          <Button
            variant="outlined"
            className="rounded-full cursor-pointer w-44"
          >
            Obstáculos
          </Button>
        </div>
        <div className="flex justify-end w-11/12 ">
          <div className="w-3/12 h-16">
            <div className="flex flex-row bg-white p-5 w-full h-full rounded-full my-10 border-[1px] border-black">
              <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500" />
              <input
                placeholder="Producto o código arancelario..."
                className="w-10/12 text-black outline-none"
                name="search"
              />
            </div>
          </div>
        </div>
        {/* 
               SAIMS
            */}
        <div className="w-full h-[28rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
          <button
            className="flex items-center justify-center w-full h-full duration-300 border-2 border-black border-dashed cursor-pointer rounded-3xl hover:bg-gray-200"
            onClick={handleOpen}
          >
            <PlusIcon className="w-16 h-16 text-black" />
          </button>
          {data.map((saim) => (
            <div className="w-full h-full">
              <SCard key={saim.id} {...saim} />
            </div>
          ))}
        </div>
        <SaimDialog open={open} handleOpen={handleOpen} edit={false} />
      </div>
    </div>
  );
}
